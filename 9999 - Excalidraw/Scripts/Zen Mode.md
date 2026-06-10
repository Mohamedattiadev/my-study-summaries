---
excalidraw-plugin: parsed
---

/*
Zen Mode — toggle full-canvas view by hiding Obsidian chrome around active Excalidraw.
Hides ribbon, tab header, status bar, left/right sidebars. Excalidraw toolbars stay.
Re-run to restore. State stored on document.body class.

```javascript
*/
var STYLE_ID = "excalidraw-zen-style";
var BODY_CLASS = "excalidraw-zen";

// Remove the stale About entry that earlier seeded an unwanted input
// widget in the Excalidraw settings UI for this script.
(async () => {
  const s = ea.getScriptSettings() || {};
  if (s["About"]) { delete s["About"]; await ea.setScriptSettings(s); }
})();

if (!document.getElementById(STYLE_ID)) {
  const s = document.createElement("style");
  s.id = STYLE_ID;
  s.textContent = `
    body.${BODY_CLASS} .workspace-ribbon,
    body.${BODY_CLASS} .status-bar,
    body.${BODY_CLASS} .workspace-split.mod-left-split,
    body.${BODY_CLASS} .workspace-split.mod-right-split,
    body.${BODY_CLASS} .workspace-tab-header-container,
    body.${BODY_CLASS} .view-header,
    body.${BODY_CLASS} .titlebar { display: none !important; }
    body.${BODY_CLASS} .workspace-split.mod-root { margin: 0 !important; padding: 0 !important; }
    body.${BODY_CLASS} .excalidraw .HintViewer { display: none !important; }
  `;
  document.head.appendChild(s);
}

var on = document.body.classList.toggle(BODY_CLASS);

// Force layout refresh so Excalidraw recomputes canvas size.
window.dispatchEvent(new Event("resize"));

new Notice(on ? "🧘 Zen ON" : "Zen OFF", 1500);
/*
```
*/
