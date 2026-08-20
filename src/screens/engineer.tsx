import { useState } from "react";
import { Frame, Panel, PixelButton } from "@/components/game/pixel";
import {
  GADGET_MAP,
  GADGET_MAX_LEVEL,
  GADGET_ROBOT_LEVEL,
  gadgetArt,
  gadgetDesc,
  KIND_LABEL,
  upgradeCost,
} from "@/game/gadgets";
import { buyGadget, upgradeGadget, useGame } from "@/game/save";
import { faceUrl, ROBOT_MAP } from "@/game/robots";
import { TopBar } from "@/screens/roster";

/** Oficina do Engenheiro: compra e evolucao dos gadgets exclusivos. */
export function EngineerScreen({ onBack }: { onBack: () => void }) {
  const g = useGame();
  const [msg, setMsg] = useState("");

  const eligible = g.robots
    .filter((r) => GADGET_MAP[r.id])
    .sort((a, b) => {
      const la = (g.gadgets[a.id] ?? 0) > 0 ? 0 : 1;
      const lb = (g.gadgets[b.id] ?? 0) > 0 ? 0 : 1;
      if (la !== lb) return la - lb;
      return b.level - a.level;
    });

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
      <TopBar title="OFICINA DO ENGENHEIRO" gold={g.gold} onBack={onBack} />
      <div
        className="mk-scroll"
        style={{
          flex: 1,
          padding: 8,
          backgroundImage:
            "linear-gradient(rgba(4,9,18,0.82), rgba(4,9,18,0.94)), url(/ui/bg_gadget_modal.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          imageRendering: "pixelated",
        }}
      >
        <div
          className="mk-title"
          style={{ fontSize: 7, color: "var(--mk-muted)", marginBottom: 6, lineHeight: 1.6 }}
        >
          GADGETS EXCLUSIVOS · DESBLOQUEIA NO NIVEL {GADGET_ROBOT_LEVEL} DO ROBO · MAX Lv
          {GADGET_MAX_LEVEL}
        </div>
        {msg && (
          <div
            className="mk-title"
            style={{ fontSize: 7, color: "var(--mk-accent)", marginBottom: 6 }}
          >
            {msg}
          </div>
        )}

        <div style={{ display: "grid", gap: 6 }}>
          {eligible.map((r) => {
            const def = GADGET_MAP[r.id];
            const robot = ROBOT_MAP[r.id];
            const level = g.gadgets[r.id] ?? 0;
            const owned = level > 0;
            const locked = r.level < GADGET_ROBOT_LEVEL;
            const maxed = level >= GADGET_MAX_LEVEL;
            const cost = owned ? upgradeCost(def, level) : def.price;

            return (
              <Panel key={r.id} style={{ padding: 6 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div style={{ position: "relative" }}>
                    <Frame rarity={def.rarity} size={46}>
                      <img
                        src={owned ? gadgetArt(r.id) : faceUrl(r.id)}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          imageRendering: "pixelated",
                          opacity: locked ? 0.4 : 1,
                        }}
                      />
                    </Frame>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="mk-title" style={{ fontSize: 7 }}>
                      {def.name}
                      {owned && (
                        <span style={{ color: "var(--mk-accent2)" }}> Lv{level}</span>
                      )}
                    </div>
                    <div style={{ fontSize: 10, color: "var(--mk-muted)" }}>
                      {robot.name} · Lv{r.level} · {KIND_LABEL[def.kind]} · {def.element}
                    </div>
                    <div style={{ fontSize: 10, color: "var(--mk-fg)" }}>
                      {gadgetDesc(def, Math.max(1, level))}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mk-btn mk-btn-sq"
                    disabled={locked || maxed || g.gold < cost}
                    onClick={() => {
                      const ok = owned ? upgradeGadget(r.id) : buyGadget(r.id);
                      setMsg(
                        ok
                          ? owned
                            ? `${def.name} MELHORADO!`
                            : `${def.name} INSTALADO!`
                          : "NAO FOI POSSIVEL",
                      );
                    }}
                    style={{ fontSize: 7, padding: 0, minWidth: 70 }}
                  >
                    {locked
                      ? `Lv${GADGET_ROBOT_LEVEL}`
                      : maxed
                        ? "MAX"
                        : `${owned ? "+1 " : ""}${cost}`}
                  </button>
                </div>
                {!owned && !locked && (
                  <div style={{ fontSize: 9, color: "var(--mk-muted)", marginTop: 4 }}>
                    {def.flavor}
                  </div>
                )}
              </Panel>
            );
          })}
        </div>

        <div style={{ height: 12 }} />
        <PixelButton onClick={onBack}>SAIR DA OFICINA</PixelButton>
        <div style={{ height: 16 }} />
      </div>
    </div>
  );
}
