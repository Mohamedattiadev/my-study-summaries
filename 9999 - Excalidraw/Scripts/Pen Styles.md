---
excalidraw-plugin: parsed
---

/*
Pen Styles — combined floating panel: preset chips + integrated fine-tune section.
GoodNotes-style pressure pens for iPad + Apple Pencil. Uses native Excalidraw
Perfect-Freehand customPen API (`appState.currentStrokeOptions`).

Pen Settings.md is a thin wrapper that opens this same panel with the fine-tune
section auto-expanded.

```javascript
*/

// =========================================================================================
// TDZ-safe top-level state
// =========================================================================================
var PANEL_ID = "pen-styles-panel";
var STYLE_ID = "pen-styles-style";
var KEY      = "Pen Styles config";

var EASINGS = [
  "linear","easeInQuad","easeOutQuad","easeInOutQuad",
  "easeInCubic","easeOutCubic","easeInOutCubic",
  "easeInSine","easeOutSine","easeInOutSine"
];

var COLOR_PRESETS = [
  "#000000","#1a1a2e","#0b1d51","#d32f2f","#e8590c",
  "#fcc419","#2f9e44","#1c7ed6","#9c36b5","#ffffff"
];

// Lucide-style per-pen icons (inline body paths, stroked in preset color at runtime).
var PEN_ICONS = {
  "Fine Pen":    `<path d="M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z"/><path d="m15 5 4 4"/>`,
  "Ballpoint":   `<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>`,
  "Fountain":    `<path d="m20.24 12.24-8.49 8.49a4.24 4.24 0 1 1-6-6l8.49-8.49a3 3 0 0 1 4.24 0l1.76 1.76a3 3 0 0 1 0 4.24z"/><path d="M16 8 2 22"/><path d="M17.5 15h-12"/>`,
  "Brush":       `<path d="M9.06 11.9a8 8 0 0 1 2.84-2.83l9.32-5.31a1 1 0 0 1 1.42 1.42l-5.31 9.32a8 8 0 0 1-2.83 2.84"/><path d="M7.81 14.18a4 4 0 1 0 5.66 5.66c1.36-1.36 2-3.84 1.34-7-3.16-.66-5.64 0-7 1.34Z"/>`,
  "Pencil":      `<path d="M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z"/><path d="m15 5 4 4"/><path d="M11 13 2 22"/>`,
  "Marker":      `<path d="M2 18 18 2l4 4L6 22z"/><path d="m12 8 4 4"/><path d="M2 22h20"/>`,
  "Highlighter": `<path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4l8 8z"/>`,
  "Native iPad": `<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>`,
  "Mask Highlighter": `<path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4l8 8z"/>`
};
function penIconSvg(name, color) {
  const body = PEN_ICONS[name] || PEN_ICONS["Fine Pen"];
  return `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
}

// Native Apple Pencil feel: simulatePressure:false, low streamline+smoothing.
var BUILTIN_PRESETS = {
  "Fine Pen": {
    strokeWidth: 1.5, strokeColor: "#000000", opacity: 100,
    penOptions: { highlighter: false, constantPressure: false, hasOutline: false, outlineWidth: 0,
      options: { thinning: 0.1, smoothing: 0.08, streamline: 0.02, easing: "linear",
        simulatePressure: false,
        start: { cap: true, taper: 0, easing: "linear" },
        end:   { cap: true, taper: 0, easing: "linear" } } } },
  "Ballpoint": {
    strokeWidth: 2.5, strokeColor: "#1a1a2e", opacity: 100,
    penOptions: { highlighter: false, constantPressure: false, hasOutline: false, outlineWidth: 0,
      options: { thinning: 0.2, smoothing: 0.1, streamline: 0.05, easing: "linear",
        simulatePressure: false,
        start: { cap: true, taper: 0, easing: "linear" },
        end:   { cap: true, taper: 0, easing: "linear" } } } },
  "Fountain": {
    strokeWidth: 4, strokeColor: "#0b1d51", opacity: 100,
    penOptions: { highlighter: false, constantPressure: false, hasOutline: false, outlineWidth: 0,
      options: { thinning: 0.75, smoothing: 0.4, streamline: 0.25, easing: "easeInOutCubic",
        simulatePressure: false,
        start: { cap: true, taper: 20, easing: "easeOutQuad" },
        end:   { cap: true, taper: 40, easing: "easeInQuad" } } } },
  "Brush": {
    strokeWidth: 8, strokeColor: "#222222", opacity: 100,
    penOptions: { highlighter: false, constantPressure: false, hasOutline: false, outlineWidth: 0,
      options: { thinning: 0.85, smoothing: 0.5, streamline: 0.2, easing: "easeInQuad",
        simulatePressure: false,
        start: { cap: true, taper: 30, easing: "easeOutQuad" },
        end:   { cap: true, taper: 30, easing: "easeInQuad" } } } },
  "Pencil": {
    strokeWidth: 3, strokeColor: "#333333", opacity: 80,
    penOptions: { highlighter: false, constantPressure: false, hasOutline: false, outlineWidth: 0,
      options: { thinning: 0.4, smoothing: 0.08, streamline: 0.03, easing: "linear",
        simulatePressure: false,
        start: { cap: true, taper: 2, easing: "linear" },
        end:   { cap: true, taper: 2, easing: "linear" } } } },
  "Marker": {
    strokeWidth: 6, strokeColor: "#111111", opacity: 100,
    penOptions: { highlighter: false, constantPressure: true, hasOutline: false, outlineWidth: 0,
      options: { thinning: 0, smoothing: 0.35, streamline: 0.25, easing: "linear",
        simulatePressure: false,
        start: { cap: false, taper: 0, easing: "linear" },
        end:   { cap: false, taper: 0, easing: "linear" } } } },
  "Highlighter": {
    strokeWidth: 16, strokeColor: "#ffe44d", opacity: 40,
    penOptions: { highlighter: true, constantPressure: true, hasOutline: false, outlineWidth: 0,
      options: { thinning: 0, smoothing: 0.35, streamline: 0.25, easing: "linear",
        simulatePressure: false,
        start: { cap: false, taper: 0, easing: "linear" },
        end:   { cap: false, taper: 0, easing: "linear" } } } },
  "Native iPad": {
    strokeWidth: 2, strokeColor: "#000000", opacity: 100,
    penOptions: { highlighter: false, constantPressure: false, hasOutline: false, outlineWidth: 0,
      options: { thinning: 0.45, smoothing: 0.05, streamline: 0, easing: "linear",
        simulatePressure: false,
        start: { cap: true, taper: 0, easing: "linear" },
        end:   { cap: true, taper: 0, easing: "linear" } } } },
  "Mask Highlighter": {
    strokeWidth: 18, strokeColor: "#ffd54f", opacity: 100,
    penOptions: { highlighter: false, constantPressure: true, hasOutline: false, outlineWidth: 0,
      options: { thinning: 0, smoothing: 0.35, streamline: 0.2, easing: "linear",
        simulatePressure: false,
        start: { cap: true, taper: 0, easing: "linear" },
        end:   { cap: true, taper: 0, easing: "linear" } } } }
};

var DEFAULTS = {
  active: "Native iPad",
  width:  null, color: null, opacity: null,
  customPresets: {}, fineOpen: false,
  paperFeel: false,
  maskOpen: false,
  maskColor: "#ffd54f",   // saturated highlighter yellow so 100% opacity covers
  maskOpacity: 100,       // 100 = fully covers content underneath when "shown"
  maskWidth: 18
};

var MASK_TAG = "maskLayer";

// Inline Lucide icons (24x24 → scaled via CSS to 13px for buttons, 11px for chev).
var ICON = {
  play:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>`,
  undo:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-15-6.7L3 13"/></svg>`,
  save:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>`,
  eye:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/></svg>`,
  eyeOff:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7l3 2.7"/><path d="M21 4v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 20v-5h5"/></svg>`,
  trash:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  pen:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z"/><path d="m15 5 4 4"/></svg>`,
  stop:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>`,
  paper:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" x2="16" y1="13" y2="13"/><line x1="8" x2="16" y1="17" y2="17"/></svg>`,
  sliders: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>`,
  mask:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4l8 8z"/></svg>`,
  chev:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`
};
function ico(k, cls = "ps-ico") { return `<span class="${cls}">${ICON[k]}</span>`; }

// Paper feel modifier — overlays on top of the active preset's pen options to give
// strokes a "ink-on-paper" character: more dynamic thinning, micro tremor preserved
// (lower streamline), subtle taper, real-pressure curve.
function applyPaperModifier(p) {
  const po = p.penOptions;
  const o  = po.options;
  o.thinning   = Math.min(1, Math.max(0.35, (o.thinning ?? 0.3) + 0.2));
  o.smoothing  = Math.max(0.05, Math.min(o.smoothing ?? 0.3, 0.2));
  o.streamline = Math.max(0.05, Math.min(o.streamline ?? 0.2, 0.15));
  o.easing     = "easeOutCubic";
  o.simulatePressure = false;
  o.start.taper = Math.max(o.start.taper || 0, 8);
  o.end.taper   = Math.max(o.end.taper   || 0, 14);
  o.start.easing = "easeOutQuad";
  o.end.easing   = "easeInQuad";
  po.hasOutline  = false;
  return p;
}

// =========================================================================================
// Setup
// =========================================================================================
var view = ea.targetView;
if (!view) { new ea.obsidian.Notice("No active Excalidraw view"); return; }
var api = ea.getExcalidrawAPI();
if (!api) { new ea.obsidian.Notice("Excalidraw API unavailable"); return; }

// Remove stale About entry that earlier seeded an unwanted input field.
{
  const _s = ea.getScriptSettings() || {};
  if (_s["About"]) { delete _s["About"]; ea.setScriptSettings(_s); }
}
var state = window.__penStylesState;
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
    cleanup: []   // disposers run when panel hides/rebuilds (drag listeners, mask arm)
  };
  window.__penStylesState = state;
}
var cfg = state.cfg;
// Migrate stale persisted cfg: backfill any DEFAULTS keys missing on disk.
for (const k of Object.keys(DEFAULTS)) {
  if (cfg[k] === undefined) cfg[k] = (typeof DEFAULTS[k] === "object" && DEFAULTS[k] !== null)
    ? (Array.isArray(DEFAULTS[k]) ? [] : {})
    : DEFAULTS[k];
}
if (!cfg.customPresets) cfg.customPresets = {};
if (!cfg._tune) cfg._tune = {};
// If saved active preset is gone (custom deleted in another session), fall back.
if (!BUILTIN_PRESETS[cfg.active] && !cfg.customPresets[cfg.active]) {
  cfg.active = "Native iPad";
  cfg.width = cfg.color = cfg.opacity = null;
}
// Clamp numeric overrides to sane ranges.
if (cfg.maskOpacity == null || isNaN(cfg.maskOpacity)) cfg.maskOpacity = DEFAULTS.maskOpacity;
cfg.maskOpacity = Math.max(0, Math.min(100, cfg.maskOpacity));
if (cfg.maskWidth == null || isNaN(cfg.maskWidth)) cfg.maskWidth = DEFAULTS.maskWidth;
cfg.maskWidth = Math.max(1, Math.min(60, cfg.maskWidth));
if (!/^#[0-9a-f]{6}$/i.test(cfg.maskColor || "")) cfg.maskColor = DEFAULTS.maskColor;

// Expand a freedraw element's bbox to cover the full visible stroke
// width without shifting the visual. Excalidraw's selection box wraps
// element.x/y/width/height (NOT the perfect-freehand polygon), so a
// thick mask renders far outside the bbox -> clicks on the visible
// blob miss the element and drag never engages.
function expandFreedrawBbox(el, padPx) {
  if (!el.points || el.points.length === 0) return el;
  var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (var i = 0; i < el.points.length; i++) {
    var p = el.points[i], px = p[0], py = p[1];
    if (px < minX) minX = px;
    if (py < minY) minY = py;
    if (px > maxX) maxX = px;
    if (py > maxY) maxY = py;
  }
  var newPoints = el.points.map(function (p) { return [p[0] - minX + padPx, p[1] - minY + padPx]; });
  return Object.assign({}, el, {
    x: el.x + minX - padPx,
    y: el.y + minY - padPx,
    width:  maxX - minX + padPx * 2,
    height: maxY - minY + padPx * 2,
    points: newPoints
  });
}

// One-shot migration: backfill backgroundColor + fillStyle on every
// existing mask so the blob renders filled. Bbox is NOT expanded any
// more — that caused a 1px snap on the first click after drawing,
// and the custom drag handler hit-tests the polyline directly so a
// tight bbox is fine.
if (!window.__penStylesMaskFillMigrated) {
  window.__penStylesMaskFillMigrated = true;
  try {
    const a = ea.getExcalidrawAPI?.();
    if (a && typeof a.getSceneElements === "function") {
      const els = a.getSceneElements() || [];
      let dirty = false;
      const fixed = els.map(el => {
        if (!el.customData || el.customData.maskLayer !== true) return el;
        if (el.fillStyle === "solid" && el.backgroundColor && el.backgroundColor !== "transparent") return el;
        dirty = true;
        return Object.assign({}, el, {
          backgroundColor: el.strokeColor,
          fillStyle: "solid"
        });
      });
      if (dirty) a.updateScene({ elements: fixed, commitToHistory: true });
    }
  } catch (e) { console.warn("[Pen Styles] mask fill migration failed", e); }
}
// Migrate users from the pale sticky-note default (#fff3a8) to the new
// saturated highlighter yellow (#ffd54f). Pale yellow at opacity 100
// still looked ~50% on white, which was confusing.
if ((cfg.maskColor || "").toLowerCase() === "#fff3a8") cfg.maskColor = DEFAULTS.maskColor;

// =========================================================================================
// Helpers
// =========================================================================================
function clone(o) { return JSON.parse(JSON.stringify(o)); }
function allPresets() { return { ...BUILTIN_PRESETS, ...cfg.customPresets }; }
function getPreset(name) { return allPresets()[name] || null; }
function activePresetCopy() {
  const p = getPreset(cfg.active) || BUILTIN_PRESETS["Native iPad"];
  const s = clone(p);
  if (cfg.width   != null) s.strokeWidth = cfg.width;
  if (cfg.opacity != null) s.opacity     = cfg.opacity;
  if (cfg.color)           s.strokeColor = cfg.color;
  return s;
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

function applyActivePen() {
  // Mask Highlighter is a pen preset that ALSO arms the mask-tagging listener,
  // so switching to it is the same gesture as picking any other pen.
  if (cfg.active === "Mask Highlighter") {
    // Sync mask cfg from the active preset so the shared PEN COLOR/WIDTH/OPACITY
    // rows drive mask drawing too. activePresetCopy already merges user overrides.
    const mp = activePresetCopy();
    if (mp) {
      if (typeof mp.strokeColor === "string") cfg.maskColor   = mp.strokeColor;
      if (typeof mp.strokeWidth === "number") cfg.maskWidth   = mp.strokeWidth;
      if (typeof mp.opacity === "number")     cfg.maskOpacity = mp.opacity;
    }
    if (isMaskArmed()) {
      // Already armed — width/color/opacity slider movement should NOT
      // re-arm + re-notify. Just push the new appState values to Excalidraw.
      ea.viewUpdateScene({
        appState: {
          currentItemStrokeWidth: cfg.maskWidth,
          currentItemStrokeColor: cfg.maskColor,
          currentItemOpacity:     cfg.maskOpacity
        }
      });
      return;
    }
    startMaskDraw();
    return;
  }
  // Switching to any non-mask pen disarms mask tagging so the next stroke
  // does NOT get tagged as a mask.
  if (typeof isMaskArmed === "function" && isMaskArmed()) stopMaskDraw(false);
  let p = activePresetCopy();
  if (cfg.paperFeel) p = applyPaperModifier(p);
  ea.viewUpdateScene({
    appState: {
      currentStrokeOptions:       p.penOptions,
      currentItemStrokeWidth:     p.strokeWidth,
      currentItemStrokeColor:     p.strokeColor,
      currentItemOpacity:         p.opacity,
      currentItemFillStyle:       "solid",
      currentItemRoughness:       0,
      currentItemStrokeStyle:     "solid",
      currentItemBackgroundColor: "transparent"
    }
  });
  api.setActiveTool({ type: "freedraw" });
  installEscToSelection();
}

// Pressing Escape after picking any Pen Styles preset returns the
// canvas to the selection tool (mouse mode). The keydown listener
// has to sit on `document` in the capture phase so it runs BEFORE
// Excalidraw's own ESC handler (which would otherwise consume the
// event, leaving our freedraw tool active). Idempotent per view.
function installEscToSelection() {
  if (view.__penStylesEsc) return;
  const h = (e) => {
    if (e.key !== "Escape") return;
    // Only act if this Excalidraw view is the active one — otherwise
    // ESC in unrelated panes shouldn't poke at the canvas tool.
    if (!view.contentEl.contains(document.activeElement)
        && !view.contentEl.contains(e.target)
        && document.activeElement !== document.body) return;
    try { api.setActiveTool({ type: "selection" }); } catch (_) {}
    try { ea.viewUpdateScene({ appState: { currentStrokeOptions: null } }); } catch (_) {}
    if (typeof isMaskArmed === "function" && isMaskArmed()) stopMaskDraw(false);
  };
  document.addEventListener("keydown", h, true);
  view.__penStylesEsc = h;
}

function clearPen() {
  ea.viewUpdateScene({ appState: { currentStrokeOptions: null } });
}

// ---- Mask Highlighter helpers --------------------------------------------------------
function getAllMasks() {
  return (api.getSceneElements() || []).filter(
    el => el.customData && el.customData[MASK_TAG] === true && !el.isDeleted
  );
}
function activeBookFrame() {
  const frames = (ea.getViewElements() || []).filter(
    el => el.type === "frame" && el.customData && el.customData.bookPage
  );
  if (!frames.length) return null;
  const p = ea.getViewLastPointerPosition?.();
  if (!p) return frames[0];
  return frames.find(f =>
    p.x >= f.x && p.x <= f.x + f.width &&
    p.y >= f.y && p.y <= f.y + f.height
  ) || frames[0];
}
function startMaskDraw() {
  const frame = activeBookFrame();
  const frameId = frame ? frame.id : null;
  ea.viewUpdateScene({
    appState: {
      currentStrokeOptions: {
        highlighter: false, constantPressure: true, hasOutline: false, outlineWidth: 0,
        options: {
          thinning: 0, smoothing: 0.35, streamline: 0.2, easing: "linear",
          simulatePressure: false,
          start: { cap: true, taper: 0, easing: "linear" },
          end:   { cap: true, taper: 0, easing: "linear" }
        }
      },
      currentItemStrokeWidth:     cfg.maskWidth,
      currentItemStrokeColor:     cfg.maskColor,
      currentItemOpacity:         cfg.maskOpacity,
      currentItemFillStyle:       "solid",
      currentItemRoughness:       0,
      currentItemStrokeStyle:     "solid",
      currentItemBackgroundColor: "transparent"
    }
  });
  api.setActiveTool({ type: "freedraw" });
  installEscToSelection();

  stopMaskDraw(false);
  const canvas = view.contentEl.querySelector("canvas.interactive");
  if (!canvas) { new Notice("No canvas — open Excalidraw view"); return; }
  const knownIds = new Set((api.getSceneElements() || []).map(e => e.id));
  const tagInFlight = new Set();
  let scheduled = false;

  // Tag fresh freedraw strokes by mutating the scene array directly via
  // api.updateScene. This avoids ea.copyViewElementsToEAforEditing +
  // addElementsToView, which appended a second element in some versions
  // (cause of the "1 stroke -> 2 masks" bug).
  const tagFresh = () => {
    scheduled = false;
    const sceneEls = api.getSceneElements() || [];
    let changed = false;
    const next = sceneEls.map(el => {
      if (el.type !== "freedraw") return el;
      if (knownIds.has(el.id)) return el;
      if (el.customData && el.customData.maskLayer) {
        knownIds.add(el.id); return el;
      }
      if (tagInFlight.has(el.id)) return el;
      tagInFlight.add(el.id);
      knownIds.add(el.id);
      changed = true;
      const patch = {
        ...(el.customData || {}),
        maskLayer: true, maskState: "visible", maskTint: cfg.maskColor
      };
      if (frameId) patch.maskFrameId = frameId;
      // Don't touch x/y/points — bbox expansion caused a 1px snap on
      // the next click. The custom drag handler hit-tests the polyline
      // directly so a tight bbox is fine. Just fill the stroke shape
      // so the visible blob looks solid.
      return {
        ...el,
        backgroundColor: el.strokeColor,
        fillStyle: "solid",
        customData: patch,
        ...(frameId ? { frameId } : {})
      };
    });
    if (changed) {
      api.updateScene({ elements: next, commitToHistory: false });
      if (typeof refreshMaskStatus === "function") refreshMaskStatus();
    }
  };

  const listener = (e) => {
    if (e.pointerType === "touch") return;
    if (scheduled) return;
    scheduled = true;
    setTimeout(tagFresh, 80);
  };
  canvas.addEventListener("pointerup", listener, true);
  window.__maskHighlighter = { canvas, listener };
  new Notice(`Mask draw armed${frameId ? " (clipped to book frame)" : ""}`);
}
function stopMaskDraw(notify = true) {
  const s = window.__maskHighlighter;
  if (s && s.canvas && s.listener) s.canvas.removeEventListener("pointerup", s.listener, true);
  window.__maskHighlighter = null;
  if (notify) new Notice("Mask draw disarmed");
}
function isMaskArmed() { return !!window.__maskHighlighter; }
var MASK_HIDDEN_OPACITY = 25;  // 0 = invisible; ~25 = ghost so user sees where masks sit

// All mask mutations go through api.updateScene directly. The ea.copy/add
// path was appending duplicate elements in some Excalidraw versions
// (cause of "1 stroke -> 2 masks") and ea.deleteViewElements left
// soft-deleted entries that resurrected on redraw.
function mapScene(idsSet, mutator) {
  const elements = api.getSceneElements() || [];
  let changed = false;
  const next = elements.map(el => {
    if (!idsSet.has(el.id)) return el;
    const upd = mutator(el);
    if (upd && upd !== el) { changed = true; return upd; }
    return el;
  });
  if (changed) api.updateScene({ elements: next, commitToHistory: true });
  return changed;
}
function visOpacity(el, visible) {
  return visible
    ? ((el.customData && el.customData.maskTint) ? cfg.maskOpacity : 100)
    : MASK_HIDDEN_OPACITY;
}
async function setMasksVisible(visible) {
  const masks = getAllMasks();
  if (!masks.length) { new Notice("No masks in view."); return; }
  const ids = new Set(masks.map(m => m.id));
  mapScene(ids, el => ({
    ...el,
    opacity: visOpacity(el, visible),
    customData: { ...(el.customData || {}), maskState: visible ? "visible" : "hidden" }
  }));
  new Notice(`${masks.length} mask(s) ${visible ? "shown" : "hidden"}`);
}
async function setMaskVisible(m, visible) {
  mapScene(new Set([m.id]), el => ({
    ...el,
    opacity: visOpacity(el, visible),
    customData: { ...(el.customData || {}), maskState: visible ? "visible" : "hidden" }
  }));
}
async function setMaskColor(m, color) {
  mapScene(new Set([m.id]), el => ({
    ...el,
    strokeColor: color,
    customData: { ...(el.customData || {}), maskTint: color }
  }));
}
async function deleteMask(m) {
  const elements = api.getSceneElements() || [];
  const next = elements.filter(el => el.id !== m.id);
  api.updateScene({ elements: next, commitToHistory: true });
}
async function toggleMasks() {
  const masks = getAllMasks();
  if (!masks.length) { new Notice("No masks in view."); return; }
  const ref = masks[0].customData.maskState || "visible";
  await setMasksVisible(ref !== "visible");
}
async function clearAllMasks() {
  const masks = getAllMasks();
  if (!masks.length) { new Notice("No masks to clear."); return; }
  const ids = new Set(masks.map(m => m.id));
  const elements = api.getSceneElements() || [];
  const next = elements.filter(el => !ids.has(el.id));
  api.updateScene({ elements: next, commitToHistory: true });
  new Notice(`Cleared ${masks.length} mask(s)`);
}

// =========================================================================================
// Persistent canvas mask-tap listener.
// Installed BEFORE the panel-rebuild branch so it works even when the Pen Styles
// panel is closed / never opened in this session. Re-installed on every run with
// fresh closures over api/view/cfg.
//   Gate: Ctrl/Cmd/Shift + click on laptop; finger tap on iPad (pointerType=touch).
// =========================================================================================
(() => {
  const canvasEl = view.contentEl.querySelector("canvas.interactive");
  if (!canvasEl) return;
  const hostEl = view.contentEl;
  const prior = window.__penStylesMaskTap;
  if (prior && prior.host) {
    if (prior.down)  prior.host.removeEventListener("pointerdown", prior.down,  true);
    if (prior.move)  prior.host.removeEventListener("pointermove", prior.move,  true);
    if (prior.up)    prior.host.removeEventListener("pointerup",   prior.up,    true);
    if (prior.click) {
      prior.host.removeEventListener("click",    prior.click, true);
      prior.host.removeEventListener("dblclick", prior.click, true);
    }
  }
  let active = null;

  function shouldHandle(e) {
    // Don't skip when mask-armed: user may be in Mask Highlighter mode
    // and still want Ctrl/Shift/Cmd+click to toggle existing masks.
    if (e.pointerType === "touch") return true;
    return !!(e.ctrlKey || e.metaKey || e.shiftKey);
  }
  function clientToScene(clientX, clientY) {
    const rect = canvasEl.getBoundingClientRect();
    const app = api.getAppState();
    const zoom = (app.zoom && app.zoom.value) || 1;
    return {
      x: (clientX - rect.left) / zoom - app.scrollX,
      y: (clientY - rect.top)  / zoom - app.scrollY
    };
  }
  function pointSegDist(px, py, ax, ay, bx, by) {
    const dx = bx - ax, dy = by - ay;
    const len2 = dx * dx + dy * dy;
    let t = len2 ? ((px - ax) * dx + (py - ay) * dy) / len2 : 0;
    if (t < 0) t = 0; else if (t > 1) t = 1;
    const cx = ax + t * dx, cy = ay + t * dy;
    return Math.hypot(px - cx, py - cy);
  }
  function hitMaskAt(sx, sy) {
    const masks = (api.getSceneElements() || []).filter(
      el => el.customData && el.customData.maskLayer && !el.isDeleted
    );
    for (let i = masks.length - 1; i >= 0; i--) {
      const m = masks[i];
      const lx = sx - m.x, ly = sy - m.y;
      const r = ((m.strokeWidth || cfg.maskWidth || 18) / 2) + 6;
      const pts = m.points || [];
      if (pts.length === 0) continue;
      if (pts.length === 1) {
        if (Math.hypot(lx - pts[0][0], ly - pts[0][1]) <= r) return m;
        continue;
      }
      for (let j = 1; j < pts.length; j++) {
        if (pointSegDist(lx, ly, pts[j-1][0], pts[j-1][1], pts[j][0], pts[j][1]) <= r) return m;
      }
    }
    return null;
  }
  // Excalidraw's freedraw hit-test is polyline-only — clicks inside the
  // visible blob are missed by the engine, so a normal pointerdown
  // starts a marquee instead of a drag. We intercept pointerdown on a
  // mask, then translate the mask's x/y directly on pointermove. This
  // makes plain selection-tool drag behave the same as any other
  // element. Modifier+click (or touch tap) without drag → toggle
  // hide/show. No drag, plain click → force-select.
  let drag = null;  // { hit, downX, downY, downSx, downSy, origX, origY, kind, dragged }
  const onDown = (e) => {
    drag = null;
    if (e.target !== canvasEl) return;
    const sc = clientToScene(e.clientX, e.clientY);
    const hit = hitMaskAt(sc.x, sc.y);
    if (!hit) return;
    const tool = api.getAppState()?.activeTool?.type;
    const modifier = shouldHandle(e);
    // Plain click on a draw tool → let Excalidraw draw on top.
    if (!modifier && tool !== "selection") return;
    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
    drag = {
      hit, kind: modifier ? "toggle" : "select",
      downX: e.clientX, downY: e.clientY,
      downSx: sc.x, downSy: sc.y,
      origX: hit.x, origY: hit.y,
      dragged: false
    };
  };
  const onMove = (e) => {
    if (!drag) return;
    const pdx = e.clientX - drag.downX, pdy = e.clientY - drag.downY;
    if (!drag.dragged) {
      if (pdx * pdx + pdy * pdy <= 25) return;
      drag.dragged = true;
    }
    const sc = clientToScene(e.clientX, e.clientY);
    const nx = drag.origX + (sc.x - drag.downSx);
    const ny = drag.origY + (sc.y - drag.downSy);
    const elements = api.getSceneElements() || [];
    const next = elements.map(el => el.id === drag.hit.id ? { ...el, x: nx, y: ny } : el);
    api.updateScene({ elements: next, commitToHistory: false });
    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
  };
  const onUp = (e) => {
    if (!drag) return;
    const s = drag; drag = null;
    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
    if (s.dragged) {
      // Re-emit to capture an undo point + select the moved mask.
      const elements = api.getSceneElements() || [];
      api.updateScene({ elements, commitToHistory: true });
      try {
        api.updateScene({
          appState: { selectedElementIds: { [s.hit.id]: true } },
          commitToHistory: false
        });
      } catch (_) {}
      return;
    }
    if (s.kind === "toggle") {
      const fresh = (api.getSceneElements() || []).find(el => el.id === s.hit.id) || s.hit;
      const visible = (fresh.customData && fresh.customData.maskState || "visible") === "visible";
      Promise.resolve(setMaskVisible(fresh, !visible)).then(() => {
        if (state && typeof state.refreshMaskStatus === "function") state.refreshMaskStatus();
      });
    } else {
      try {
        api.updateScene({
          appState: { selectedElementIds: { [s.hit.id]: true } },
          commitToHistory: false
        });
      } catch (_) {}
    }
  };
  const onClickLike = (e) => {
    const gated = !!(e.ctrlKey || e.metaKey || e.shiftKey) || e.pointerType === "touch";
    if (!gated) return;
    const { x: sx, y: sy } = clientToScene(e.clientX, e.clientY);
    if (!hitMaskAt(sx, sy)) return;
    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
  };
  hostEl.addEventListener("pointerdown", onDown, true);
  hostEl.addEventListener("pointermove", onMove, true);
  hostEl.addEventListener("pointerup",   onUp,   true);
  hostEl.addEventListener("click",       onClickLike, true);
  hostEl.addEventListener("dblclick",    onClickLike, true);
  window.__penStylesMaskTap = { host: hostEl, down: onDown, move: onMove, up: onUp, click: onClickLike };
})();

// ---------- shared float-panel z-index stack ----------
function cfRaisePanel(el) {
  if (!el) return;
  if (typeof window.__excaliPanelZ !== "number") window.__excaliPanelZ = 1000;
  el.style.zIndex = String(++window.__excaliPanelZ);
}

// =========================================================================================
// Toggle re-run
// =========================================================================================
var panel = document.getElementById(PANEL_ID);
var wantFine = !!(window.__penStylesOpenFine);
window.__penStylesOpenFine = false;

if (panel) {
  const hidden = panel.style.display === "none";
  if (wantFine) {
    panel.style.display = "";
    if (typeof panel.__setFineOpen === "function") panel.__setFineOpen(true);
    applyActivePen();
    cfRaisePanel(panel);
  } else {
    panel.style.display = hidden ? "" : "none";
    if (hidden) {
      applyActivePen();
      cfRaisePanel(panel);
    } else if (window.__maskHighlighter) {
      // Hiding panel + mask was armed -> disarm to avoid orphan listener.
      const s = window.__maskHighlighter;
      if (s.canvas && s.listener) s.canvas.removeEventListener("pointerup", s.listener, true);
      window.__maskHighlighter = null;
    }
  }
  return;
}

// =========================================================================================
// CSS
// =========================================================================================
if (!document.getElementById(STYLE_ID)) {
  const styleTag = document.createElement("style");
  styleTag.id = STYLE_ID;
  styleTag.textContent = `
    #${PANEL_ID} {
      position: fixed; top: 120px; right: 80px;
      width: 280px; padding: 12px 14px;
      background: var(--background-primary);
      border: 1px solid var(--background-modifier-border);
      border-radius: 9px;
      box-shadow: 0 6px 24px rgba(0,0,0,0.28);
      z-index: 1000; font-size: 11px;
      font-family: var(--font-interface);
      max-height: calc(100vh - 140px); overflow-y: auto;
      touch-action: manipulation;
    }
    #${PANEL_ID} .ps-ico {
      display:inline-flex; align-items:center; justify-content:center;
      width: 12px; height: 12px; flex-shrink:0;
    }
    #${PANEL_ID} .ps-ico svg { width:100%; height:100%; display:block; }
    #${PANEL_ID}::-webkit-scrollbar { width: 6px; }
    #${PANEL_ID}::-webkit-scrollbar-thumb { background: var(--background-modifier-border); border-radius:3px; }

    #${PANEL_ID} .ps-header {
      display:flex; align-items:center; justify-content:space-between;
      padding-bottom:4px; margin-bottom:6px;
      border-bottom:1px solid var(--background-modifier-border);
      cursor: grab; user-select: none;
    }
    #${PANEL_ID} .ps-title {
      font-weight:600; font-size:12px; display:flex; align-items:center; gap:5px;
    }
    #${PANEL_ID} .ps-title svg { color: var(--text-accent); }
    #${PANEL_ID} .ps-close {
      cursor:pointer; padding:0 6px; border-radius:4px; font-size:14px;
      color: var(--text-muted);
    }
    #${PANEL_ID} .ps-close:hover { background: var(--background-modifier-hover); color: var(--text-normal); }

    #${PANEL_ID} .ps-label {
      font-size: 9px; color: var(--text-muted); text-transform: uppercase;
      letter-spacing: 0.4px; font-weight: 600;
      margin: 4px 0 2px;
    }
    #${PANEL_ID} .ps-value {
      font-size: 11px; color: var(--text-normal); font-variant-numeric: tabular-nums;
    }
    #${PANEL_ID} .ps-row-h {
      display:flex; align-items:center; justify-content:space-between;
    }

    /* Compact preset chips */
    #${PANEL_ID} .ps-pen-grid {
      display:grid; grid-template-columns: repeat(2, 1fr); gap:3px;
    }
    #${PANEL_ID} .ps-pen-chip {
      display:flex; align-items:center; gap:5px;
      padding:4px 6px; border-radius:5px; cursor:pointer;
      border:1px solid var(--background-modifier-border);
      background: var(--background-secondary);
      font-size: 10px; font-weight:500; color: var(--text-normal);
      line-height: 1.1;
    }
    #${PANEL_ID} .ps-pen-chip:hover { background: var(--background-modifier-hover); }
    #${PANEL_ID} .ps-pen-chip.is-active {
      border-color: var(--interactive-accent); background: var(--background-modifier-hover);
      box-shadow: inset 0 0 0 1px var(--interactive-accent);
    }
    #${PANEL_ID} .ps-pen-icon {
      width:14px; height:14px; flex-shrink:0;
      display:inline-flex; align-items:center; justify-content:center;
    }
    #${PANEL_ID} .ps-pen-icon svg { width:100%; height:100%; }
    #${PANEL_ID} .ps-pen-name {
      flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    }
    #${PANEL_ID} .ps-chip-del {
      width:14px; height:14px; border-radius:50%;
      display:flex; align-items:center; justify-content:center;
      color: var(--text-muted); font-size:12px; line-height:1;
      flex-shrink:0; opacity:0; transition: opacity 0.1s;
    }
    #${PANEL_ID} .ps-pen-chip:hover .ps-chip-del { opacity: 1; }
    #${PANEL_ID} .ps-chip-del:hover {
      background: var(--background-modifier-error);
      color: var(--text-on-accent, #fff);
    }

    #${PANEL_ID} .ps-color-swatches { display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
    #${PANEL_ID} .ps-swatch {
      width:22px; height:22px; border-radius:50%;
      cursor:pointer; border:2px solid transparent;
      box-shadow: inset 0 0 0 1px var(--background-modifier-border);
    }
    #${PANEL_ID} .ps-swatch.is-active { border-color: var(--interactive-accent); }
    #${PANEL_ID} .ps-color-custom {
      width:22px; height:22px; padding:0;
      border:1px dashed var(--background-modifier-border);
      border-radius:50%; cursor:pointer; background:transparent;
    }

    /* Two-row slider (Paper Mode style): label row above with right-aligned value,
       slider row below filling full width. */
    #${PANEL_ID} .ps-slabel {
      display:flex; align-items:center; justify-content:space-between;
      margin: 6px 0 2px;
    }
    #${PANEL_ID} .ps-slabel .ps-label { margin:0; }
    #${PANEL_ID} .ps-slabel .ps-value {
      font-size:11px; color: var(--text-muted); font-variant-numeric: tabular-nums;
    }
    #${PANEL_ID} .ps-slider-row { display:flex; align-items:center; gap:8px; padding-bottom: 2px; }
    #${PANEL_ID} .ps-slider-row input[type=range] { flex:1; accent-color: var(--interactive-accent); }

    /* Inline (compact) for fine-tune sliders inside collapsible only */
    #${PANEL_ID} .ps-inline {
      display:flex; align-items:center; gap:6px; padding: 3px 0;
    }
    #${PANEL_ID} .ps-inline .ps-label { margin:0; min-width: 52px; }
    #${PANEL_ID} .ps-inline .ps-value { min-width: 32px; text-align:right; }
    #${PANEL_ID} input[type=range] { accent-color: var(--interactive-accent); min-width:0; }
    #${PANEL_ID} select, #${PANEL_ID} input[type=text] {
      flex:1; background: var(--background-secondary); color: var(--text-normal);
      border:1px solid var(--background-modifier-border); border-radius:4px;
      padding:2px 5px; font-size:11px;
    }
    #${PANEL_ID} .ps-check { width:14px; height:14px; accent-color: var(--interactive-accent); margin:0; }

    #${PANEL_ID} .ps-btn {
      display:flex; align-items:center; justify-content:center; gap:4px;
      padding:4px 6px; border-radius:5px; cursor:pointer; user-select:none;
      border:1px solid var(--background-modifier-border);
      background: var(--background-secondary);
      font-size: 10px; color: var(--text-normal); font-weight:500;
      min-height: 24px; touch-action: manipulation;
      transition: background 0.1s, transform 0.05s;
    }
    #${PANEL_ID} .ps-btn:active { transform: scale(0.97); }
    #${PANEL_ID} .ps-btn:hover { background: var(--background-modifier-hover); }
    #${PANEL_ID} .ps-btn-row { display:flex; gap:4px; margin-top: 4px; }
    #${PANEL_ID} .ps-btn-row .ps-btn { flex:1; }
    /* Compact icon-only action bar */
    #${PANEL_ID} .ps-actions {
      display:flex; gap:4px; margin-top: 8px; align-items: center;
    }
    #${PANEL_ID} .ps-icon-btn {
      width: 28px; height: 28px; flex: 0 0 28px;
      display:flex; align-items:center; justify-content:center;
      border-radius: 6px; cursor:pointer; user-select:none;
      border:1px solid var(--background-modifier-border);
      background: var(--background-secondary);
      color: var(--text-normal);
      transition: background 0.1s, transform 0.05s;
    }
    #${PANEL_ID} .ps-icon-btn:hover { background: var(--background-modifier-hover); }
    #${PANEL_ID} .ps-icon-btn:active { transform: scale(0.94); }
    #${PANEL_ID} .ps-icon-btn .ps-ico { width: 14px; height: 14px; }
    #${PANEL_ID} .ps-paper-pill {
      flex:1; display:flex; align-items:center; justify-content:space-between;
      padding:0 10px; height: 28px;
      border-radius: 6px; cursor:pointer; user-select:none;
      border:1px solid var(--background-modifier-border);
      background: var(--background-secondary);
      font-size: 11px; color: var(--text-normal); font-weight:500;
    }
    #${PANEL_ID} .ps-paper-pill:hover { background: var(--background-modifier-hover); }
    #${PANEL_ID} .ps-paper-pill .ps-pp-left {
      display:flex; align-items:center; gap:5px;
    }
    #${PANEL_ID} .ps-paper-pill.is-on {
      border-color: var(--interactive-accent);
    }
    #${PANEL_ID} .ps-paper-pill .ps-toggle-pill {
      width: 24px; height: 13px; border-radius: 7px;
      background: var(--background-modifier-border); position: relative;
      transition: background 0.15s;
    }
    #${PANEL_ID} .ps-paper-pill .ps-toggle-pill::after {
      content: ""; position:absolute; top:2px; left:2px;
      width:9px; height:9px; border-radius:50%;
      background: var(--text-on-accent, #fff);
      transition: left 0.15s;
    }
    #${PANEL_ID} .ps-paper-pill.is-on .ps-toggle-pill { background: var(--interactive-accent); }
    #${PANEL_ID} .ps-paper-pill.is-on .ps-toggle-pill::after { left: 13px; }
    #${PANEL_ID} .ps-btn.is-on {
      border-color: var(--interactive-accent);
      background: var(--interactive-accent);
      color: var(--text-on-accent);
    }
    #${PANEL_ID} .ps-toggle {
      display:flex; align-items:center; justify-content:space-between;
      padding:5px 8px; margin-top:5px; border-radius:5px; cursor:pointer;
      border:1px solid var(--background-modifier-border);
      background: var(--background-secondary);
      font-size: 10px; color: var(--text-normal); font-weight:500;
      user-select:none; min-height: 22px;
    }
    #${PANEL_ID} .ps-toggle:hover { background: var(--background-modifier-hover); }
    #${PANEL_ID} .ps-toggle .ps-toggle-pill {
      width: 22px; height: 13px; border-radius: 7px;
      background: var(--background-modifier-border);
      position: relative; transition: background 0.15s;
    }
    #${PANEL_ID} .ps-toggle .ps-toggle-pill::after {
      content: ""; position:absolute; top:2px; left:2px;
      width:9px; height:9px; border-radius:50%;
      background: var(--text-on-accent, #fff);
      transition: left 0.15s;
    }
    #${PANEL_ID} .ps-toggle.is-on .ps-toggle-pill {
      background: var(--interactive-accent);
    }
    #${PANEL_ID} .ps-toggle.is-on .ps-toggle-pill::after { left: 11px; }

    /* Fine-tune collapsible */
    #${PANEL_ID} .ps-fine-toggle {
      display:flex; align-items:center; justify-content:space-between;
      cursor:pointer; padding:7px 0; margin-top:6px;
      border-top:1px solid var(--background-modifier-border);
      font-size: 12px; color: var(--text-normal); text-transform: uppercase;
      letter-spacing: 0.5px; font-weight: 600;
    }
    #${PANEL_ID} .ps-fine-toggle:hover { color: var(--text-accent); }
    #${PANEL_ID} .ps-fine-toggle:hover { color: var(--text-normal); }
    #${PANEL_ID} .ps-fine-toggle .ps-chev {
      transition: transform 0.15s; width: 12px; height: 12px;
      display: inline-flex; align-items:center; justify-content:center;
    }
    #${PANEL_ID} .ps-fine-toggle .ps-chev svg { width:100%; height:100%; }
    #${PANEL_ID} .ps-fine-toggle.is-open .ps-chev { transform: rotate(90deg); }
    #${PANEL_ID} .ps-fine { display:none; }
    #${PANEL_ID} .ps-fine.is-open { display:block; }
    #${PANEL_ID} .ps-fine .ps-row-h { padding: 3px 0; }
    #${PANEL_ID} .ps-fine .ps-label { margin: 0; min-width: 96px; }
    #${PANEL_ID} .ps-fine .ps-row-h .ps-value { min-width: 36px; text-align:right; }
    #${PANEL_ID} .ps-fine .ps-slider-row { padding: 0 0 3px; }

    /* Mask section */
    #${PANEL_ID} .ps-mask {
      display:none; padding-top:6px; padding-bottom:8px;
      border-bottom:1px solid var(--background-modifier-border);
      margin-bottom: 4px;
    }
    #${PANEL_ID} .ps-mask.is-open { display:block; }
    #${PANEL_ID} .ps-mask-list {
      max-height: 110px; overflow-y:auto;
      margin-top: 6px; padding: 2px;
      border: 1px solid var(--background-modifier-border);
      border-radius: 5px;
      background: var(--background-secondary);
      display: flex; flex-direction: column; gap: 2px;
    }
    #${PANEL_ID} .ps-mask-list:empty::before {
      content: "No masks yet";
      display:block; padding: 8px; text-align:center;
      color: var(--text-muted); font-size: 11px; font-style: italic;
    }
    #${PANEL_ID} .ps-mask-item {
      display:flex; align-items:center; gap:5px;
      padding:3px 5px; border-radius: 4px;
      font-size: 11px; color: var(--text-normal);
    }
    #${PANEL_ID} .ps-mask-item:hover { background: var(--background-modifier-hover); }
    #${PANEL_ID} .ps-mask-item .ps-mask-color {
      width:16px; height:16px; padding:0; flex-shrink:0;
      border:1px solid var(--background-modifier-border);
      border-radius: 3px; cursor:pointer; background:transparent;
    }
    #${PANEL_ID} .ps-mask-item .ps-mask-name {
      flex:1; cursor:pointer; padding: 2px 0;
      white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    }
    #${PANEL_ID} .ps-mask-item .ps-mask-mini {
      width:18px; height:18px; flex:0 0 18px;
      display:flex; align-items:center; justify-content:center;
      border-radius: 3px; cursor:pointer; color: var(--text-muted);
    }
    #${PANEL_ID} .ps-mask-item .ps-mask-mini:hover {
      background: var(--background-modifier-hover); color: var(--text-normal);
    }
    #${PANEL_ID} .ps-mask-item .ps-mask-mini.ps-danger:hover { color: var(--text-error); }
    #${PANEL_ID} .ps-mask-item .ps-mask-mini svg { width: 12px; height: 12px; }
    #${PANEL_ID} .ps-mask-item.is-hidden .ps-mask-name { opacity: 0.55; text-decoration: line-through; }
    #${PANEL_ID} .ps-mask-status {
      font-size: 12px; color: var(--text-muted); padding: 4px 0 6px;
    }
    #${PANEL_ID} .ps-mask-status b { color: var(--text-normal); }
    #${PANEL_ID} .ps-btn-danger { color: var(--text-error); }
    #${PANEL_ID} .ps-icon-btn.is-armed {
      background: var(--text-error);
      border-color: var(--text-error);
      color: var(--text-on-accent, #fff);
      animation: ps-pulse 1.2s ease-in-out infinite;
    }
    @keyframes ps-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.55; }
    }
    #${PANEL_ID} .ps-mask-actions {
      display:flex; gap:5px; margin-top:5px;
    }
    #${PANEL_ID} .ps-mask-actions .ps-icon-btn { flex:1; height: 30px; }
    #${PANEL_ID} .ps-mask-actions .ps-icon-btn .ps-ico { width: 14px; height: 14px; }
  `;
  document.head.appendChild(styleTag);
}

// =========================================================================================
// Build panel
// =========================================================================================
panel = document.createElement("div");
panel.id = PANEL_ID;
document.body.appendChild(panel);
cfRaisePanel(panel);
panel.addEventListener("mousedown", () => cfRaisePanel(panel), true);

// ---- Header ---------------------------------------------------------------------------
const header = panel.createDiv({ cls: "ps-header" });
const titleEl = header.createDiv({ cls: "ps-title" });
titleEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg> Pen Styles`;
const closeBtn = header.createDiv({ cls: "ps-close", text: "✕" });
closeBtn.onclick = (e) => {
  e.stopPropagation();
  panel.style.display = "none";
  // If user closes the panel while mask draw is armed, disarm so the
  // pointerup listener doesn't keep tagging strokes after the UI is gone.
  if (typeof isMaskArmed === "function" && isMaskArmed()) {
    stopMaskDraw(false);
  }
};

// ---- Drag ----------------------------------------------------------------------------
(function makeDraggable() {
  let dragging = false, ox = 0, oy = 0;
  const onDown = (e) => {
    if (e.target.closest(".ps-close")) return;
    const r = panel.getBoundingClientRect();
    dragging = true; ox = e.clientX - r.left; oy = e.clientY - r.top;
    header.style.cursor = "grabbing";
    e.preventDefault();
  };
  const onMove = (e) => {
    if (!dragging) return;
    const w = panel.offsetWidth, h = panel.offsetHeight, m = 8;
    const left = Math.max(m, Math.min(window.innerWidth  - w - m, e.clientX - ox));
    const top  = Math.max(m, Math.min(window.innerHeight - h - m, e.clientY - oy));
    panel.style.setProperty("left",  `${left}px`, "important");
    panel.style.setProperty("top",   `${top}px`,  "important");
    panel.style.setProperty("right", "auto", "important");
  };
  const onUp = () => {
    if (dragging) { dragging = false; header.style.cursor = "grab"; }
  };
  const onResize = () => {
    const r = panel.getBoundingClientRect(), m = 8;
    if (r.right  > window.innerWidth  - m) panel.style.setProperty("left", `${Math.max(m, window.innerWidth  - r.width  - m)}px`, "important");
    if (r.bottom > window.innerHeight - m) panel.style.setProperty("top",  `${Math.max(m, window.innerHeight - r.height - m)}px`, "important");
    if (r.left < m) panel.style.setProperty("left", `${m}px`, "important");
    if (r.top  < m) panel.style.setProperty("top",  `${m}px`, "important");
  };
  header.addEventListener("mousedown", onDown);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);
  window.addEventListener("resize", onResize);
  state.cleanup.push(() => {
    header.removeEventListener("mousedown", onDown);
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onUp);
    window.removeEventListener("resize", onResize);
  });
})();

// ---- Pen preset grid -----------------------------------------------------------------
panel.createDiv({ cls: "ps-label", text: "PEN" });
const grid = panel.createDiv({ cls: "ps-pen-grid" });
const chipEls = {};
function rebuildGrid() {
  grid.empty();
  for (const [name, p] of Object.entries(allPresets())) {
    const chip = grid.createDiv({ cls: "ps-pen-chip" });
    // Icon stroke uses theme text color so it's always readable on the
    // chip background (pen-ink colors like pure black or pale yellow
    // were invisible under dark / light themes respectively).
    const col = "currentColor";
    const isCustom = !BUILTIN_PRESETS[name];
    const delHtml = isCustom ? `<span class="ps-chip-del" title="Delete preset">×</span>` : "";
    const iconKey = PEN_ICONS[name] ? name : "Fine Pen";
    chip.innerHTML = `<span class="ps-pen-icon">${penIconSvg(iconKey, col)}</span><span class="ps-pen-name">${name}</span>${delHtml}`;
    chipEls[name] = chip;
    chip.onclick = (e) => {
      if (e.target.closest(".ps-chip-del")) return;
      cfg.active = name;
      cfg.width = null; cfg.color = null; cfg.opacity = null;
      Object.entries(chipEls).forEach(([k, el]) => el.classList.toggle("is-active", k === name));
      state.dirty = true; applyActivePen(); persistSoon();
      syncControls(); syncFineRows();
    };
    if (isCustom) {
      const del = chip.querySelector(".ps-chip-del");
      del.onclick = async (e) => {
        e.stopPropagation();
        let ok = false;
        try {
          ok = await utils.suggester(
            [`Delete preset "${name}"`, "Cancel"], [true, false], "Confirm delete"
          );
        } catch (_) {
          // utils.suggester unavailable → fall back to inline confirm
          ok = confirm(`Delete preset "${name}"?`);
        }
        if (!ok) return;
        delete cfg.customPresets[name];
        if (cfg._tune) delete cfg._tune[name];
        if (cfg.active === name) {
          cfg.active = "Native iPad";
          cfg.width = cfg.color = cfg.opacity = null;
        }
        state.dirty = true; persistSoon();
        rebuildGrid(); syncControls(); syncFineRows(); applyActivePen();
        new Notice(`Deleted preset: ${name}`);
      };
    }
    if (name === cfg.active) chip.classList.add("is-active");
  }
}
rebuildGrid();

// Placeholder mounted right after the PEN grid so Mask section renders here.
const maskMount = panel.createDiv();

// ---- Color swatches ------------------------------------------------------------------
panel.createDiv({ cls: "ps-label", text: "COLOR" });
const swatchRow = panel.createDiv({ cls: "ps-color-swatches" });
const swatchEls = [];
for (const c of COLOR_PRESETS) {
  const sw = swatchRow.createDiv({ cls: "ps-swatch", attr: { title: c } });
  sw.style.background = c;
  swatchEls.push({ el: sw, color: c });
  sw.onclick = () => {
    cfg.color = c;
    customPicker.value = c;
    swatchEls.forEach(s => s.el.classList.toggle("is-active", s.color === c));
    state.dirty = true; applyActivePen(); persistSoon();
    syncFineRows();
  };
}
const customPicker = document.createElement("input");
customPicker.type = "color";
customPicker.className = "ps-color-custom";
customPicker.title = "Custom color";
customPicker.oninput = (e) => {
  cfg.color = e.target.value;
  swatchEls.forEach(s => s.el.classList.toggle("is-active", s.color.toLowerCase() === cfg.color.toLowerCase()));
  state.dirty = true; applyActivePen(); persistSoon();
  syncFineRows();
};
swatchRow.appendChild(customPicker);

// ---- Width + Opacity sliders (Paper-Mode style: label row + slider row) -------------
const wHead = panel.createDiv({ cls: "ps-slabel" });
wHead.createDiv({ cls: "ps-label", text: "WIDTH" });
const wValue = wHead.createDiv({ cls: "ps-value", text: "" });
const wRow = panel.createDiv({ cls: "ps-slider-row" });
const wSlider = document.createElement("input");
wSlider.type = "range"; wSlider.min = 1; wSlider.max = 60; wSlider.step = 0.5;
wRow.appendChild(wSlider);
wSlider.oninput = () => {
  cfg.width = parseFloat(wSlider.value);
  wValue.setText(`${cfg.width}px`);
  state.dirty = true; applyActivePen(); persistSoon();
  if (fineWidth) { fineWidth.input.value = cfg.width; fineWidth.value.setText(`${cfg.width}px`); }
};

const oHead = panel.createDiv({ cls: "ps-slabel" });
oHead.createDiv({ cls: "ps-label", text: "OPACITY" });
const oValue = oHead.createDiv({ cls: "ps-value", text: "" });
const oRow = panel.createDiv({ cls: "ps-slider-row" });
const oSlider = document.createElement("input");
oSlider.type = "range"; oSlider.min = 0; oSlider.max = 100; oSlider.step = 1;
oRow.appendChild(oSlider);
oSlider.oninput = () => {
  cfg.opacity = parseFloat(oSlider.value);
  oValue.setText(`${cfg.opacity}%`);
  state.dirty = true; applyActivePen(); persistSoon();
  if (fineOp) { fineOp.input.value = cfg.opacity; fineOp.value.setText(`${cfg.opacity}%`); }
};

function syncControls() {
  const p = activePresetCopy();
  wSlider.value = p.strokeWidth; wValue.setText(`${p.strokeWidth}px`);
  oSlider.value = p.opacity;     oValue.setText(`${p.opacity}%`);
  customPicker.value = p.strokeColor && /^#[0-9a-f]{6}$/i.test(p.strokeColor) ? p.strokeColor : "#000000";
  swatchEls.forEach(s => s.el.classList.toggle("is-active", s.color.toLowerCase() === (p.strokeColor||"").toLowerCase()));
}
syncControls();

// ---- Action buttons ------------------------------------------------------------------
// ---- Action bar (icon-only) + paper feel pill ---------------------------------------
const actions = panel.createDiv({ cls: "ps-actions" });
const btnApply = actions.createDiv({ cls: "ps-icon-btn", attr: { title: "Activate pen" } });
btnApply.innerHTML = ico("play");
btnApply.onclick = () => { applyActivePen(); new Notice(`Pen → ${cfg.active}`); };

const btnClear = actions.createDiv({ cls: "ps-icon-btn", attr: { title: "Reset to default freedraw" } });
btnClear.innerHTML = ico("undo");
btnClear.onclick = () => { clearPen(); new Notice("Pen → default freedraw"); };

const btnSave = actions.createDiv({ cls: "ps-icon-btn", attr: { title: "Save current as preset" } });
btnSave.innerHTML = ico("save");
btnSave.onclick = async () => {
  const snap = activePresetCopy();
  let name = await utils.inputPrompt("Save current pen as preset", "My Pen", "My Pen");
  if (!name) return;
  name = name.trim();
  if (!name) { new Notice("Preset name cannot be empty."); return; }
  if (BUILTIN_PRESETS[name]) {
    new Notice(`"${name}" is a built-in preset name — pick another.`);
    return;
  }
  cfg.customPresets[name] = snap;
  cfg.active = name;
  cfg.width = cfg.color = cfg.opacity = null;
  state.dirty = true; persistSoon();
  rebuildGrid(); syncControls(); syncFineRows();
  new Notice(`Saved preset: ${name}`);
};

const paperToggle = actions.createDiv({ cls: "ps-paper-pill", attr: { title: "Paper feel modifier" } });
paperToggle.innerHTML = `<span class="ps-pp-left">${ico("paper")}<span>Paper</span></span><span class="ps-toggle-pill"></span>`;
function syncPaperToggle() { paperToggle.classList.toggle("is-on", !!cfg.paperFeel); }
syncPaperToggle();
paperToggle.onclick = () => {
  cfg.paperFeel = !cfg.paperFeel;
  syncPaperToggle();
  state.dirty = true; applyActivePen(); persistSoon();
  if (cfg.fineOpen) buildFineRows();
};

// =========================================================================================
// Mask Highlighter collapsible section (mounted under PEN grid)
// =========================================================================================
const maskToggle = maskMount.createDiv({ cls: "ps-fine-toggle" });
maskToggle.innerHTML = `<span style="display:flex;align-items:center;gap:6px">${ico("mask")}<span>Mask Highlighter</span></span><span class="ps-chev">${ICON.chev}</span>`;
const maskBox = maskMount.createDiv({ cls: "ps-mask" });

function setMaskOpen(open) {
  cfg.maskOpen = !!open;
  maskToggle.classList.toggle("is-open", cfg.maskOpen);
  maskBox.classList.toggle("is-open", cfg.maskOpen);
  state.dirty = true; persistSoon();
}
// Click behavior on the section header:
//   - Single click  -> open/close the section.
//   - Two clicks within 350ms -> flip ALL masks visible <-> hidden (also
//     undoes the two open/close toggles, so section state stays put).
// Custom detection (instead of native ondblclick) works reliably on touch
// devices where the OS may suppress dblclick after a tap.
var maskClickTimer = null;
var maskClickCount = 0;
maskToggle.onclick = async (e) => {
  maskClickCount++;
  if (maskClickCount === 1) {
    setMaskOpen(!cfg.maskOpen);
    maskClickTimer = setTimeout(() => { maskClickCount = 0; }, 350);
    return;
  }
  // Second click within window: undo the first open/close and flip masks.
  clearTimeout(maskClickTimer);
  maskClickCount = 0;
  setMaskOpen(!cfg.maskOpen);   // revert section state
  await toggleMasks();
  refreshMaskStatus();
};
if (cfg.maskOpen) setMaskOpen(true);

const maskStatusEl = maskBox.createDiv({ cls: "ps-mask-status" });
const maskListEl = maskBox.createDiv({ cls: "ps-mask-list" });

function scrollToMask(m) {
  // Read fresh: the captured m may be stale after a scene update.
  const fresh = (api.getSceneElements() || []).find(el => el.id === m.id) || m;
  try {
    // Switch to selection tool + select + zoom in ONE updateScene so
    // Excalidraw's tool state doesn't override the selection set by a
    // later call (which was the "needs double click" bug).
    api.updateScene({
      appState: {
        activeTool: { type: "selection", lastActiveTool: null, locked: false },
        selectedElementIds: { [fresh.id]: true }
      },
      commitToHistory: false
    });
    if (typeof api.scrollToContent === "function") {
      try {
        api.scrollToContent([fresh], { fitToContent: true, animate: true, duration: 280 });
      } catch (_) {
        api.scrollToContent([fresh]);
      }
    } else if (typeof ea.targetView?.zoomToFit === "function") {
      ea.targetView.zoomToFit([fresh]);
    }
    // Re-apply selection AFTER scroll (scroll may clear it depending on
    // plugin version). 50ms is enough for the animate frame to settle.
    setTimeout(() => {
      try {
        api.updateScene({
          appState: { selectedElementIds: { [fresh.id]: true } },
          commitToHistory: false
        });
      } catch (_) {}
    }, 60);
  } catch (e) { console.warn("scrollToMask failed", e); }
}

function refreshMaskStatus() {
  const masks = getAllMasks();
  const vis = masks.filter(m => (m.customData.maskState || "visible") === "visible").length;
  maskStatusEl.innerHTML = `<b>${masks.length}</b> mask(s) · <b>${vis}</b> visible`;
  maskListEl.empty();
  masks.forEach((m, i) => {
    const item = maskListEl.createDiv({ cls: "ps-mask-item" });
    const state = m.customData.maskState || "visible";
    if (state !== "visible") item.classList.add("is-hidden");
    const tint = m.customData.maskTint || m.strokeColor || cfg.maskColor;

    const colorInp = document.createElement("input");
    colorInp.type = "color"; colorInp.className = "ps-mask-color"; colorInp.value = tint;
    colorInp.title = "Mask color";
    colorInp.onclick = (e) => e.stopPropagation();
    // Live-apply on input WITHOUT rebuilding the list (rebuild would tear down
    // the open color picker DOM, snapping it shut and reverting the swatch).
    colorInp.oninput = async (e) => {
      await setMaskColor(m, e.target.value);
    };
    // Commit + refresh list only after the picker closes (change fires once).
    colorInp.onchange = async (e) => {
      await setMaskColor(m, e.target.value);
      refreshMaskStatus();
    };
    item.appendChild(colorInp);

    const name = item.createDiv({ cls: "ps-mask-name", text: `Mask #${i + 1}` });
    name.onclick = () => scrollToMask(m);

    const visBtn = item.createDiv({ cls: "ps-mask-mini" });
    visBtn.title = state === "visible" ? "Hide this mask" : "Show this mask";
    visBtn.innerHTML = state === "visible" ? ICON.eye : ICON.eyeOff;
    visBtn.onclick = async (e) => {
      e.stopPropagation();
      await setMaskVisible(m, state !== "visible");
      refreshMaskStatus();
    };

    const delBtn = item.createDiv({ cls: "ps-mask-mini ps-danger" });
    delBtn.title = "Delete this mask";
    delBtn.innerHTML = ICON.trash;
    delBtn.onclick = async (e) => {
      e.stopPropagation();
      await deleteMask(m);
      refreshMaskStatus();
    };
  });
}
refreshMaskStatus();
// Expose for the persistent canvas listener installed earlier (before panel build).
state.refreshMaskStatus = refreshMaskStatus;

// Draw mask button removed: Mask Highlighter pen preset in the PEN grid
// handles arming/disarming the mask listener now.

// 4 icon-only buttons in single row — Show / Hide / Toggle / Clear
const maskActions = maskBox.createDiv({ cls: "ps-mask-actions" });
const showB = maskActions.createDiv({ cls: "ps-icon-btn", attr: { title: "Show masks" } });
showB.innerHTML = ico("eye");
showB.onclick = async () => { await setMasksVisible(true); refreshMaskStatus(); };
const hideB = maskActions.createDiv({ cls: "ps-icon-btn", attr: { title: "Hide masks" } });
hideB.innerHTML = ico("eyeOff");
hideB.onclick = async () => { await setMasksVisible(false); refreshMaskStatus(); };
const togB = maskActions.createDiv({ cls: "ps-icon-btn", attr: { title: "Toggle masks" } });
togB.innerHTML = ico("refresh");
togB.onclick = async () => { await toggleMasks(); refreshMaskStatus(); };
const clrB = maskActions.createDiv({ cls: "ps-icon-btn ps-btn-danger", attr: { title: "Click twice to clear all masks" } });
clrB.innerHTML = ico("trash");
let clrArmed = false; let clrTimer = null;
function disarmClear() {
  clrArmed = false;
  clrB.classList.remove("is-armed");
  clrB.innerHTML = ico("trash");
  if (clrTimer) { clearTimeout(clrTimer); clrTimer = null; }
}
clrB.onclick = async () => {
  if (clrArmed) {
    disarmClear();
    await clearAllMasks();
    refreshMaskStatus();
    return;
  }
  clrArmed = true;
  clrB.classList.add("is-armed");
  clrB.innerHTML = `${ico("trash")}`;
  clrB.title = "Click again to confirm delete all";
  new Notice("Click trash again to delete all masks");
  clrTimer = setTimeout(disarmClear, 2500);
};

// Mask color / width / opacity controls removed: the global PEN COLOR / WIDTH /
// OPACITY rows now drive the active preset, including Mask Highlighter.

// =========================================================================================
// Fine-tune collapsible section (replaces separate Pen Settings panel)
// =========================================================================================
const fineToggle = panel.createDiv({ cls: "ps-fine-toggle" });
fineToggle.innerHTML = `<span style="display:flex;align-items:center;gap:6px">${ico("sliders")}<span>Fine-tune</span></span><span class="ps-chev">${ICON.chev}</span>`;
const fineBox = panel.createDiv({ cls: "ps-fine" });

function setFineOpen(open) {
  cfg.fineOpen = !!open;
  fineToggle.classList.toggle("is-open", cfg.fineOpen);
  fineBox.classList.toggle("is-open", cfg.fineOpen);
  state.dirty = true; persistSoon();
}
panel.__setFineOpen = setFineOpen;
fineToggle.onclick = () => setFineOpen(!cfg.fineOpen);
if (cfg.fineOpen || wantFine) setFineOpen(true);

// Build fine-tune rows; rows mutate the active preset's customDataopts directly via
// a derived "fine draft" object refreshed when preset switches.
var fineRows = [];
var fineWidth = null, fineOp = null;

function getActivePenOptions() {
  // Always tune the *active* preset object (or its custom override). We mutate a working
  // copy stored on cfg.customPresets when user edits builtin: clone into customPresets
  // with same name suffixed " (tuned)" so builtins stay pure.
  // Simpler: store live tuning in cfg._tune and merge in activePresetCopy.
  if (!cfg._tune) cfg._tune = {};
  if (!cfg._tune[cfg.active]) {
    const p = getPreset(cfg.active);
    cfg._tune[cfg.active] = p ? clone(p.penOptions) : null;
  }
  return cfg._tune[cfg.active];
}

// Override activePresetCopy + applyActivePen to honor _tune
const origActivePresetCopy = activePresetCopy;
activePresetCopy = function() {
  const s = origActivePresetCopy();
  const t = cfg._tune && cfg._tune[cfg.active];
  if (t) s.penOptions = clone(t);
  return s;
};

function sliderRow(parent, label, value, min, max, step, fmt, onChange) {
  const row = parent.createDiv({ cls: "ps-inline" });
  row.createDiv({ cls: "ps-label", text: label });
  const i = document.createElement("input");
  i.type = "range"; i.min = min; i.max = max; i.step = step; i.value = value;
  row.appendChild(i);
  const v = row.createDiv({ cls: "ps-value", text: fmt(value) });
  i.oninput = () => { const x = parseFloat(i.value); v.setText(fmt(x)); onChange(x); applyActivePen(); state.dirty = true; persistSoon(); };
  return { input: i, value: v };
}
function selectRow(parent, label, options, value, onChange) {
  const r = parent.createDiv({ cls: "ps-inline" });
  r.createDiv({ cls: "ps-label", text: label });
  const s = document.createElement("select");
  for (const o of options) {
    const opt = document.createElement("option");
    opt.value = o; opt.text = o;
    if (o === value) opt.selected = true;
    s.appendChild(opt);
  }
  r.appendChild(s);
  s.onchange = () => { onChange(s.value); applyActivePen(); state.dirty = true; persistSoon(); };
  return s;
}
function checkRow(parent, label, value, onChange) {
  const r = parent.createDiv({ cls: "ps-inline" });
  r.createDiv({ cls: "ps-label", text: label }).style.flex = "1";
  const c = document.createElement("input");
  c.type = "checkbox"; c.className = "ps-check"; c.checked = !!value;
  r.appendChild(c);
  c.onchange = () => { onChange(c.checked); applyActivePen(); state.dirty = true; persistSoon(); };
  return c;
}

function buildFineRows() {
  fineBox.empty();
  const t = getActivePenOptions();
  if (!t) { fineBox.createDiv({ text: "No active preset." }); return; }
  const o = t.options;
  const p = activePresetCopy();

  fineWidth = sliderRow(fineBox, "Width",     p.strokeWidth, 1, 40, 0.5, v => `${v}px`, v => {
    cfg.width = v; wSlider.value = v; wValue.setText(`${v}px`);
  });
  fineOp    = sliderRow(fineBox, "Opacity",   p.opacity, 0, 100, 1, v => `${v}%`, v => {
    cfg.opacity = v; oSlider.value = v; oValue.setText(`${v}%`);
  });
  sliderRow(fineBox, "Thinning",   o.thinning,   -1, 1, 0.05, v => v.toFixed(2), v => o.thinning = v);
  sliderRow(fineBox, "Smoothing",  o.smoothing,   0, 1, 0.05, v => v.toFixed(2), v => o.smoothing = v);
  sliderRow(fineBox, "Streamline", o.streamline,  0, 1, 0.05, v => v.toFixed(2), v => o.streamline = v);
  sliderRow(fineBox, "Taper start", +o.start.taper || 0, 0, 100, 1, v => `${v}`, v => o.start.taper = v);
  sliderRow(fineBox, "Taper end",   +o.end.taper   || 0, 0, 100, 1, v => `${v}`, v => o.end.taper   = v);
  selectRow(fineBox, "Easing",          EASINGS, o.easing, v => o.easing = v);
  checkRow (fineBox, "Constant pressure", t.constantPressure, v => t.constantPressure = v);
  checkRow (fineBox, "Highlighter mode",  t.highlighter,      v => t.highlighter = v);
  checkRow (fineBox, "Real pressure",    !o.simulatePressure, v => o.simulatePressure = !v);
}
function syncFineRows() { if (cfg.fineOpen) buildFineRows(); }
buildFineRows();

// ---- Auto-apply on first open --------------------------------------------------------
applyActivePen();
/*
```
*/
