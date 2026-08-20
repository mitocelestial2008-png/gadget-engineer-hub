import { useCallback, useEffect, useRef, useState } from "react";
import type { Screen } from "@/screens/menu";
import { useGate } from "@/components/game/gate";

/* ---------------------------------------------------------------------------
 * Hub da cidade — plataforma 2D em canvas com física real.
 * Pulo com gravidade, pulo duplo, coyote time, jump buffer, corrida,
 * plataformas flutuantes (algumas móveis), núcleos de energia colecionáveis,
 * partículas, parallax em 3 camadas e câmera suave.
 * ------------------------------------------------------------------------- */

const WORLD_W = 2600;
const GROUND_Y = 620; // y do chão em coordenadas de mundo
const SKY_TOP = -260; // topo do mundo

const GRAVITY = 2600;
const JUMP_V = 860;
const JUMP_CUT = 0.42; // corte do pulo ao soltar o botão
const MAX_FALL = 1500;
const WALK = 165;
const RUN = 305;
const ACCEL = 2200;
const AIR_ACCEL = 1500;
const FRICTION = 2600;
const COYOTE = 0.11;
const BUFFER = 0.13;

const FRAMES = 20;
const FRAME = 64;
const SPR = 104; // tamanho desenhado do robô
const HALF_W = 22; // meia largura de colisão

type Clip = "idle" | "walk_side" | "run" | "jump" | "attack" | "interact";
const CLIP_SRC: Record<Clip, string> = {
  idle: "/hero/idle.png",
  walk_side: "/hero/walk_side.png",
  run: "/hero/run.png",
  jump: "/hero/jump.png",
  attack: "/hero/attack.png",
  interact: "/hero/interact.png",
};

type Building = {
  id: Exclude<Screen, "menu">;
  label: string;
  art: string;
  x: number;
  w: number;
  h: number;
};

const BUILDINGS: Building[] = [
  { id: "roster", label: "HANGAR", art: "/city/b_hangar.png", x: 300, w: 320, h: 381 },
  { id: "shop", label: "LOJA", art: "/city/b_shop.png", x: 780, w: 300, h: 357 },
  { id: "modes", label: "ARENA", art: "/city/b_arena.png", x: 1300, w: 340, h: 405 },
  { id: "ranked", label: "TORRE RANQUEADA", art: "/city/b_ranked.png", x: 1830, w: 260, h: 429 },
  { id: "tournaments", label: "COLISEU", art: "/city/b_tourney.png", x: 2320, w: 360, h: 360 },
];

type Platform = { x: number; y: number; w: number; range?: number; speed?: number };
const PLATFORMS: Platform[] = [
  { x: 520, y: 470, w: 150 },
  { x: 700, y: 350, w: 130 },
  { x: 950, y: 430, w: 160, range: 120, speed: 0.6 },
  { x: 1150, y: 300, w: 120 },
  { x: 1480, y: 460, w: 170 },
  { x: 1660, y: 340, w: 130, range: 90, speed: 0.85 },
  { x: 1980, y: 420, w: 150 },
  { x: 2150, y: 290, w: 140 },
  { x: 2380, y: 440, w: 160 },
  { x: 380, y: 330, w: 120, range: 140, speed: 0.5 },
];

type Core = { x: number; y: number; taken: number };
const CORES: Core[] = PLATFORMS.map((p) => ({ x: p.x + p.w / 2, y: p.y - 34, taken: 0 })).concat([
  { x: 640, y: GROUND_Y - 40, taken: 0 },
  { x: 1420, y: GROUND_Y - 40, taken: 0 },
  { x: 2050, y: GROUND_Y - 40, taken: 0 },
]);

type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; c: string };

export function HubCity({ onEnter }: { onEnter: (s: Exclude<Screen, "menu">) => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const { transition, busy } = useGate();

  const [near, setNear] = useState<Building | null>(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);

  // entradas
  const input = useRef({ left: false, right: false, run: false, jumpHeld: false });
  const jumpBuf = useRef(0);
  const actRef = useRef<{ clip: Clip; until: number } | null>(null);
  const onEnterRef = useRef(onEnter);
  onEnterRef.current = onEnter;
  const nearRef = useRef<Building | null>(null);
  const busyRef = useRef(busy);
  busyRef.current = busy;
  const transitionRef = useRef(transition);
  transitionRef.current = transition;

  const player = useRef({
    x: 160,
    y: GROUND_Y,
    vx: 0,
    vy: 0,
    face: 1 as 1 | -1,
    onGround: true,
    coyote: 0,
    jumps: 0,
    squash: 0,
    frame: 0,
    clip: "idle" as Clip,
    fAcc: 0,
  });
  const cam = useRef({ x: 0, y: 0 });
  const parts = useRef<Particle[]>([]);
  const cores = useRef<Core[]>(CORES.map((c) => ({ ...c })));
  const comboT = useRef(0);

  const spawn = (x: number, y: number, n: number, c: string, up = false) => {
    for (let i = 0; i < n; i++) {
      parts.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 200,
        vy: up ? -Math.random() * 260 : -Math.random() * 120,
        life: 0,
        max: 0.35 + Math.random() * 0.4,
        c,
      });
    }
  };

  const doJump = useCallback(() => {
    jumpBuf.current = BUFFER;
    input.current.jumpHeld = true;
  }, []);

  const enter = useCallback(() => {
    const b = nearRef.current;
    if (!b || busyRef.current) return;
    actRef.current = { clip: "interact", until: performance.now() + 420 };
    transitionRef.current(() => onEnterRef.current(b.id));
  }, []);

  /* --------------------------- teclado --------------------------- */
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "arrowleft" || k === "a") input.current.left = true;
      else if (k === "arrowright" || k === "d") input.current.right = true;
      else if (k === "shift") input.current.run = true;
      else if (k === " " || k === "arrowup" || k === "w" || k === "z") {
        e.preventDefault();
        doJump();
      } else if (k === "f") actRef.current = { clip: "attack", until: performance.now() + 420 };
      else if (k === "enter" || k === "e") enter();
    };
    const up = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "arrowleft" || k === "a") input.current.left = false;
      if (k === "arrowright" || k === "d") input.current.right = false;
      if (k === "shift") input.current.run = false;
      if (k === " " || k === "arrowup" || k === "w" || k === "z") input.current.jumpHeld = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [doJump, enter]);

  /* --------------------------- loop --------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgs: Record<string, HTMLImageElement> = {};
    const get = (src: string) => {
      let im = imgs[src];
      if (!im) {
        im = new Image();
        im.src = src;
        imgs[src] = im;
      }
      return im;
    };
    [...Object.values(CLIP_SRC), "/city/bg.png", "/loading/city_f4.png", ...BUILDINGS.map((b) => b.art)].forEach(get);

    let w = 480;
    let h = 800;
    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width;
      h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let raf = 0;
    let last = performance.now();
    let t = 0;
    let lastNearId: string | null = null;

    const platY = (p: Platform, time: number) =>
      p.range && p.speed ? p.y + Math.sin(time * p.speed) * 0 : p.y;
    const platX = (p: Platform, time: number) =>
      p.range && p.speed ? p.x + Math.sin(time * p.speed) * p.range : p.x;

    const tick = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      t += dt;
      const P = player.current;
      const acting = actRef.current && actRef.current.until > now ? actRef.current.clip : null;
      if (actRef.current && actRef.current.until <= now) actRef.current = null;

      /* ---------------- física ---------------- */
      const dir = (input.current.right ? 1 : 0) - (input.current.left ? 1 : 0);
      const maxSp = input.current.run ? RUN : WALK;
      const accel = P.onGround ? ACCEL : AIR_ACCEL;
      if (dir !== 0 && !(acting === "interact")) {
        P.vx += dir * accel * dt;
        P.vx = Math.max(-maxSp, Math.min(maxSp, P.vx));
        P.face = dir as 1 | -1;
      } else {
        const f = FRICTION * dt * (P.onGround ? 1 : 0.35);
        P.vx = Math.abs(P.vx) <= f ? 0 : P.vx - Math.sign(P.vx) * f;
      }

      jumpBuf.current = Math.max(0, jumpBuf.current - dt);
      P.coyote = P.onGround ? COYOTE : Math.max(0, P.coyote - dt);

      if (jumpBuf.current > 0 && (P.coyote > 0 || P.jumps < 2)) {
        const dbl = P.coyote <= 0;
        P.vy = -JUMP_V * (dbl ? 0.86 : 1);
        P.jumps = dbl ? 2 : 1;
        P.coyote = 0;
        P.onGround = false;
        jumpBuf.current = 0;
        P.squash = -0.28;
        spawn(P.x, P.y, dbl ? 10 : 6, dbl ? "#ff5fd0" : "#8fe9ff", dbl);
      }

      if (!input.current.jumpHeld && P.vy < 0) P.vy += JUMP_V * JUMP_CUT * dt * 6;
      P.vy = Math.min(MAX_FALL, P.vy + GRAVITY * dt);

      const prevY = P.y;
      P.x = Math.max(60, Math.min(WORLD_W - 60, P.x + P.vx * dt));
      P.y += P.vy * dt;

      // colisões: plataformas (só de cima) e chão
      let grounded = false;
      if (P.vy >= 0) {
        for (const p of PLATFORMS) {
          const px = platX(p, t);
          const py = platY(p, t);
          if (P.x > px - 8 && P.x < px + p.w + 8 && prevY <= py + 4 && P.y >= py) {
            P.y = py;
            P.vy = 0;
            grounded = true;
            break;
          }
        }
      }
      if (P.y >= GROUND_Y) {
        P.y = GROUND_Y;
        P.vy = 0;
        grounded = true;
      }
      if (grounded && !P.onGround) {
        P.squash = 0.3;
        spawn(P.x, P.y, 8, "#cfe9ff");
        P.jumps = 0;
      }
      P.onGround = grounded;
      P.squash += (0 - P.squash) * Math.min(1, dt * 12);

      /* ---------------- núcleos ---------------- */
      comboT.current = Math.max(0, comboT.current - dt);
      if (comboT.current === 0 && combo > 0) setCombo(0);
      for (const c of cores.current) {
        if (c.taken > 0) {
          c.taken -= dt;
          continue;
        }
        if (Math.abs(c.x - P.x) < 30 && Math.abs(c.y - (P.y - 40)) < 44) {
          c.taken = 14;
          spawn(c.x, c.y, 14, "#ffe36a", true);
          setScore((s) => s + 10);
          comboT.current = 2.5;
          setCombo((k) => k + 1);
        }
      }

      /* ---------------- prédio próximo ---------------- */
      const b = BUILDINGS.find((bb) => Math.abs(bb.x - P.x) < bb.w * 0.45 && P.y >= GROUND_Y - 4) ?? null;
      if ((b?.id ?? null) !== lastNearId) {
        lastNearId = b?.id ?? null;
        nearRef.current = b;
        setNear(b);
      }

      /* ---------------- câmera ---------------- */
      const targetX = Math.max(0, Math.min(WORLD_W - w, P.x - w / 2 + P.face * 40));
      const targetY = Math.max(SKY_TOP, Math.min(GROUND_Y + 120 - h, P.y - h * 0.68));
      cam.current.x += (targetX - cam.current.x) * Math.min(1, dt * 7);
      cam.current.y += (targetY - cam.current.y) * Math.min(1, dt * 5);

      /* ---------------- partículas ---------------- */
      parts.current = parts.current.filter((p) => {
        p.life += dt;
        p.vy += 900 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        return p.life < p.max;
      });

      /* ---------------- animação ---------------- */
      const clip: Clip = acting
        ? acting
        : !P.onGround
          ? "jump"
          : Math.abs(P.vx) > WALK + 12
            ? "run"
            : Math.abs(P.vx) > 8
              ? "walk_side"
              : "idle";
      if (clip !== P.clip) {
        P.clip = clip;
        P.frame = 0;
        P.fAcc = 0;
      }
      const fps = clip === "run" ? 20 : clip === "idle" ? 9 : 15;
      P.fAcc += dt;
      while (P.fAcc >= 1 / fps) {
        P.fAcc -= 1 / fps;
        P.frame = (P.frame + 1) % FRAMES;
      }

      /* ---------------- render ---------------- */
      const cx = cam.current.x;
      const cy = cam.current.y;
      ctx.clearRect(0, 0, w, h);

      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#0a1030");
      sky.addColorStop(0.55, "#13214d");
      sky.addColorStop(1, "#2a1140");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      // parallax distante
      const far = imgs["/loading/city_f4.png"];
      if (far?.complete && far.naturalWidth) {
        const fh = h * 0.62;
        const fw = fh * (far.naturalWidth / far.naturalHeight);
        const off = -((cx * 0.15) % fw);
        for (let i = -1; i < Math.ceil(w / fw) + 1; i++) {
          ctx.globalAlpha = 0.55;
          ctx.drawImage(far, off + i * fw, GROUND_Y - cy - fh + 90, fw, fh);
        }
        ctx.globalAlpha = 1;
      }

      // cidade média
      const bg = imgs["/city/bg.png"];
      if (bg?.complete && bg.naturalWidth) {
        const bh = h * 0.95;
        const bw = bh * (bg.naturalWidth / bg.naturalHeight);
        const off = -((cx * 0.45) % bw);
        for (let i = -1; i < Math.ceil(w / bw) + 1; i++) {
          ctx.globalAlpha = 0.85;
          ctx.drawImage(bg, off + i * bw, GROUND_Y - cy - bh + 120, bw, bh);
        }
        ctx.globalAlpha = 1;
      }

      // prédios
      for (const bd of BUILDINGS) {
        const im = imgs[bd.art];
        const dx = bd.x - bd.w / 2 - cx;
        const dy = GROUND_Y + 14 - bd.h - cy;
        if (dx > w || dx + bd.w < 0) continue;
        const active = nearRef.current?.id === bd.id;
        if (im?.complete && im.naturalWidth) {
          ctx.save();
          ctx.filter = active ? "brightness(1.15)" : "brightness(0.85)";
          ctx.drawImage(im, dx, dy, bd.w, bd.h);
          ctx.restore();
        }
        // porta
        ctx.fillStyle = active ? "rgba(53,226,240,0.35)" : "rgba(53,226,240,0.12)";
        ctx.fillRect(bd.x - 26 - cx, GROUND_Y - 58 - cy, 52, 58);
        ctx.strokeStyle = active ? "#35e2f0" : "rgba(53,226,240,0.4)";
        ctx.lineWidth = 2;
        ctx.strokeRect(bd.x - 26 - cx, GROUND_Y - 58 - cy, 52, 58);
        // placa
        ctx.font = "8px 'Press Start 2P', monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = active ? "#35e2f0" : "#8fa8bd";
        ctx.fillText(bd.label, bd.x - cx, dy - 8);
      }

      // chão
      const gy = GROUND_Y - cy;
      const grd = ctx.createLinearGradient(0, gy, 0, gy + 200);
      grd.addColorStop(0, "#16233f");
      grd.addColorStop(1, "#070c18");
      ctx.fillStyle = grd;
      ctx.fillRect(0, gy, w, h - gy + 200);
      ctx.fillStyle = "rgba(53,226,240,0.55)";
      ctx.fillRect(0, gy, w, 3);
      ctx.fillStyle = "rgba(53,226,240,0.12)";
      for (let i = 0; i < WORLD_W; i += 64) {
        const px = i - cx;
        if (px < -8 || px > w) continue;
        ctx.fillRect(px, gy + 12, 30, 3);
      }

      // plataformas
      for (const p of PLATFORMS) {
        const px = platX(p, t) - cx;
        const py = platY(p, t) - cy;
        if (px > w || px + p.w < 0) continue;
        ctx.fillStyle = "#101c33";
        ctx.fillRect(px, py, p.w, 16);
        ctx.fillStyle = "#35e2f0";
        ctx.fillRect(px, py, p.w, 3);
        ctx.fillStyle = "rgba(53,226,240,0.18)";
        ctx.fillRect(px + 4, py + 16, p.w - 8, 4);
      }

      // núcleos
      for (const c of cores.current) {
        if (c.taken > 0) continue;
        const px = c.x - cx;
        const py = c.y - cy + Math.sin(t * 3 + c.x) * 5;
        if (px < -20 || px > w + 20) continue;
        ctx.fillStyle = "rgba(255,227,106,0.22)";
        ctx.fillRect(px - 12, py - 12, 24, 24);
        ctx.fillStyle = "#ffe36a";
        ctx.fillRect(px - 6, py - 6, 12, 12);
        ctx.fillStyle = "#fff8d0";
        ctx.fillRect(px - 2, py - 6, 4, 12);
      }

      // partículas
      for (const p of parts.current) {
        const a = 1 - p.life / p.max;
        ctx.globalAlpha = a;
        ctx.fillStyle = p.c;
        ctx.fillRect(p.x - cx - 2, p.y - cy - 2, 4, 4);
      }
      ctx.globalAlpha = 1;

      // robô
      const sheet = imgs[CLIP_SRC[P.clip]];
      if (sheet?.complete && sheet.naturalWidth) {
        const sx = P.frame * FRAME;
        const sq = 1 + P.squash;
        const dw = SPR / sq;
        const dh = SPR * sq;
        // sombra
        ctx.fillStyle = "rgba(0,0,0,0.35)";
        ctx.fillRect(P.x - cx - 22, GROUND_Y - cy - 4, 44, 6);
        ctx.save();
        ctx.translate(P.x - cx, P.y - cy);
        ctx.scale(P.face, 1);
        ctx.drawImage(sheet, sx, 0, FRAME, FRAME, -dw / 2, -dh, dw, dh);
        ctx.restore();
      }

      // névoa em primeiro plano
      const fog = ctx.createLinearGradient(0, h - 90, 0, h);
      fog.addColorStop(0, "rgba(10,20,40,0)");
      fog.addColorStop(1, "rgba(10,20,40,0.55)");
      ctx.fillStyle = fog;
      ctx.fillRect(0, h - 90, w, 90);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapRef} style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#050a16" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, imageRendering: "pixelated" }} />

      {/* HUD */}
      <div
        className="mk-title"
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          fontSize: 8,
          color: "#ffe36a",
          background: "rgba(3,8,16,0.7)",
          border: "2px solid rgba(255,227,106,0.4)",
          padding: "6px 8px",
          zIndex: 6,
        }}
      >
        ⬢ {score}
        {combo > 1 && <span style={{ color: "#ff5fd0" }}> x{combo}</span>}
      </div>

      {/* Atalhos rápidos */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          zIndex: 6,
        }}
      >
        {BUILDINGS.map((b) => (
          <button
            key={b.id}
            className="mk-title"
            onClick={() => !busy && transition(() => onEnter(b.id))}
            style={{
              fontSize: 6,
              padding: "5px 6px",
              textAlign: "left",
              color: "#dff6ff",
              background: "rgba(6,14,26,0.75)",
              border: "2px solid rgba(53,226,240,0.25)",
              cursor: "pointer",
            }}
          >
            {b.label}
          </button>
        ))}
      </div>

      {near && (
        <button
          className="mk-title"
          onClick={enter}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: 126,
            fontSize: 9,
            padding: "10px 14px",
            color: "#03121a",
            background: "var(--mk-accent)",
            border: "2px solid #03121a",
            boxShadow: "0 0 18px rgba(53,226,240,0.5)",
            cursor: "pointer",
            zIndex: 6,
          }}
        >
          ENTRAR • {near.label}
        </button>
      )}

      {/* Controles touch */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "10px 12px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          zIndex: 5,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <PadBtn label="◀" onDown={() => (input.current.left = true)} onUp={() => (input.current.left = false)} />
          <PadBtn label="▶" onDown={() => (input.current.right = true)} onUp={() => (input.current.right = false)} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <PadBtn label="CORRER" onDown={() => (input.current.run = true)} onUp={() => (input.current.run = false)} />
          <PadBtn
            label="PULO"
            big
            onDown={doJump}
            onUp={() => (input.current.jumpHeld = false)}
          />
        </div>
      </div>
    </div>
  );
}

function PadBtn({
  label,
  onDown,
  onUp,
  big,
}: {
  label: string;
  onDown: () => void;
  onUp: () => void;
  big?: boolean;
}) {
  return (
    <button
      className="mk-title"
      onPointerDown={(e) => {
        e.preventDefault();
        onDown();
      }}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      onPointerCancel={onUp}
      style={{
        fontSize: 8,
        minWidth: big ? 74 : 48,
        padding: big ? "18px 8px" : "14px 8px",
        color: big ? "#03121a" : "var(--mk-accent)",
        background: big ? "rgba(53,226,240,0.9)" : "rgba(4,12,22,0.85)",
        border: "2px solid rgba(53,226,240,0.6)",
        touchAction: "none",
        userSelect: "none",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}
