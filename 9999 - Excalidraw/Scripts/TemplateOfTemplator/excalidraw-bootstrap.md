<%*
// Excalidraw plugin bootstrap — auto-pin recommended scripts + set script folder
// path on first run (after a fresh clone). Idempotent: skips if pins already set.
//
// Add this file to Templater "Startup Templates" list. Runs on every Obsidian
// load but only mutates data.json when pins are missing.

const SCRIPT_FOLDER = "9999 - Excalidraw/Scripts";
const RECOMMENDED_PINS = [
  `${SCRIPT_FOLDER}/Voice Text.md`,
  `${SCRIPT_FOLDER}/Pen Styles.md`,
  `${SCRIPT_FOLDER}/Slideshow.md`,
  `${SCRIPT_FOLDER}/Minimap.md`,
  `${SCRIPT_FOLDER}/Book Mode.md`,
  `${SCRIPT_FOLDER}/Excalidraw Collaboration Frame.md`,
  `${SCRIPT_FOLDER}/Paper Mode.md`,
  `${SCRIPT_FOLDER}/Zoom Box.md`,
];

const PLUGIN_DIR  = ".obsidian/plugins/obsidian-excalidraw-plugin";
const DATA_PATH   = `${PLUGIN_DIR}/data.json`;
const adapter     = app.vault.adapter;

let data = {};
try {
  const raw = await adapter.read(DATA_PATH);
  data = JSON.parse(raw);
} catch (_) {
  // No data.json yet — fresh clone. Start with empty object; plugin
  // will fill defaults on next load.
}

let mutated = false;

// Pin list — set only if empty or missing entirely. Don't clobber a custom
// list the user already curated.
if (!Array.isArray(data.pinnedScripts) || data.pinnedScripts.length === 0) {
  data.pinnedScripts = RECOMMENDED_PINS.slice();
  mutated = true;
}

// Script folder path — set only if unset / pointing to old "Excalidraw/Scripts".
if (!data.scriptFolderPath || data.scriptFolderPath === "Excalidraw/Scripts") {
  data.scriptFolderPath = SCRIPT_FOLDER;
  mutated = true;
}

if (!mutated) return;

await adapter.write(DATA_PATH, JSON.stringify(data, null, 2));

// Hot-reload Excalidraw plugin so it picks up new pins + scriptFolderPath
// without a full Obsidian restart. Wrapped in try because hot-reload is
// unsupported on some mobile platforms.
try {
  const id = "obsidian-excalidraw-plugin";
  await app.plugins.disablePlugin(id);
  await app.plugins.enablePlugin(id);
  new Notice("Excalidraw: recommended scripts pinned ✓");
} catch (e) {
  new Notice("Excalidraw bootstrap done — restart Obsidian to activate pins");
}
%>
