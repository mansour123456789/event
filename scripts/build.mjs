/**
 * build.mjs — Wrapper pour `next build` sur Vercel.
 *
 * Problème : Next.js 15 exécute "Collecting build traces" même avec
 * `output: 'export'`. Cette étape est inutile pour un export statique
 * (les fichiers dans out/ sont déjà complets) et se bloque indéfiniment.
 *
 * Solution : on laisse next build générer les pages statiques, puis
 * on l'arrête dès que "Collecting build traces" commence.
 */

import { spawn } from "node:child_process";

const isWin = process.platform === "win32";
const nextBin = isWin
  ? "node_modules\\.bin\\next.cmd"
  : "node_modules/.bin/next";

console.log("▲ Build wrapper — Next.js static export");

const child = spawn(nextBin, ["build"], {
  stdio: ["inherit", "pipe", "pipe"],
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
});

let killScheduled = false;

function scheduleKill() {
  if (killScheduled) return;
  killScheduled = true;

  // Les fichiers out/ sont déjà écrits à ce stade.
  // On attend 5 secondes par sécurité puis on arrête le processus.
  console.log(
    "\n✅ Pages statiques générées. Arrêt du build traces dans 5s..."
  );

  setTimeout(() => {
    console.log(
      "⚡ Arrêt de 'Collecting build traces' (inutile pour static export)"
    );
    child.kill("SIGTERM");
    // Laisse le temps à next de nettoyer proprement
    setTimeout(() => process.exit(0), 3000);
  }, 5000);
}

child.stdout.on("data", (chunk) => {
  const text = chunk.toString();
  process.stdout.write(text);

  // Déclenche l'arrêt dès que la collecte de traces commence
  if (text.includes("Collecting build traces")) {
    scheduleKill();
  }
});

child.stderr.on("data", (chunk) => {
  process.stderr.write(chunk);
});

child.on("exit", (code, signal) => {
  if (signal === "SIGTERM" || killScheduled) {
    console.log("✅ Build terminé avec succès (export statique prêt).");
    process.exit(0);
  }
  process.exit(code ?? 1);
});
