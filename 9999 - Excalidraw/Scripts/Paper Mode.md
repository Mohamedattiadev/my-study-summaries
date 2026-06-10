---
excalidraw-plugin: parsed
---

/*
Toggle paper-style background on the active Excalidraw view via persistent floating panel.
First run builds the panel and caches it on window. Subsequent runs just show/hide it for
instant toggling. Pattern itself persists across toggles via the Enabled switch inside.

```javascript
*/

const MODE_OPTIONS = {
  dotted:     "Dotted",
  dashed:     "Dashed cross",
  grid:       "Grid (square)",
  ruled:      "Ruled (lines)",
  cross:      "Crosses (+)",
  crosshatch: "Crosshatch (diag)",
  iso:        "Isometric",
  circles:    "Open circles",
  diamonds:   "Diamonds",
  triangles:  "Triangles",
  waves:      "Waves",
  bricks:     "Bricks",
  music:      "Music staff",
  hex:        "Hexagons",
  stars:      "Stars (·)",
  checker:    "Checker",
};
const DEFAULTS = { enabled: true, mode: "dotted", spacing: 24, color: "#cfcfcf" };
const SPACING_MIN = 20;
const SPACING_MAX = 50;
const STROKE_WIDTH = 1;
const DOT_RADIUS = 1.5;
const CROSS_ARM = 3;
const KEY = "Paper mode config";
const PANEL_ID = "paper-mode-panel";
const STYLE_ID = "paper-mode-style";

const view = ea.targetView;
if (!view) { new ea.obsidian.Notice("No active Excalidraw view"); return; }
const api = ea.getExcalidrawAPI();
if (!api) { new ea.obsidian.Notice("Excalidraw API unavailable"); return; }

// Remove stale About entry from earlier versions — fire-and-forget so
// the disk write doesn't block the panel build.
{
  const _s = ea.getScriptSettings() || {};
  if (_s["About"]) { delete _s["About"]; ea.setScriptSettings(_s); }
}
// ---------- settings (cached on window for speed across runs) ----------
let state = window.__paperModeState;
if (!state) {
  const settings = ea.getScriptSettings() || {};
  if (!settings[KEY]) {
    settings[KEY] = { value: { ...DEFAULTS } };
    await ea.setScriptSettings(settings);
  }
  state = {
    settings,
    cfg: { ...DEFAULTS, ...settings[KEY].value },
    dirty: false,
    persistTimer: null,
  };
  window.__paperModeState = state;
}
const cfg = state.cfg;

// ---------- pattern apply / clear ----------
function getCanvases() {
  return Array.from(view.contentEl.querySelectorAll(".excalidraw__canvas.static"));
}

function buildSVG(mode, s, col) {
  const sw = STROKE_WIDTH;
  let body = "", w = s, h = s;
  if (mode === "dotted") {
    body = `<circle cx='${s/2}' cy='${s/2}' r='${DOT_RADIUS}' fill='${col}'/>`;
  } else if (mode === "dashed") {
    const d = Math.max(2, Math.floor(s / 6));
    const a = `stroke='${col}' stroke-width='${sw}' stroke-dasharray='${d} ${d}'`;
    body = `<line x1='0' y1='0.5' x2='${s}' y2='0.5' ${a}/><line x1='0.5' y1='0' x2='0.5' y2='${s}' ${a}/>`;
  } else if (mode === "grid") {
    body = `<line x1='0' y1='0.5' x2='${s}' y2='0.5' stroke='${col}' stroke-width='${sw}'/><line x1='0.5' y1='0' x2='0.5' y2='${s}' stroke='${col}' stroke-width='${sw}'/>`;
  } else if (mode === "ruled") {
    body = `<line x1='0' y1='0.5' x2='${s}' y2='0.5' stroke='${col}' stroke-width='${sw}'/>`;
  } else if (mode === "cross") {
    const c = s / 2, a = Math.min(CROSS_ARM, s / 4);
    body = `<line x1='${c-a}' y1='${c}' x2='${c+a}' y2='${c}' stroke='${col}' stroke-width='${sw}'/><line x1='${c}' y1='${c-a}' x2='${c}' y2='${c+a}' stroke='${col}' stroke-width='${sw}'/>`;
  } else if (mode === "crosshatch") {
    body = `<line x1='0' y1='${s}' x2='${s}' y2='0' stroke='${col}' stroke-width='${sw}'/><line x1='0' y1='0' x2='${s}' y2='${s}' stroke='${col}' stroke-width='${sw}'/>`;
  } else if (mode === "iso") {
    h = Math.round(s * 0.866);
    body = `<line x1='0' y1='${h/2}' x2='${s}' y2='${h/2}' stroke='${col}' stroke-width='${sw}'/><line x1='0' y1='0' x2='${s}' y2='${h}' stroke='${col}' stroke-width='${sw}'/><line x1='0' y1='${h}' x2='${s}' y2='0' stroke='${col}' stroke-width='${sw}'/>`;
  } else if (mode === "circles") {
    const r = s / 2 - 1.5;
    body = `<circle cx='${s/2}' cy='${s/2}' r='${r}' fill='none' stroke='${col}' stroke-width='${sw}'/>`;
  } else if (mode === "diamonds") {
    const c = s / 2, e = s / 2 - 1;
    body = `<polygon points='${c},${c-e} ${c+e},${c} ${c},${c+e} ${c-e},${c}' fill='none' stroke='${col}' stroke-width='${sw}'/>`;
  } else if (mode === "triangles") {
    // equilateral triangle grid: tile = up + down triangle pair
    w = s; h = Math.round(s * 0.866);
    body = `<polyline points='0,${h} ${s/2},0 ${s},${h} 0,${h}' fill='none' stroke='${col}' stroke-width='${sw}'/><line x1='${s/2}' y1='0' x2='${s/2}' y2='${h}' stroke='${col}' stroke-width='${sw}'/>`;
  } else if (mode === "waves") {
    // half-sine across tile width; vertical center at h/2
    const m = s / 2;
    body = `<path d='M0,${m} Q${s/4},0 ${s/2},${m} T${s},${m}' fill='none' stroke='${col}' stroke-width='${sw}'/>`;
  } else if (mode === "bricks") {
    // tile 2s wide, s tall — brick offset row built into single tile
    w = s * 2; h = s;
    body = `<line x1='0' y1='0.5' x2='${w}' y2='0.5' stroke='${col}' stroke-width='${sw}'/><line x1='0' y1='${h/2}' x2='${w}' y2='${h/2}' stroke='${col}' stroke-width='${sw}'/><line x1='${s/2}' y1='0' x2='${s/2}' y2='${h/2}' stroke='${col}' stroke-width='${sw}'/><line x1='${s+s/2}' y1='0' x2='${s+s/2}' y2='${h/2}' stroke='${col}' stroke-width='${sw}'/><line x1='${s}' y1='${h/2}' x2='${s}' y2='${h}' stroke='${col}' stroke-width='${sw}'/>`;
  } else if (mode === "music") {
    // 5 horizontal staff lines in upper portion, gap below
    const step = Math.max(2, Math.floor(s / 8));
    let lines = "";
    for (let i = 0; i < 5; i++) {
      const y = step * (i + 1);
      lines += `<line x1='0' y1='${y}' x2='${s}' y2='${y}' stroke='${col}' stroke-width='${sw}'/>`;
    }
    body = lines;
  } else if (mode === "hex") {
    // hex grid approximation: tile draws two half-hex columns
    w = s; h = Math.round(s * 1.732); // sqrt(3)
    const q = s / 4, half = s / 2;
    body = `<polyline points='0,${h*0.25} ${q},0 ${s-q},0 ${s},${h*0.25} ${s-q},${h*0.5} ${q},${h*0.5} 0,${h*0.25}' fill='none' stroke='${col}' stroke-width='${sw}'/><line x1='${q}' y1='${h*0.5}' x2='${q}' y2='${h*0.75}' stroke='${col}' stroke-width='${sw}'/><line x1='${s-q}' y1='${h*0.5}' x2='${s-q}' y2='${h*0.75}' stroke='${col}' stroke-width='${sw}'/>`;
  } else if (mode === "stars") {
    // small filled stars at grid intersections (using simple 4-point star paths)
    const c = s / 2, r = 2;
    body = `<path d='M${c},${c-r} L${c+r/3},${c-r/3} L${c+r},${c} L${c+r/3},${c+r/3} L${c},${c+r} L${c-r/3},${c+r/3} L${c-r},${c} L${c-r/3},${c-r/3} Z' fill='${col}'/>`;
  } else if (mode === "checker") {
    // checkerboard squares — 2x2 tile of half-squares
    const half = s / 2;
    body = `<rect x='0' y='0' width='${half}' height='${half}' fill='${col}' opacity='0.4'/><rect x='${half}' y='${half}' width='${half}' height='${half}' fill='${col}' opacity='0.4'/>`;
  } else {
    body = `<line x1='0' y1='0.5' x2='${s}' y2='0.5' stroke='${col}' stroke-width='${sw}'/>`;
  }
  const url = "data:image/svg+xml;utf8," + encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>${body}</svg>`
  );
  return { url, w, h };
}

function clearPattern() {
  const prev = view._paperMode;
  if (prev?.unsubscribe) { try { prev.unsubscribe(); } catch (e) {} }
  for (const c of getCanvases()) {
    c.style.backgroundImage = "";
    c.style.backgroundRepeat = "";
    c.style.backgroundSize = "";
    c.style.backgroundPosition = "";
  }
  if (prev?.originalBg !== undefined) {
    api.updateScene({ appState: { viewBackgroundColor: prev.originalBg }, commitToHistory: false });
  }
  view._paperMode = null;
}

function applyPattern() {
  clearPattern();
  const { url, w, h } = buildSVG(cfg.mode, cfg.spacing, cfg.color);
  const originalBg = api.getAppState().viewBackgroundColor;
  api.updateScene({ appState: { viewBackgroundColor: "transparent" }, commitToHistory: false });
  const paint = (sx, sy, zoom) => {
    const z = zoom?.value ?? 1;
    const pos = `${sx * z}px ${sy * z}px`;
    for (const c of getCanvases()) {
      c.style.backgroundImage = `url("${url}")`;
      c.style.backgroundRepeat = "repeat";
      c.style.backgroundSize = `${w}px ${h}px`;
      c.style.backgroundPosition = pos;
    }
  };
  const s0 = api.getAppState();
  paint(s0.scrollX, s0.scrollY, s0.zoom);
  const unsubscribe = api.onScrollChange((sx, sy, zoom) => paint(sx, sy, zoom));
  view._paperMode = { unsubscribe, originalBg };
}

function refresh() {
  if (cfg.enabled) applyPattern();
  else clearPattern();
}

function persistSoon() {
  if (state.persistTimer) clearTimeout(state.persistTimer);
  state.persistTimer = setTimeout(async () => {
    if (state.dirty) {
      state.settings[KEY].value = { ...cfg };
      await ea.setScriptSettings(state.settings);
      state.dirty = false;
    }
  }, 400);
}

// ---------- shared float-panel z-index stack ----------
// Every floating Excalidraw-script panel shares this counter so the
// most-recently-clicked one comes to front (browser-window style).
function cfRaisePanel(el) {
  if (!el) return;
  if (typeof window.__excaliPanelZ !== "number") window.__excaliPanelZ = 1000;
  el.style.zIndex = String(++window.__excaliPanelZ);
}

// ---------- panel: build once, show/hide on toggle ----------
let panel = document.getElementById(PANEL_ID);
if (panel) {
  const hidden = panel.style.display === "none";
  panel.style.display = hidden ? "" : "none";
  if (hidden) { refresh(); cfRaisePanel(panel); }
  return;
}

const COLOR_PRESETS = ["#cfcfcf", "#9e9e9e", "#5a5a5a", "#ff6b6b", "#ffa940", "#4dabf7", "#51cf66", "#cc5de8"];

if (!document.getElementById(STYLE_ID)) {
  const styleTag = document.createElement("style");
  styleTag.id = STYLE_ID;
  styleTag.textContent = `
    #${PANEL_ID} {
      position: fixed; top: 140px; right: 80px;
      width: 280px; padding: 12px 14px;
      background: var(--background-primary);
      border: 1px solid var(--background-modifier-border);
      border-radius: 12px;
      box-shadow: 0 6px 24px rgba(0,0,0,0.28);
      z-index: 1000; font-size: 13px;
      font-family: var(--font-interface);
    }
    #${PANEL_ID} .pm-header {
      display:flex; align-items:center; justify-content:space-between;
      padding-bottom:8px; margin-bottom:10px;
      border-bottom:1px solid var(--background-modifier-border);
    }
    #${PANEL_ID} .pm-title {
      font-weight:600; font-size:14px; display:flex; align-items:center; gap:6px;
    }
    #${PANEL_ID} .pm-title svg { color: var(--text-accent); }
    #${PANEL_ID} .pm-close {
      cursor:pointer; padding:2px 8px; border-radius:4px;
      color: var(--text-muted); user-select:none;
    }
    #${PANEL_ID} .pm-close:hover { background: var(--background-modifier-hover); color: var(--text-normal); }

    #${PANEL_ID} .pm-row {
      display:flex; align-items:center; justify-content:space-between;
      padding: 6px 0;
    }
    #${PANEL_ID} .pm-row > .pm-label {
      font-size: 12px; color: var(--text-muted); text-transform: uppercase;
      letter-spacing: 0.5px; font-weight: 600;
    }
    #${PANEL_ID} .pm-row > .pm-value {
      font-size: 12px; color: var(--text-normal); font-variant-numeric: tabular-nums;
    }

    #${PANEL_ID} .pm-section { margin-top: 4px; margin-bottom: 8px; }

    #${PANEL_ID} .pm-pattern-grid {
      display:grid; grid-template-columns: repeat(4, 1fr); gap:6px;
    }
    #${PANEL_ID} .pm-pattern-chip {
      aspect-ratio: 1; border: 1px solid var(--background-modifier-border);
      border-radius: 6px; cursor:pointer;
      background-color: var(--background-secondary);
      background-repeat: repeat; background-size: 14px 14px;
      transition: border-color 0.1s, transform 0.1s;
    }
    #${PANEL_ID} .pm-pattern-chip:hover { transform: scale(1.05); }
    #${PANEL_ID} .pm-pattern-chip.is-active {
      border: 2px solid var(--interactive-accent);
      box-shadow: 0 0 0 1px var(--interactive-accent);
    }

    #${PANEL_ID} .pm-color-swatches { display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
    #${PANEL_ID} .pm-swatch {
      width:22px; height:22px; border-radius:50%;
      cursor:pointer; border:2px solid transparent;
      box-shadow: inset 0 0 0 1px var(--background-modifier-border);
    }
    #${PANEL_ID} .pm-swatch.is-active {
      border-color: var(--interactive-accent);
    }
    #${PANEL_ID} .pm-color-custom {
      width:22px; height:22px; padding:0; border:1px dashed var(--background-modifier-border);
      border-radius:50%; cursor:pointer; background:transparent;
    }

    #${PANEL_ID} .pm-slider-row { display:flex; align-items:center; gap:8px; }
    #${PANEL_ID} .pm-slider-row input[type=range] { flex:1; accent-color: var(--interactive-accent); }
    #${PANEL_ID} .pm-spacing-value {
      min-width:32px; text-align:right; font-size:12px; color: var(--text-muted);
      font-variant-numeric: tabular-nums;
    }

    #${PANEL_ID} .pm-toggle-row { display:flex; align-items:center; justify-content:space-between; padding:4px 0 8px; }
    #${PANEL_ID} .pm-switch {
      position:relative; width:36px; height:20px; border-radius:10px;
      background: var(--background-modifier-border); cursor:pointer;
      transition: background 0.15s;
    }
    #${PANEL_ID} .pm-switch::after {
      content:""; position:absolute; top:2px; left:2px;
      width:16px; height:16px; border-radius:50%;
      background:white; transition: transform 0.15s;
    }
    #${PANEL_ID} .pm-switch.is-on { background: var(--interactive-accent); }
    #${PANEL_ID} .pm-switch.is-on::after { transform: translateX(16px); }
  `;
  document.head.appendChild(styleTag);
}

panel = document.createElement("div");
panel.id = PANEL_ID;
document.body.appendChild(panel);
cfRaisePanel(panel);
panel.addEventListener("mousedown", () => cfRaisePanel(panel), true);

// ---------- header ----------
const header = panel.createDiv({ cls: "pm-header" });
const titleEl = header.createDiv({ cls: "pm-title" });
titleEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="0.8" fill="currentColor"/><circle cx="12" cy="8" r="0.8" fill="currentColor"/><circle cx="16" cy="8" r="0.8" fill="currentColor"/><circle cx="8" cy="12" r="0.8" fill="currentColor"/><circle cx="12" cy="12" r="0.8" fill="currentColor"/><circle cx="16" cy="12" r="0.8" fill="currentColor"/><circle cx="8" cy="16" r="0.8" fill="currentColor"/><circle cx="12" cy="16" r="0.8" fill="currentColor"/><circle cx="16" cy="16" r="0.8" fill="currentColor"/></svg> Paper Mode`;
const closeBtn = header.createDiv({ cls: "pm-close", text: "✕" });
closeBtn.onclick = () => { panel.style.display = "none"; };

// ---------- draggable via header ----------
header.style.cursor = "grab";
header.style.userSelect = "none";
(function makeDraggable() {
  let dragging = false, ox = 0, oy = 0;
  header.addEventListener("mousedown", (e) => {
    if (e.target.closest(".pm-close")) return;
    const r = panel.getBoundingClientRect();
    dragging = true; ox = e.clientX - r.left; oy = e.clientY - r.top;
    header.style.cursor = "grabbing";
    e.preventDefault();
  });
  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    const w = panel.offsetWidth, h = panel.offsetHeight, m = 8;
    const left = Math.max(m, Math.min(window.innerWidth  - w - m, e.clientX - ox));
    const top  = Math.max(m, Math.min(window.innerHeight - h - m, e.clientY - oy));
    panel.style.setProperty("left",  `${left}px`, "important");
    panel.style.setProperty("top",   `${top}px`,  "important");
    panel.style.setProperty("right", "auto", "important");
  });
  window.addEventListener("mouseup", () => {
    if (dragging) { dragging = false; header.style.cursor = "grab"; }
  });
})();
(function clampOnResize() {
  const clamp = () => {
    const r = panel.getBoundingClientRect(), m = 8;
    if (r.right  > window.innerWidth  - m) panel.style.setProperty("left", `${Math.max(m, window.innerWidth  - r.width  - m)}px`, "important");
    if (r.bottom > window.innerHeight - m) panel.style.setProperty("top",  `${Math.max(m, window.innerHeight - r.height - m)}px`, "important");
    if (r.left < m) panel.style.setProperty("left", `${m}px`, "important");
    if (r.top  < m) panel.style.setProperty("top",  `${m}px`, "important");
  };
  window.addEventListener("resize", clamp);
})();

// ---------- enable toggle ----------
const toggleRow = panel.createDiv({ cls: "pm-toggle-row" });
toggleRow.createDiv({ cls: "pm-label", text: "ENABLED" });
const switchEl = toggleRow.createDiv({ cls: "pm-switch" });
const setSwitch = (on) => switchEl.classList.toggle("is-on", on);
setSwitch(cfg.enabled);
switchEl.onclick = () => {
  cfg.enabled = !cfg.enabled;
  setSwitch(cfg.enabled);
  state.dirty = true; refresh(); persistSoon();
};

// ---------- pattern visual chips ----------
panel.createDiv({ cls: "pm-row" }).createDiv({ cls: "pm-label", text: "PATTERN" });
const grid = panel.createDiv({ cls: "pm-pattern-grid pm-section" });
const chipEls = {};
for (const [k, label] of Object.entries(MODE_OPTIONS)) {
  const chip = grid.createDiv({ cls: "pm-pattern-chip", attr: { title: label } });
  const preview = buildSVG(k, 14, "#9e9e9e");
  chip.style.backgroundImage = `url("${preview.url}")`;
  chip.style.backgroundSize = `${preview.w}px ${preview.h}px`;
  chipEls[k] = chip;
  chip.onclick = () => {
    cfg.mode = k;
    for (const key of Object.keys(chipEls)) chipEls[key].classList.toggle("is-active", key === k);
    state.dirty = true; refresh(); persistSoon();
  };
  if (k === cfg.mode) chip.classList.add("is-active");
}

// ---------- color swatches + custom picker ----------
panel.createDiv({ cls: "pm-row" }).createDiv({ cls: "pm-label", text: "COLOR" });
const swatchRow = panel.createDiv({ cls: "pm-color-swatches pm-section" });
const swatchEls = [];
for (const c of COLOR_PRESETS) {
  const sw = swatchRow.createDiv({ cls: "pm-swatch", attr: { title: c } });
  sw.style.background = c;
  swatchEls.push({ el: sw, color: c });
  sw.onclick = () => {
    cfg.color = c;
    customPicker.value = c;
    swatchEls.forEach(s => s.el.classList.toggle("is-active", s.color === c));
    state.dirty = true; refresh(); persistSoon();
  };
  if (c.toLowerCase() === cfg.color.toLowerCase()) sw.classList.add("is-active");
}
const customPicker = document.createElement("input");
customPicker.type = "color";
customPicker.className = "pm-color-custom";
customPicker.value = cfg.color;
customPicker.title = "Custom color";
customPicker.oninput = (e) => {
  cfg.color = e.target.value;
  swatchEls.forEach(s => s.el.classList.toggle("is-active", s.color.toLowerCase() === cfg.color.toLowerCase()));
  state.dirty = true; refresh(); persistSoon();
};
swatchRow.appendChild(customPicker);

// ---------- spacing ----------
const spacingHeader = panel.createDiv({ cls: "pm-row" });
spacingHeader.createDiv({ cls: "pm-label", text: "SPACING" });
const spacingValue = spacingHeader.createDiv({ cls: "pm-value", text: `${cfg.spacing}px` });
const sliderRow = panel.createDiv({ cls: "pm-slider-row pm-section" });
const slider = document.createElement("input");
slider.type = "range";
slider.min = SPACING_MIN;
slider.max = SPACING_MAX;
slider.step = 1;
slider.value = Math.max(SPACING_MIN, Math.min(SPACING_MAX, cfg.spacing));
slider.oninput = (e) => {
  cfg.spacing = parseInt(e.target.value, 10);
  spacingValue.textContent = `${cfg.spacing}px`;
  state.dirty = true; refresh(); persistSoon();
};
sliderRow.appendChild(slider);

// Apply current saved state on first build
refresh();

/*
```
*/
