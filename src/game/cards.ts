// Sistema de CARTAS DE SUPORTE.
// Cada carta tem uma arte animada em /public/cards/<id>.png
// (spritesheet 5 colunas x 2 linhas = 10 quadros de 384x384).
// O efeito dispara automaticamente a cada N rodadas durante a batalha.

export type CardRarity = "bronze" | "silver" | "gold";

export type CardEffectKind =
  | "heal" // cura % do HP maximo
  | "amp" // +% de forca por alguns turnos
  | "mp" // restaura % do MP maximo
  | "guard" // -% de dano recebido por alguns turnos
  | "burst" // dano direto = % do HP maximo do inimigo
  | "poison" // envenena o inimigo
  | "regen" // reparo continuo por alguns turnos
  | "purify" // limpa efeitos negativos e cura um pouco
  | "rush" // adrenalina forte e curta
  | "shield"; // blindagem longa

export interface SupportCard {
  id: string;
  name: string;
  persona: string;
  rarity: CardRarity;
  /** dispara a cada N rodadas */
  every: number;
  kind: CardEffectKind;
  /** intensidade do efeito (%) */
  power: number;
  /** duracao em turnos, quando aplicavel */
  turns: number;
  flavor: string;
}

/** Geometria dos spritesheets das cartas. */
export const CARD_SHEET = { cols: 5, rows: 2, frames: 10, frame: 384 };
/** Geometria do spritesheet da invocacao (gacha). */
export const GACHA_SHEET = { cols: 6, rows: 5, frames: 30, frame: 320 };

export const CARDS: SupportCard[] = [
  {
    id: "lumi",
    name: "LUMI",
    persona: "GAROTA ESTELAR",
    rarity: "gold",
    every: 3,
    kind: "heal",
    power: 20,
    turns: 0,
    flavor: "Uma garotinha de cabelos azuis que conserta robos com abracos.",
  },
  {
    id: "doktor",
    name: "DOKTOR VOLT",
    persona: "ENGENHEIRO MALUCO",
    rarity: "gold",
    every: 2,
    kind: "amp",
    power: 10,
    turns: 2,
    flavor: "Ri alto toda vez que uma engrenagem pega fogo.",
  },
  {
    id: "kuro",
    name: "KURO NEKO",
    persona: "NINJA GATA",
    rarity: "silver",
    every: 3,
    kind: "rush",
    power: 25,
    turns: 1,
    flavor: "Some na fumaca e reaparece no ombro do seu mecha.",
  },
  {
    id: "sargento",
    name: "SARGENTO FERRO",
    persona: "VETERANO DE GUERRA",
    rarity: "silver",
    every: 4,
    kind: "guard",
    power: 25,
    turns: 2,
    flavor: "Grita ordens tao alto que a blindagem obedece.",
  },
  {
    id: "medibot",
    name: "ENFERMEIRA MIKO",
    persona: "MEDICA ANDROIDE",
    rarity: "silver",
    every: 2,
    kind: "regen",
    power: 7,
    turns: 3,
    flavor: "Sempre com um kit de reparo e um sorriso calmo.",
  },
  {
    id: "hackergirl",
    name: "BYTE-CHAN",
    persona: "HACKER FOFA",
    rarity: "bronze",
    every: 3,
    kind: "mp",
    power: 25,
    turns: 0,
    flavor: "Invade o reator inimigo so pra pegar energia emprestada.",
  },
  {
    id: "barao",
    name: "BARAO BOOM",
    persona: "ARTILHEIRO EXPLOSIVO",
    rarity: "gold",
    every: 5,
    kind: "burst",
    power: 16,
    turns: 0,
    flavor: "Nunca conta quantas bombas leva no casaco.",
  },
  {
    id: "cristalina",
    name: "PRINCESA CRISTALINA",
    persona: "GUARDIA DE PRISMA",
    rarity: "gold",
    every: 4,
    kind: "shield",
    power: 32,
    turns: 3,
    flavor: "Sua coroa projeta paredes de cristal vivo.",
  },
  {
    id: "dragonmaster",
    name: "MESTRE RYU",
    persona: "DOMADOR DE DRAGOES",
    rarity: "silver",
    every: 3,
    kind: "poison",
    power: 12,
    turns: 3,
    flavor: "Seu dragaozinho cospe acido em quem encarar torto.",
  },
  {
    id: "chibighost",
    name: "POCHI FANTASMA",
    persona: "ESPIRITO TRAVESSO",
    rarity: "bronze",
    every: 4,
    kind: "purify",
    power: 10,
    turns: 0,
    flavor: "Come os virus do seu sistema achando que sao doces.",
  },
];

export const CARD_MAP: Record<string, SupportCard> = Object.fromEntries(
  CARDS.map((c) => [c.id, c]),
);

export function cardArt(id: string): string {
  return `/cards/${id}.png`;
}

export function cardEffectText(c: SupportCard): string {
  switch (c.kind) {
    case "heal":
      return `Cura ${c.power}% do HP maximo.`;
    case "amp":
      return `+${c.power}% de dano por ${c.turns} turnos.`;
    case "mp":
      return `Restaura ${c.power}% do MP maximo.`;
    case "guard":
      return `-${c.power}% de dano recebido por ${c.turns} turnos.`;
    case "burst":
      return `Causa dano igual a ${c.power}% do HP do inimigo.`;
    case "poison":
      return `Envenena o inimigo por ${c.turns} turnos.`;
    case "regen":
      return `Repara ${c.power}% do HP por turno (${c.turns} turnos).`;
    case "purify":
      return `Limpa efeitos negativos e cura ${c.power}%.`;
    case "rush":
      return `+${c.power}% de forca por ${c.turns} turno(s).`;
    case "shield":
      return `Blindagem de ${c.power}% por ${c.turns} turnos.`;
  }
}

export function cardDesc(c: SupportCard): string {
  return `A cada ${c.every} rodadas: ${cardEffectText(c)}`;
}

export const GACHA_PRICE = 1500;
/** ouro devolvido quando a carta sorteada ja e sua */
export const DUPLICATE_GOLD = 450;

const WEIGHT: Record<CardRarity, number> = { bronze: 50, silver: 30, gold: 14 };

/** Sorteia uma carta respeitando o peso de raridade. */
export function rollCard(): SupportCard {
  const total = CARDS.reduce((a, c) => a + WEIGHT[c.rarity], 0);
  let r = Math.random() * total;
  for (const c of CARDS) {
    r -= WEIGHT[c.rarity];
    if (r <= 0) return c;
  }
  return CARDS[CARDS.length - 1];
}
