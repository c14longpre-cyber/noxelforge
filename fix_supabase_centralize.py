"""
Centralise getSupabase() vers lib/supabaseClient.ts dans tout le backend Forge.
Corrige le bug 'Node.js 18 WebSocket' partout d'un coup au lieu de 9 endroits.

Usage: place ce fichier a la racine du repo NOXEL FORGE, puis:
    python fix_supabase_centralize.py
"""

import re
from pathlib import Path

ROOT = Path("backend/src")

# (chemin relatif depuis backend/src, import path vers lib/supabaseClient)
TARGETS = [
    ("controllers/forge/members.controller.ts", "../../lib/supabaseClient"),
    ("controllers/forge/submissions.controller.ts", "../../lib/supabaseClient"),
    ("cron/forgeBadgeCron.ts", "../lib/supabaseClient"),
    ("services/forge/alfred.forge.service.ts", "../../lib/supabaseClient"),
    ("services/forge/badgeChecker.service.ts", "../../lib/supabaseClient"),
    ("services/forge/matchmaking.service.ts", "../../lib/supabaseClient"),
    ("services/forge/spamGate.service.ts", "../../lib/supabaseClient"),
    ("services/forge/stripe.forge.service.ts", "../../lib/supabaseClient"),
    ("services/forge/trustScore.service.ts", "../../lib/supabaseClient"),
]

IMPORT_CREATECLIENT_RE = re.compile(
    r"^\s*import\s*\{\s*createClient\s*\}\s*from\s*['\"]@supabase/supabase-js['\"];?\s*\r?\n?",
    re.MULTILINE,
)
FUNC_GETSUPABASE_RE = re.compile(
    r"function\s+getSupabase\s*\(\s*\)\s*\{\s*return\s+createClient\([^;]*\);\s*\}\s*\r?\n?",
)

changed = []
skipped = []

for rel_path, import_path in TARGETS:
    file_path = ROOT / rel_path
    if not file_path.exists():
        skipped.append(f"INTROUVABLE: {file_path}")
        continue

    original = file_path.read_text(encoding="utf-8")
    text = original

    if "createClient" not in text:
        skipped.append(f"DEJA PROPRE (pas de createClient): {file_path}")
        continue

    text = IMPORT_CREATECLIENT_RE.sub("", text)
    text, n_func = FUNC_GETSUPABASE_RE.subn("", text)

    if n_func == 0:
        skipped.append(f"PATTERN getSupabase() NON TROUVE (a verifier manuellement): {file_path}")
        continue

    import_line = f"import {{ getSupabase }} from '{import_path}';\n"

    lines = text.split("\n")
    last_import_idx = -1
    for i, line in enumerate(lines):
        if line.strip().startswith("import "):
            last_import_idx = i

    if last_import_idx >= 0:
        lines.insert(last_import_idx + 1, import_line.rstrip("\n"))
    else:
        lines.insert(0, import_line.rstrip("\n"))

    new_text = "\n".join(lines)
    new_text = re.sub(r"\n{3,}", "\n\n", new_text)

    file_path.write_text(new_text, encoding="utf-8")
    changed.append(str(file_path))

print("=" * 60)
print(f"MODIFIES ({len(changed)}):")
for f in changed:
    print(f"  OK  {f}")
print()
print(f"IGNORES ({len(skipped)}):")
for f in skipped:
    print(f"  --  {f}")
print("=" * 60)
print("\nVerifie chaque fichier avec 'git diff' avant de commit.")
print("Lance 'npm run build' dans backend/ pour valider la compilation.")
