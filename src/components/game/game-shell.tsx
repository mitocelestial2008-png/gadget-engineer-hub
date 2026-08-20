import { useEffect, useState } from "react";
import { GateProvider, useGate } from "@/components/game/gate";
import { HubCity } from "@/components/game/hub-city";
import { LoadingScreen } from "@/components/game/loading-screen";
import { type Screen } from "@/screens/menu";
import { ModesScreen } from "@/screens/modes";
import { RankedScreen } from "@/screens/ranked";
import { RosterScreen } from "@/screens/roster";
import { ShopScreen } from "@/screens/shop";
import { TournamentsScreen } from "@/screens/tournaments";

/** Casca do jogo: viewport mobile fixo + hub da cidade + modais de tela. */
export function GameShell() {
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // O save vive no localStorage: só montamos as telas depois da hidratação.
  useEffect(() => setReady(true), []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--mk-bg)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(100vw, 480px)",
          height: "100dvh",
          maxHeight: "100dvh",
          overflow: "hidden",
          background: "var(--mk-bg2)",
          boxShadow: "0 0 0 2px rgba(53,226,240,0.35)",
        }}
      >
        <GateProvider>
          {ready && loaded && <GameContent />}
          {ready && !loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
        </GateProvider>
      </div>
    </div>
  );
}

function GameContent() {
  const [screen, setScreen] = useState<Screen>("menu");
  const { transition } = useGate();
  const close = () => transition(() => setScreen("menu"));

  return (
    <>
      <HubCity onEnter={setScreen} />

      {screen !== "menu" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(2,6,12,0.72)",
            backdropFilter: "blur(2px)",
            zIndex: 20,
            display: "grid",
            placeItems: "center",
            padding: 8,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
              background: "var(--mk-bg2)",
              border: "2px solid rgba(53,226,240,0.55)",
              boxShadow: "0 0 24px rgba(53,226,240,0.25)",
            }}
          >
            {screen === "roster" && <RosterScreen onBack={close} />}
            {screen === "shop" && <ShopScreen onBack={close} />}
            {screen === "modes" && <ModesScreen onBack={close} />}
            {screen === "ranked" && <RankedScreen onBack={close} />}
            {screen === "tournaments" && <TournamentsScreen onBack={close} />}
          </div>
        </div>
      )}
    </>
  );
}
