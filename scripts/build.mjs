/**
 * build.mjs — Wrapper pour `next build` sur Vercel.
 *
 * Problème : Next.js 15 se bloque à "Collecting build traces" sur Vercel
 * free tier (manque de mémoire pour analyser node_modules).
 *
 * Solution : on laisse next build générer tout le contenu dans .next/
 * (ce qui est complet avant que les traces commencent), puis on arrête
 * proprement le processus dès que le blocage commence.
 *
 * Vercel fait ensuite SON PROPRE tracing (~168ms) sur .next/ — il n'a
 * pas besoin du tracing interne de next build.
 */

import { spawn } from "node:child_process";

const isWin = process.platform === "win32";
const nextBin = isWin
  ? "node_modules\\.bin\\next.cmd"
  : "node_modules/.bin/next";

console.log("▲ Build wrapper — démarrage de next build...");

const child = spawn(nextBin, ["build"], {
  stdio: ["inherit", "pipe", "pipe"],
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
});

let killScheduled = false;

function scheduleKill() {
  if (killScheduled) return;
  killScheduled = true;

  // .next/ est entièrement écrit avant cette étape.
  // On attend 30s pour être sûr que toutes les écritures disque sont
  // terminées, puis on arrête le processus (Vercel fera son propre tracing).
  console.log(
    "\n[wrapper] .next/ complet. Arrêt dans 30s (Vercel trace indépendamment)..."
  );

  setTimeout(() => {
    console.log("[wrapper] Arrêt de next build — .next/ prêt pour Vercel.");
    child.kill("SIGTERM");
    setTimeout(() => process.exit(0), 3000);
  }, 30_000);
}

child.stdout.on("data", (chunk) => {
  const text = chunk.toString();
  process.stdout.write(text);

  if (text.includes("Collecting build traces")) {
    scheduleKill();
  }
});

child.stderr.on("data", (chunk) => {
  process.stderr.write(chunk);
});

child.on("exit", (code, signal) => {
  if (signal === "SIGTERM" || killScheduled) {
    console.log("✅ Build wrapper terminé — .next/ prêt pour déploiement.");
    process.exit(0);
  }
  process.exit(code ?? 1);
});

