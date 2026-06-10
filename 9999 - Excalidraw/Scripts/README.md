# Scripts/

Excalidraw scripts. One `.md` per script. Each holds JS code that Excalidraw runs from its Scripts panel.

## How they get into the vault

`install.sh` copies every `*.md` here → `<vault>/Excalidraw/Scripts/`.

After install: Excalidraw plugin auto-detects new scripts. Right-click each in Scripts panel → Pin.

## Each script

20 scripts. Most pair with an SVG in `../Icons/` and a Templater startup in `../TemplateOfTemplator/`.

Highlights:
- **AI Edit** — send selected element to LLM, replace with response.
- **Slideshow** — fullscreen presentation mode w/ freedraw pen overlay.
- **Vim Mode** — modal keys inside Excalidraw.
- **LaTeX Canvas** — render LaTeX as embedded element.
- **Book Mode** — read-only flip view.
- **Zen Mode** — hide UI chrome.
- **Resize Pills** — tap-targets for resizing on mobile.
- See file list for the rest.

## Editing flow

1. Edit `<script>.md` here.
2. `cp` to `<vault>/Excalidraw/Scripts/<script>.md` (or re-run installer).
3. Excalidraw reloads script on next invocation.

## Adding a new script

1. Drop new `<name>.md` here.
2. Optional: matching `<name>.svg` in `../Icons/`.
3. Optional: `<name>-startup.md` in `../TemplateOfTemplator/` for first-run setup.
4. Re-run `../install.sh`.
