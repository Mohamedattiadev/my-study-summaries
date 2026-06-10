# Excalidraw Plugin Config Template

`data.json` (gitignored) holds runtime settings including AI API keys.
`data.template.json` (committed) mirrors it with secrets stripped.

## Fresh clone bootstrap

```bash
cd .obsidian/plugins/obsidian-excalidraw-plugin/
cp data.template.json data.json
```

Then:
- Open Obsidian → Excalidraw settings → AI providers → paste your own API keys.
- Pinned scripts, custom pens, paper modes, default colors etc. carry over automatically.

## Updating template after pin / setting changes

```bash
python3 - <<'PY'
import json, os
src = "data.json"
d = json.load(open(src))
def looks_secret(k):
    kl = k.lower()
    return any(s in kl for s in ["key","token","secret","password","apikey"])
def scrub(o):
    if isinstance(o, dict):
        for k,v in o.items():
            if looks_secret(k):
                if isinstance(v,str): o[k]=""
                elif isinstance(v,dict) and isinstance(v.get("value"),str): v["value"]=""
            else: scrub(v)
    elif isinstance(o, list):
        for x in o: scrub(x)
scrub(d)
json.dump(d, open("data.template.json","w"), indent=2, ensure_ascii=False)
print("template updated")
PY
```

Run after any pin / settings change you want shared across devices.
