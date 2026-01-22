import json
from pathlib import Path

HTML_TEMPLATE = """<!doctype html>
<html>
  <head>
    <meta charset=\"utf-8\" />
    <title>Glossary API Docs</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
    <style>
      body { margin: 0; padding: 0; }
    </style>
  </head>
  <body>
    <redoc spec-url=\"./openapi.json\"></redoc>
    <script src=\"https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js\"></script>
  </body>
</html>
"""


def generate_static_docs(openapi_schema: dict) -> Path:
    output_dir = Path(__file__).resolve().parents[1] / "static-docs"
    output_dir.mkdir(parents=True, exist_ok=True)

    openapi_path = output_dir / "openapi.json"
    openapi_path.write_text(json.dumps(openapi_schema, ensure_ascii=False, indent=2), encoding="utf-8")

    html_path = output_dir / "index.html"
    html_path.write_text(HTML_TEMPLATE, encoding="utf-8")

    return output_dir
