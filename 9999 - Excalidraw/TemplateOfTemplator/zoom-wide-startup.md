<%*
// Auto-installs the Zoom Wide widget on every Excalidraw view.
// Pin "Zoom Wide" in Excalidraw scripts first, then register this as a
// Templater Startup Template.
//
// Zoom Wide toggles visibility on re-run, so we track fired leaves in a
// WeakSet to make sure we never fire twice on the same leaf (which would
// hide the widget instead of showing it).
const id = "obsidian-excalidraw-plugin:Zoom Wide";
const seen = (window.__zoomWideStartupSeen ||= new WeakSet());
const fire = () => { if (app.commands.commands[id]) app.commands.executeCommandById(id); };
const tryFireForLeaf = (leaf) => {
  if (leaf?.view?.getViewType?.() !== "excalidraw") return;
  if (seen.has(leaf)) return;
  seen.add(leaf);
  setTimeout(fire, 250);
};
app.workspace.onLayoutReady(() => tryFireForLeaf(app.workspace.activeLeaf));
app.workspace.on("active-leaf-change", tryFireForLeaf);
%>
