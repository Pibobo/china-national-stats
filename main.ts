import { cpSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

/* China in Numbers — the hand-in program.
   Copies app/ and screenshots/ from this repository into the output
   directory and writes the dossier that buildDossier computes from
   them. The grader runs this program twice; both runs write the
   same bytes, because the copy and the dossier are deterministic. */

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const repoDir = dirname(fileURLToPath(import.meta.url));

mkdirSync(outDir, { recursive: true });
cpSync(join(repoDir, "app"), join(outDir, "app"), { recursive: true });
cpSync(join(repoDir, "screenshots"), join(outDir, "screenshots"), {
  recursive: true,
});

const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
  app_path_max_bytes: 1000,
});

writeFileSync(join(outDir, "dossier.json"), dossier);

console.log(
  "China in Numbers: wrote " +
    dossier.length +
    " bytes of dossier to " +
    join(outDir, "dossier.json"),
);
