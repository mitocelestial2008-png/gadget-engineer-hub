import { useState } from "react";
import { PixelButton, SheetSprite } from "@/components/game/pixel";
import {
  CARDS,
  CARD_MAP,
  CARD_SHEET,
  GACHA_PRICE,
  GACHA_SHEET,
  cardArt,
  cardEffectText,
  type SupportCard,
} from "@/game/cards";
import { equipCard, pullCard, useGame, type GachaResult } from "@/game/save";
import { TopBar } from "@/screens/roster";

const RARITY_COLOR: Record<string, string> = {
  bronze: "#c8834a",
  silver: "#cfd8e6",
  gold: "#ffce4d",
};

/** Sala de Suporte: colecao de cartas animadas + invocacao gacha. */
export function CardsScreen({ onBack }: { onBack: () => void }) {
  const g = useGame();
  const [pull, setPull] = useState<GachaResult | null>(null);
  const [phase, setPhase] = useState<"idle" | "summon" | "reveal">("idle");
  const [msg, setMsg] = useState("");

  const owned = CARDS.filter((c) => (g.cards[c.id] ?? 0) > 0).length;

  const doPull = () => {
    if (phase !== "idle") return;
    const res = pullCard();
    if (!res) {
      setMsg("OURO INSUFICIENTE");
      return;
    }
    setMsg("");
    setPull(res);
    setPhase("summon");
  };

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
      <TopBar title="SALA DE SUPORTE" gold={g.gold} onBack={onBack} />

      <div
        className="mk-scroll"
        style={{
          flex: 1,
          padding: 8,
          background:
            "linear-gradient(rgba(4,9,18,0.92), rgba(8,4,22,0.96)), radial-gradient(circle at 50% 0%, rgba(53,226,240,0.25), transparent 60%)",
        }}
      >
        {/* painel do gacha */}
        <div
          style={{
            border: "2px solid rgba(255,206,77,0.6)",
            background: "rgba(10,8,20,0.9)",
            padding: 8,
            display: "grid",
            gap: 6,
            justifyItems: "center",
            boxShadow: "0 0 20px rgba(255,206,77,0.2) inset",
          }}
        >
          <div className="mk-title" style={{ fontSize: 8, color: "#ffce4d" }}>
            CAPSULA DE INVOCACAO
          </div>
          <div style={{ fontSize: 10, color: "var(--mk-muted)", textAlign: "center" }}>
            Lava fundida derrama na capsula e revela uma carta de suporte.
          </div>
          <PixelButton onClick={doPull} disabled={phase !== "idle" || g.gold < GACHA_PRICE}>
            INVOCAR · {GACHA_PRICE} OURO
          </PixelButton>
          {msg && (
            <div className="mk-title" style={{ fontSize: 7, color: "#ff5b4d" }}>
              {msg}
            </div>
          )}
        </div>

        <div
          className="mk-title"
          style={{ fontSize: 7, color: "var(--mk-muted)", margin: "10px 0 6px" }}
        >
          COLECAO {owned}/{CARDS.length} · TOQUE PARA EQUIPAR
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {CARDS.map((c) => (
            <CardTile
              key={c.id}
              card={c}
              owned={(g.cards[c.id] ?? 0) > 0}
              copies={g.cards[c.id] ?? 0}
              equipped={g.activeCard === c.id}
              onClick={() => equipCard(c.id)}
            />
          ))}
        </div>

        <div style={{ height: 10 }} />
        <PixelButton onClick={onBack}>SAIR DA SALA</PixelButton>
        <div style={{ height: 16 }} />
      </div>

      {phase !== "idle" && pull && (
        <GachaOverlay
          result={pull}
          phase={phase}
          onSummonDone={() => setPhase("reveal")}
          onClose={() => {
            setPhase("idle");
            setPull(null);
          }}
        />
      )}
    </div>
  );
}

function CardTile({
  card,
  owned,
  copies,
  equipped,
  onClick,
}: {
  card: SupportCard;
  owned: boolean;
  copies: number;
  equipped: boolean;
  onClick: () => void;
}) {
  const color = RARITY_COLOR[card.rarity];
  return (
    <button
      type="button"
      onClick={owned ? onClick : undefined}
      style={{
        all: "unset",
        cursor: owned ? "pointer" : "default",
        display: "grid",
        gap: 4,
        padding: 5,
        background: equipped ? "rgba(53,226,240,0.14)" : "rgba(6,12,22,0.9)",
        border: `2px solid ${equipped ? "var(--mk-accent)" : "rgba(255,255,255,0.14)"}`,
        boxShadow: equipped ? "0 0 14px rgba(53,226,240,0.35)" : undefined,
      }}
    >
      <div
        style={{
          position: "relative",
          justifySelf: "center",
          border: `2px solid ${color}`,
          background: "rgba(10,16,30,0.9)",
          filter: owned ? undefined : "grayscale(1) brightness(0.45)",
        }}
      >
        <SheetSprite
          url={cardArt(card.id)}
          cols={CARD_SHEET.cols}
          rows={CARD_SHEET.rows}
          frames={CARD_SHEET.frames}
          size={92}
          fps={10}
        />
        {copies > 1 && (
          <span
            className="mk-title"
            style={{
              position: "absolute",
              right: 2,
              bottom: 2,
              fontSize: 6,
              background: "rgba(0,0,0,0.75)",
              padding: "1px 3px",
              color: "#fff",
            }}
          >
            x{copies}
          </span>
        )}
      </div>
      <div className="mk-title" style={{ fontSize: 6, color, textAlign: "center" }}>
        {owned ? card.name : "???"}
      </div>
      <div style={{ fontSize: 8, color: "var(--mk-muted)", textAlign: "center" }}>
        {card.persona}
      </div>
      <div
        style={{
          fontSize: 9,
          color: owned ? "var(--mk-fg)" : "var(--mk-muted)",
          textAlign: "center",
          lineHeight: 1.25,
          minHeight: 34,
        }}
      >
        A cada {card.every} rodadas: {cardEffectText(card)}
      </div>
      <div
        className="mk-title"
        style={{
          fontSize: 6,
          textAlign: "center",
          color: equipped ? "var(--mk-accent)" : "var(--mk-muted)",
        }}
      >
        {owned ? (equipped ? "EQUIPADA" : "EQUIPAR") : "BLOQUEADA"}
      </div>
    </button>
  );
}

function GachaOverlay({
  result,
  phase,
  onSummonDone,
  onClose,
}: {
  result: GachaResult;
  phase: "summon" | "reveal";
  onSummonDone: () => void;
  onClose: () => void;
}) {
  const card = CARD_MAP[result.card.id];
  const color = RARITY_COLOR[card.rarity];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 60,
        display: "grid",
        placeItems: "center",
        background: "radial-gradient(circle, rgba(30,8,0,0.92), rgba(2,4,10,0.97))",
      }}
    >
      {phase === "summon" ? (
        <SheetSprite
          url="/cards/gacha.png"
          cols={GACHA_SHEET.cols}
          rows={GACHA_SHEET.rows}
          frames={GACHA_SHEET.frames}
          size={240}
          fps={15}
          loop={false}
          onDone={onSummonDone}
        />
      ) : (
        <div className="animate-scale-in" style={{ display: "grid", gap: 8, justifyItems: "center" }}>
          <div
            style={{
              border: `3px solid ${color}`,
              boxShadow: `0 0 30px ${color}`,
              background: "rgba(8,14,26,0.95)",
              padding: 4,
            }}
          >
            <SheetSprite
              url={cardArt(card.id)}
              cols={CARD_SHEET.cols}
              rows={CARD_SHEET.rows}
              frames={CARD_SHEET.frames}
              size={190}
              fps={10}
            />
          </div>
          <div className="mk-title" style={{ fontSize: 10, color }}>
            {card.name}
          </div>
          <div style={{ fontSize: 10, color: "var(--mk-muted)" }}>{card.persona}</div>
          <div
            style={{
              fontSize: 10,
              color: "var(--mk-fg)",
              maxWidth: 260,
              textAlign: "center",
              lineHeight: 1.35,
            }}
          >
            A cada {card.every} rodadas: {cardEffectText(card)}
          </div>
          {result.duplicate && (
            <div className="mk-title" style={{ fontSize: 7, color: "#ffce4d" }}>
              REPETIDA · +{result.gold} OURO
            </div>
          )}
          <PixelButton onClick={onClose}>CONTINUAR</PixelButton>
        </div>
      )}
    </div>
  );
}
