// GERADO: um gadget unico por robo (120 no total).
// Cada gadget tem arte propria em /public/gadgets/<robotId>.png e sobe ate o nivel 10.

export type GadgetKind =
  | "power"
  | "guard"
  | "speed"
  | "vitality"
  | "reactor"
  | "leech"
  | "thorns"
  | "regen"
  | "crit"
  | "phase"
  | "amp"
  | "aegis";

export interface GadgetDef {
  robotId: string;
  name: string;
  kind: GadgetKind;
  element: string;
  rarity: "bronze" | "silver" | "gold";
  /** valor do efeito no nivel 1 */
  base: number;
  /** incremento por nivel */
  step: number;
  /** preco de compra */
  price: number;
  desc: string;
  flavor: string;
}

export const GADGET_MAX_LEVEL = 10;
/** nivel minimo do robo para destravar o gadget */
export const GADGET_ROBOT_LEVEL = 10;

export const GADGETS: GadgetDef[] = [
  { robotId: "aurorion", name: "PUNHO SOLAR", kind: "power", element: "LUZ", rarity: "gold", base: 10.2, step: 2.6, price: 18000, desc: "+10.2% de FORCA em combate.", flavor: "Modulo solar forjado sob medida para AURORION." },
  { robotId: "ferrovax", name: "PLACA FERREO", kind: "guard", element: "FERRO", rarity: "bronze", base: 8, step: 2, price: 8000, desc: "+8% de DEFESA em combate.", flavor: "Modulo ferreo forjado sob medida para FERROVAX." },
  { robotId: "cryolance", name: "PROPULSOR GLACIAL", kind: "speed", element: "GELO", rarity: "silver", base: 9, step: 2.2, price: 12000, desc: "+9% de AGILIDADE em combate.", flavor: "Modulo glacial forjado sob medida para CRYOLANCE." },
  { robotId: "voltronin", name: "CORACAO VOLTAICO", kind: "vitality", element: "TROVAO", rarity: "silver", base: 11.2, step: 2.8, price: 12000, desc: "+11.2% de HP maximo.", flavor: "Modulo voltaico forjado sob medida para VOLT RONIN." },
  { robotId: "pyrokaiser", name: "CELULA IGNEO", kind: "reactor", element: "FOGO", rarity: "gold", base: 15.4, step: 3.8, price: 18000, desc: "+15.4% de MP maximo.", flavor: "Modulo igneo forjado sob medida para PYROKAISER." },
  { robotId: "terrabyte", name: "GARRA TELURICO", kind: "leech", element: "TERRA", rarity: "bronze", base: 8, step: 1.5, price: 8000, desc: "Recupera 8% do dano causado como HP.", flavor: "Modulo telurico forjado sob medida para TERRABYTE." },
  { robotId: "zephyrblade", name: "ESPINHO EOLICO", kind: "thorns", element: "VENTO", rarity: "silver", base: 11.2, step: 2.2, price: 12000, desc: "Reflete 11.2% do dano recebido.", flavor: "Modulo eolico forjado sob medida para ZEPHYRBLADE." },
  { robotId: "nullshade", name: "COLMEIA NULO", kind: "regen", element: "VAZIO", rarity: "gold", base: 5.1, step: 1, price: 18000, desc: "Repara 5.1% do HP maximo por turno.", flavor: "Modulo nulo forjado sob medida para NULLSHADE." },
  { robotId: "acidra", name: "VISOR CORROSIVO", kind: "crit", element: "ACIDO", rarity: "bronze", base: 5, step: 1, price: 8000, desc: "+5% de chance de golpe critico.", flavor: "Modulo corrosivo forjado sob medida para ACIDRA." },
  { robotId: "gravitus", name: "MANTO GRAVITICO", kind: "phase", element: "GRAVIDADE", rarity: "silver", base: 4.5, step: 0.9, price: 12000, desc: "+4.5% de chance de esquiva.", flavor: "Modulo gravitico forjado sob medida para GRAVITUS." },
  { robotId: "chronowake", name: "RESSOADOR CRONICO", kind: "amp", element: "TEMPO", rarity: "gold", base: 9, step: 2.3, price: 18000, desc: "+9% de dano nas habilidades.", flavor: "Modulo cronico forjado sob medida para CHRONOWAKE." },
  { robotId: "bioreaper", name: "BARREIRA ORGANICO", kind: "aegis", element: "BIO", rarity: "silver", base: 6.7, step: 1.3, price: 12000, desc: "-6.7% de dano recebido.", flavor: "Modulo organico forjado sob medida para BIOREAPER." },
  { robotId: "stormfang", name: "PUNHO CICLONICO", kind: "power", element: "TEMPESTADE", rarity: "silver", base: 9, step: 2.2, price: 12000, desc: "+9% de FORCA em combate.", flavor: "Modulo ciclonico forjado sob medida para STORMFANG." },
  { robotId: "quartzine", name: "PLACA PRISMATICO", kind: "guard", element: "CRISTAL", rarity: "bronze", base: 8, step: 2, price: 8000, desc: "+8% de DEFESA em combate.", flavor: "Modulo prismatico forjado sob medida para QUARTZINE." },
  { robotId: "hydroknight", name: "PROPULSOR AQUATICO", kind: "speed", element: "AGUA", rarity: "silver", base: 9, step: 2.2, price: 12000, desc: "+9% de AGILIDADE em combate.", flavor: "Modulo aquatico forjado sob medida para HYDROKNIGHT." },
  { robotId: "emberfox", name: "CORACAO INCANDESCENTE", kind: "vitality", element: "BRASA", rarity: "gold", base: 12.8, step: 3.2, price: 18000, desc: "+12.8% de HP maximo.", flavor: "Modulo incandescente forjado sob medida para EMBERFOX." },
  { robotId: "ironmonk", name: "CELULA JADEITA", kind: "reactor", element: "JADE", rarity: "bronze", base: 12, step: 3, price: 8000, desc: "+12% de MP maximo.", flavor: "Modulo jadeita forjado sob medida para IRONMONK." },
  { robotId: "nebulon", name: "GARRA COSMICO", kind: "leech", element: "COSMICO", rarity: "gold", base: 10.2, step: 1.9, price: 18000, desc: "Recupera 10.2% do dano causado como HP.", flavor: "Modulo cosmico forjado sob medida para NEBULON." },
  { robotId: "titanox", name: "ESPINHO TITANICO", kind: "thorns", element: "TITA", rarity: "silver", base: 11.2, step: 2.2, price: 12000, desc: "Reflete 11.2% do dano recebido.", flavor: "Modulo titanico forjado sob medida para TITANOX." },
  { robotId: "magnavore", name: "COLMEIA MAGNETICO", kind: "regen", element: "MAGNETISMO", rarity: "gold", base: 5.1, step: 1, price: 18000, desc: "Repara 5.1% do HP maximo por turno.", flavor: "Modulo magnetico forjado sob medida para MAGNAVORE." },
  { robotId: "solarixprime", name: "VISOR HELIACO", kind: "crit", element: "SOL", rarity: "gold", base: 6.4, step: 1.3, price: 18000, desc: "+6.4% de chance de golpe critico.", flavor: "Modulo heliaco forjado sob medida para SOLARIX PRIME." },
  { robotId: "lunargeist", name: "MANTO LUNAR", kind: "phase", element: "LUA", rarity: "silver", base: 4.5, step: 0.9, price: 12000, desc: "+4.5% de chance de esquiva.", flavor: "Modulo lunar forjado sob medida para LUNAR GEIST." },
  { robotId: "dunecrawler", name: "RESSOADOR ARENOSO", kind: "amp", element: "AREIA", rarity: "bronze", base: 7, step: 1.8, price: 8000, desc: "+7% de dano nas habilidades.", flavor: "Modulo arenoso forjado sob medida para DUNE CRAWLER." },
  { robotId: "junglemaw", name: "BARREIRA SILVESTRE", kind: "aegis", element: "SELVA", rarity: "silver", base: 6.7, step: 1.3, price: 12000, desc: "-6.7% de dano recebido.", flavor: "Modulo silvestre forjado sob medida para JUNGLE MAW." },
  { robotId: "abyssalord", name: "PUNHO ABISSAL", kind: "power", element: "ABISSO", rarity: "gold", base: 10.2, step: 2.6, price: 18000, desc: "+10.2% de FORCA em combate.", flavor: "Modulo abissal forjado sob medida para ABYSSA LORD." },
  { robotId: "toxinvore", name: "PLACA TOXICO", kind: "guard", element: "TOXINA", rarity: "bronze", base: 8, step: 2, price: 8000, desc: "+8% de DEFESA em combate.", flavor: "Modulo toxico forjado sob medida para TOXINVORE." },
  { robotId: "ruinwarden", name: "PROPULSOR RUINOSO", kind: "speed", element: "RUINA", rarity: "silver", base: 9, step: 2.2, price: 12000, desc: "+9% de AGILIDADE em combate.", flavor: "Modulo ruinoso forjado sob medida para RUIN WARDEN." },
  { robotId: "forgeheart", name: "CORACAO FUNDIDO", kind: "vitality", element: "FORJA", rarity: "silver", base: 11.2, step: 2.8, price: 12000, desc: "+11.2% de HP maximo.", flavor: "Modulo fundido forjado sob medida para FORGE HEART." },
  { robotId: "snowreaver", name: "CELULA NIVEO", kind: "reactor", element: "NEVE", rarity: "bronze", base: 12, step: 3, price: 8000, desc: "+12% de MP maximo.", flavor: "Modulo niveo forjado sob medida para SNOW REAVER." },
  { robotId: "ashenrevenant", name: "GARRA CINEREO", kind: "leech", element: "CINZAS", rarity: "gold", base: 10.2, step: 1.9, price: 18000, desc: "Recupera 10.2% do dano causado como HP.", flavor: "Modulo cinereo forjado sob medida para ASHEN REVENANT." },
  { robotId: "plasmawraith", name: "ESPINHO PLASMICO", kind: "thorns", element: "PLASMA", rarity: "gold", base: 12.8, step: 2.6, price: 18000, desc: "Reflete 12.8% do dano recebido.", flavor: "Modulo plasmico forjado sob medida para PLASMA WRAITH." },
  { robotId: "shadowfang", name: "COLMEIA UMBRIO", kind: "regen", element: "SOMBRA", rarity: "silver", base: 4.5, step: 0.9, price: 12000, desc: "Repara 4.5% do HP maximo por turno.", flavor: "Modulo umbrio forjado sob medida para SHADOWFANG." },
  { robotId: "mirrorclad", name: "VISOR ESPELHADO", kind: "crit", element: "ESPELHO", rarity: "gold", base: 6.4, step: 1.3, price: 18000, desc: "+6.4% de chance de golpe critico.", flavor: "Modulo espelhado forjado sob medida para MIRRORCLAD." },
  { robotId: "bonemarshal", name: "MANTO OSSEO", kind: "phase", element: "OSSO", rarity: "silver", base: 4.5, step: 0.9, price: 12000, desc: "+4.5% de chance de esquiva.", flavor: "Modulo osseo forjado sob medida para BONE MARSHAL." },
  { robotId: "cloudpiercer", name: "RESSOADOR NIMBOSO", kind: "amp", element: "NUVEM", rarity: "bronze", base: 7, step: 1.8, price: 8000, desc: "+7% de dano nas habilidades.", flavor: "Modulo nimboso forjado sob medida para CLOUD PIERCER." },
  { robotId: "vulcanargo", name: "BARREIRA VULCANICO", kind: "aegis", element: "VULCAO", rarity: "silver", base: 6.7, step: 1.3, price: 12000, desc: "-6.7% de dano recebido.", flavor: "Modulo vulcanico forjado sob medida para VULCAN ARGO." },
  { robotId: "mireclad", name: "PUNHO PALUSTRE", kind: "power", element: "PANTANO", rarity: "bronze", base: 8, step: 2, price: 8000, desc: "+8% de FORCA em combate.", flavor: "Modulo palustre forjado sob medida para MIRECLAD." },
  { robotId: "aridfang", name: "PLACA ARIDO", kind: "guard", element: "DESERTO", rarity: "bronze", base: 8, step: 2, price: 8000, desc: "+8% de DEFESA em combate.", flavor: "Modulo arido forjado sob medida para ARID FANG." },
  { robotId: "tundrakeeper", name: "PROPULSOR BOREAL", kind: "speed", element: "TUNDRA", rarity: "silver", base: 9, step: 2.2, price: 12000, desc: "+9% de AGILIDADE em combate.", flavor: "Modulo boreal forjado sob medida para TUNDRA KEEPER." },
  { robotId: "reefsovereign", name: "CORACAO CORALINO", kind: "vitality", element: "RECIFE", rarity: "gold", base: 12.8, step: 3.2, price: 18000, desc: "+12.8% de HP maximo.", flavor: "Modulo coralino forjado sob medida para REEF SOVEREIGN." },
  { robotId: "obsidianfist", name: "CELULA OBSIDIANO", kind: "reactor", element: "OBSIDIANA", rarity: "silver", base: 13.4, step: 3.4, price: 12000, desc: "+13.4% de MP maximo.", flavor: "Modulo obsidiano forjado sob medida para OBSIDIAN FIST." },
  { robotId: "amberlock", name: "GARRA AMBARINO", kind: "leech", element: "AMBAR", rarity: "bronze", base: 8, step: 1.5, price: 8000, desc: "Recupera 8% do dano causado como HP.", flavor: "Modulo ambarino forjado sob medida para AMBERLOCK." },
  { robotId: "neondrifter", name: "ESPINHO NEONICO", kind: "thorns", element: "NEON", rarity: "silver", base: 11.2, step: 2.2, price: 12000, desc: "Reflete 11.2% do dano recebido.", flavor: "Modulo neonico forjado sob medida para NEON DRIFTER." },
  { robotId: "rustpriest", name: "COLMEIA OXIDADO", kind: "regen", element: "FERRUGEM", rarity: "bronze", base: 4, step: 0.8, price: 8000, desc: "Repara 4% do HP maximo por turno.", flavor: "Modulo oxidado forjado sob medida para RUST PRIEST." },
  { robotId: "graphenex", name: "VISOR GRAFENICO", kind: "crit", element: "GRAFENO", rarity: "gold", base: 6.4, step: 1.3, price: 18000, desc: "+6.4% de chance de golpe critico.", flavor: "Modulo grafenico forjado sob medida para GRAPHENEX." },
  { robotId: "quantumecho", name: "MANTO QUANTICO", kind: "phase", element: "QUANTUM", rarity: "gold", base: 5.1, step: 1, price: 18000, desc: "+5.1% de chance de esquiva.", flavor: "Modulo quantico forjado sob medida para QUANTUM ECHO." },
  { robotId: "nebulaseer", name: "RESSOADOR NEBULAR", kind: "amp", element: "NEBULOSA", rarity: "silver", base: 7.8, step: 2, price: 12000, desc: "+7.8% de dano nas habilidades.", flavor: "Modulo nebular forjado sob medida para NEBULA SEER." },
  { robotId: "eclipsar", name: "BARREIRA ECLIPTICO", kind: "aegis", element: "ECLIPSE", rarity: "gold", base: 7.7, step: 1.5, price: 18000, desc: "-7.7% de dano recebido.", flavor: "Modulo ecliptico forjado sob medida para ECLIPSAR." },
  { robotId: "meteorpunch", name: "PUNHO METEORICO", kind: "power", element: "METEORO", rarity: "silver", base: 9, step: 2.2, price: 12000, desc: "+9% de FORCA em combate.", flavor: "Modulo meteorico forjado sob medida para METEOR PUNCH." },
  { robotId: "ringwarden", name: "PLACA ORBITAL", kind: "guard", element: "ANEL", rarity: "silver", base: 9, step: 2.2, price: 12000, desc: "+9% de DEFESA em combate.", flavor: "Modulo orbital forjado sob medida para RING WARDEN." },
  { robotId: "pulsarcore", name: "PROPULSOR PULSANTE", kind: "speed", element: "PULSAR", rarity: "gold", base: 10.2, step: 2.6, price: 18000, desc: "+10.2% de AGILIDADE em combate.", flavor: "Modulo pulsante forjado sob medida para PULSAR CORE." },
  { robotId: "voidsingularity", name: "CORACAO SINGULAR", kind: "vitality", element: "BURACO NEGRO", rarity: "gold", base: 12.8, step: 3.2, price: 18000, desc: "+12.8% de HP maximo.", flavor: "Modulo singular forjado sob medida para VOID SINGULARITY." },
  { robotId: "seraphcircuit", name: "CELULA SOLAR", kind: "reactor", element: "LUZ", rarity: "gold", base: 15.4, step: 3.8, price: 18000, desc: "+15.4% de MP maximo.", flavor: "Modulo solar forjado sob medida para SERAPH CIRCUIT." },
  { robotId: "cinderhound", name: "GARRA INCANDESCENTE", kind: "leech", element: "BRASA", rarity: "bronze", base: 8, step: 1.5, price: 8000, desc: "Recupera 8% do dano causado como HP.", flavor: "Modulo incandescente forjado sob medida para CINDERHOUND." },
  { robotId: "glacierjaw", name: "ESPINHO GLACIAL", kind: "thorns", element: "GELO", rarity: "silver", base: 11.2, step: 2.2, price: 12000, desc: "Reflete 11.2% do dano recebido.", flavor: "Modulo glacial forjado sob medida para GLACIER JAW." },
  { robotId: "stormlance", name: "COLMEIA CICLONICO", kind: "regen", element: "TEMPESTADE", rarity: "silver", base: 4.5, step: 0.9, price: 12000, desc: "Repara 4.5% do HP maximo por turno.", flavor: "Modulo ciclonico forjado sob medida para STORMLANCE." },
  { robotId: "terraforge", name: "VISOR TELURICO", kind: "crit", element: "TERRA", rarity: "bronze", base: 5, step: 1, price: 8000, desc: "+5% de chance de golpe critico.", flavor: "Modulo telurico forjado sob medida para TERRAFORGE." },
  { robotId: "windshear", name: "MANTO EOLICO", kind: "phase", element: "VENTO", rarity: "bronze", base: 4, step: 0.8, price: 8000, desc: "+4% de chance de esquiva.", flavor: "Modulo eolico forjado sob medida para WINDSHEAR." },
  { robotId: "voidcaller", name: "RESSOADOR NULO", kind: "amp", element: "VAZIO", rarity: "silver", base: 7.8, step: 2, price: 12000, desc: "+7.8% de dano nas habilidades.", flavor: "Modulo nulo forjado sob medida para VOIDCALLER." },
  { robotId: "acidbloom", name: "BARREIRA CORROSIVO", kind: "aegis", element: "ACIDO", rarity: "bronze", base: 6, step: 1.2, price: 8000, desc: "-6% de dano recebido.", flavor: "Modulo corrosivo forjado sob medida para ACIDBLOOM." },
  { robotId: "gravitide", name: "PUNHO GRAVITICO", kind: "power", element: "GRAVIDADE", rarity: "silver", base: 9, step: 2.2, price: 12000, desc: "+9% de FORCA em combate.", flavor: "Modulo gravitico forjado sob medida para GRAVITIDE." },
  { robotId: "chronofracture", name: "PLACA CRONICO", kind: "guard", element: "TEMPO", rarity: "gold", base: 10.2, step: 2.6, price: 18000, desc: "+10.2% de DEFESA em combate.", flavor: "Modulo cronico forjado sob medida para CHRONOFRACTURE." },
  { robotId: "biolattice", name: "PROPULSOR ORGANICO", kind: "speed", element: "BIO", rarity: "silver", base: 9, step: 2.2, price: 12000, desc: "+9% de AGILIDADE em combate.", flavor: "Modulo organico forjado sob medida para BIOLATTICE." },
  { robotId: "crystallux", name: "CORACAO PRISMATICO", kind: "vitality", element: "CRISTAL", rarity: "gold", base: 12.8, step: 3.2, price: 18000, desc: "+12.8% de HP maximo.", flavor: "Modulo prismatico forjado sob medida para CRYSTALLUX." },
  { robotId: "aquabastion", name: "CELULA AQUATICO", kind: "reactor", element: "AGUA", rarity: "silver", base: 13.4, step: 3.4, price: 12000, desc: "+13.4% de MP maximo.", flavor: "Modulo aquatico forjado sob medida para AQUA BASTION." },
  { robotId: "emberwing", name: "GARRA IGNEO", kind: "leech", element: "FOGO", rarity: "bronze", base: 8, step: 1.5, price: 8000, desc: "Recupera 8% do dano causado como HP.", flavor: "Modulo igneo forjado sob medida para EMBERWING." },
  { robotId: "ironsentinel", name: "ESPINHO FERREO", kind: "thorns", element: "FERRO", rarity: "bronze", base: 10, step: 2, price: 8000, desc: "Reflete 10% do dano recebido.", flavor: "Modulo ferreo forjado sob medida para IRON SENTINEL." },
  { robotId: "thunderoni", name: "COLMEIA VOLTAICO", kind: "regen", element: "TROVAO", rarity: "silver", base: 4.5, step: 0.9, price: 12000, desc: "Repara 4.5% do HP maximo por turno.", flavor: "Modulo voltaico forjado sob medida para THUNDER ONI." },
  { robotId: "titanbulwark", name: "VISOR TITANICO", kind: "crit", element: "TITA", rarity: "gold", base: 6.4, step: 1.3, price: 18000, desc: "+6.4% de chance de golpe critico.", flavor: "Modulo titanico forjado sob medida para TITAN BULWARK." },
  { robotId: "magnashrike", name: "MANTO MAGNETICO", kind: "phase", element: "MAGNETISMO", rarity: "silver", base: 4.5, step: 0.9, price: 12000, desc: "+4.5% de chance de esquiva.", flavor: "Modulo magnetico forjado sob medida para MAGNASHRIKE." },
  { robotId: "jadearbiter", name: "RESSOADOR JADEITA", kind: "amp", element: "JADE", rarity: "gold", base: 9, step: 2.3, price: 18000, desc: "+9% de dano nas habilidades.", flavor: "Modulo jadeita forjado sob medida para JADE ARBITER." },
  { robotId: "cosmoveil", name: "BARREIRA COSMICO", kind: "aegis", element: "COSMICO", rarity: "silver", base: 6.7, step: 1.3, price: 12000, desc: "-6.7% de dano recebido.", flavor: "Modulo cosmico forjado sob medida para COSMOVEIL." },
  { robotId: "sandwyrm", name: "PUNHO ARENOSO", kind: "power", element: "AREIA", rarity: "silver", base: 9, step: 2.2, price: 12000, desc: "+9% de FORCA em combate.", flavor: "Modulo arenoso forjado sob medida para SANDWYRM." },
  { robotId: "pyreconclave", name: "PLACA IGNEO", kind: "guard", element: "FOGO", rarity: "gold", base: 10.2, step: 2.6, price: 18000, desc: "+10.2% de DEFESA em combate.", flavor: "Modulo igneo forjado sob medida para PYRE CONCLAVE." },
  { robotId: "frostmonarch", name: "PROPULSOR GLACIAL FROST", kind: "speed", element: "GELO", rarity: "gold", base: 10.2, step: 2.6, price: 18000, desc: "+10.2% de AGILIDADE em combate.", flavor: "Modulo glacial forjado sob medida para FROST MONARCH." },
  { robotId: "voltcarnyx", name: "CORACAO VOLTAICO VOLTCARNYX", kind: "vitality", element: "TROVAO", rarity: "gold", base: 12.8, step: 3.2, price: 18000, desc: "+12.8% de HP maximo.", flavor: "Modulo voltaico forjado sob medida para VOLTCARNYX." },
  { robotId: "quarrybreaker", name: "CELULA TELURICO", kind: "reactor", element: "TERRA", rarity: "bronze", base: 12, step: 3, price: 8000, desc: "+12% de MP maximo.", flavor: "Modulo telurico forjado sob medida para QUARRY BREAKER." },
  { robotId: "zephyrhalo", name: "GARRA EOLICO", kind: "leech", element: "VENTO", rarity: "gold", base: 10.2, step: 1.9, price: 18000, desc: "Recupera 10.2% do dano causado como HP.", flavor: "Modulo eolico forjado sob medida para ZEPHYR HALO." },
  { robotId: "nullpriest", name: "ESPINHO NULO", kind: "thorns", element: "VAZIO", rarity: "gold", base: 12.8, step: 2.6, price: 18000, desc: "Reflete 12.8% do dano recebido.", flavor: "Modulo nulo forjado sob medida para NULL PRIEST." },
  { robotId: "venomcarapace", name: "COLMEIA TOXICO", kind: "regen", element: "TOXINA", rarity: "silver", base: 4.5, step: 0.9, price: 12000, desc: "Repara 4.5% do HP maximo por turno.", flavor: "Modulo toxico forjado sob medida para VENOM CARAPACE." },
  { robotId: "grimsprocket", name: "VISOR RUINOSO", kind: "crit", element: "RUINA", rarity: "bronze", base: 5, step: 1, price: 8000, desc: "+5% de chance de golpe critico.", flavor: "Modulo ruinoso forjado sob medida para GRIM SPROCKET." },
  { robotId: "blastfurnace", name: "MANTO FUNDIDO", kind: "phase", element: "FORJA", rarity: "gold", base: 5.1, step: 1, price: 18000, desc: "+5.1% de chance de esquiva.", flavor: "Modulo fundido forjado sob medida para BLAST FURNACE." },
  { robotId: "hailstriker", name: "RESSOADOR NIVEO", kind: "amp", element: "NEVE", rarity: "silver", base: 7.8, step: 2, price: 12000, desc: "+7.8% de dano nas habilidades.", flavor: "Modulo niveo forjado sob medida para HAILSTRIKER." },
  { robotId: "emberlash", name: "BARREIRA INCANDESCENTE", kind: "aegis", element: "BRASA", rarity: "bronze", base: 6, step: 1.2, price: 8000, desc: "-6% de dano recebido.", flavor: "Modulo incandescente forjado sob medida para EMBERLASH." },
  { robotId: "lumenblade", name: "PUNHO SOLAR LUMEN", kind: "power", element: "LUZ", rarity: "silver", base: 9, step: 2.2, price: 12000, desc: "+9% de FORCA em combate.", flavor: "Modulo solar forjado sob medida para LUMEN BLADE." },
  { robotId: "gloomtide", name: "PLACA ABISSAL", kind: "guard", element: "ABISSO", rarity: "silver", base: 9, step: 2.2, price: 12000, desc: "+9% de DEFESA em combate.", flavor: "Modulo abissal forjado sob medida para GLOOMTIDE." },
  { robotId: "sporeherald", name: "PROPULSOR ORGANICO SPORE", kind: "speed", element: "BIO", rarity: "bronze", base: 8, step: 2, price: 8000, desc: "+8% de AGILIDADE em combate.", flavor: "Modulo organico forjado sob medida para SPORE HERALD." },
  { robotId: "prismvector", name: "CORACAO PRISMATICO PRISM", kind: "vitality", element: "CRISTAL", rarity: "silver", base: 11.2, step: 2.8, price: 12000, desc: "+11.2% de HP maximo.", flavor: "Modulo prismatico forjado sob medida para PRISM VECTOR." },
  { robotId: "maelstromfist", name: "CELULA AQUATICO MAELSTROM", kind: "reactor", element: "AGUA", rarity: "gold", base: 15.4, step: 3.8, price: 18000, desc: "+15.4% de MP maximo.", flavor: "Modulo aquatico forjado sob medida para MAELSTROM FIST." },
  { robotId: "scrapbaron", name: "GARRA OXIDADO", kind: "leech", element: "FERRUGEM", rarity: "silver", base: 9, step: 1.7, price: 12000, desc: "Recupera 9% do dano causado como HP.", flavor: "Modulo oxidado forjado sob medida para SCRAP BARON." },
  { robotId: "stelladrake", name: "ESPINHO COSMICO", kind: "thorns", element: "COSMICO", rarity: "gold", base: 12.8, step: 2.6, price: 18000, desc: "Reflete 12.8% do dano recebido.", flavor: "Modulo cosmico forjado sob medida para STELLADRAKE." },
  { robotId: "terminuscore", name: "COLMEIA QUANTICO", kind: "regen", element: "QUANTUM", rarity: "gold", base: 5.1, step: 1, price: 18000, desc: "Repara 5.1% do HP maximo por turno.", flavor: "Modulo quantico forjado sob medida para TERMINUS CORE." },
  { robotId: "heliondriver", name: "VISOR HELIACO HELION", kind: "crit", element: "SOL", rarity: "silver", base: 5.6, step: 1.1, price: 12000, desc: "+5.6% de chance de golpe critico.", flavor: "Modulo heliaco forjado sob medida para HELION DRIVER." },
  { robotId: "noxfeather", name: "MANTO UMBRIO", kind: "phase", element: "SOMBRA", rarity: "silver", base: 4.5, step: 0.9, price: 12000, desc: "+4.5% de chance de esquiva.", flavor: "Modulo umbrio forjado sob medida para NOXFEATHER." },
  { robotId: "basaltguard", name: "RESSOADOR OBSIDIANO", kind: "amp", element: "OBSIDIANA", rarity: "bronze", base: 7, step: 1.8, price: 8000, desc: "+7% de dano nas habilidades.", flavor: "Modulo obsidiano forjado sob medida para BASALT GUARD." },
  { robotId: "hexweaver", name: "BARREIRA GRAFENICO", kind: "aegis", element: "GRAFENO", rarity: "silver", base: 6.7, step: 1.3, price: 12000, desc: "-6.7% de dano recebido.", flavor: "Modulo grafenico forjado sob medida para HEXWEAVER." },
  { robotId: "solstitia", name: "PUNHO ECLIPTICO", kind: "power", element: "ECLIPSE", rarity: "silver", base: 9, step: 2.2, price: 12000, desc: "+9% de FORCA em combate.", flavor: "Modulo ecliptico forjado sob medida para SOLSTITIA." },
  { robotId: "cometfang", name: "PLACA METEORICO", kind: "guard", element: "METEORO", rarity: "bronze", base: 8, step: 2, price: 8000, desc: "+8% de DEFESA em combate.", flavor: "Modulo meteorico forjado sob medida para COMETFANG." },
  { robotId: "orbitalmarshal", name: "PROPULSOR ORBITAL", kind: "speed", element: "ANEL", rarity: "gold", base: 10.2, step: 2.6, price: 18000, desc: "+10.2% de AGILIDADE em combate.", flavor: "Modulo orbital forjado sob medida para ORBITAL MARSHAL." },
  { robotId: "neutronmaul", name: "CORACAO PULSANTE", kind: "vitality", element: "PULSAR", rarity: "silver", base: 11.2, step: 2.8, price: 12000, desc: "+11.2% de HP maximo.", flavor: "Modulo pulsante forjado sob medida para NEUTRON MAUL." },
  { robotId: "eventhorizon", name: "CELULA SINGULAR", kind: "reactor", element: "BURACO NEGRO", rarity: "gold", base: 15.4, step: 3.8, price: 18000, desc: "+15.4% de MP maximo.", flavor: "Modulo singular forjado sob medida para EVENT HORIZON." },
  { robotId: "mossknight", name: "GARRA SILVESTRE", kind: "leech", element: "SELVA", rarity: "bronze", base: 8, step: 1.5, price: 8000, desc: "Recupera 8% do dano causado como HP.", flavor: "Modulo silvestre forjado sob medida para MOSS KNIGHT." },
  { robotId: "quicksilverr", name: "ESPINHO ESPELHADO", kind: "thorns", element: "ESPELHO", rarity: "gold", base: 12.8, step: 2.6, price: 18000, desc: "Reflete 12.8% do dano recebido.", flavor: "Modulo espelhado forjado sob medida para QUICKSILVER." },
  { robotId: "boneorchestra", name: "COLMEIA OSSEO", kind: "regen", element: "OSSO", rarity: "gold", base: 5.1, step: 1, price: 18000, desc: "Repara 5.1% do HP maximo por turno.", flavor: "Modulo osseo forjado sob medida para BONE ORCHESTRA." },
  { robotId: "stratoveil", name: "VISOR NIMBOSO", kind: "crit", element: "NUVEM", rarity: "silver", base: 5.6, step: 1.1, price: 12000, desc: "+5.6% de chance de golpe critico.", flavor: "Modulo nimboso forjado sob medida para STRATOVEIL." },
  { robotId: "lavabastion", name: "MANTO VULCANICO", kind: "phase", element: "VULCAO", rarity: "gold", base: 5.1, step: 1, price: 18000, desc: "+5.1% de chance de esquiva.", flavor: "Modulo vulcanico forjado sob medida para LAVA BASTION." },
  { robotId: "bogtyrant", name: "RESSOADOR PALUSTRE", kind: "amp", element: "PANTANO", rarity: "silver", base: 7.8, step: 2, price: 12000, desc: "+7.8% de dano nas habilidades.", flavor: "Modulo palustre forjado sob medida para BOG TYRANT." },
  { robotId: "mirageblade", name: "BARREIRA ARIDO", kind: "aegis", element: "DESERTO", rarity: "gold", base: 7.7, step: 1.5, price: 18000, desc: "-7.7% de dano recebido.", flavor: "Modulo arido forjado sob medida para MIRAGE BLADE." },
  { robotId: "permafrostmk", name: "PUNHO BOREAL", kind: "power", element: "TUNDRA", rarity: "gold", base: 10.2, step: 2.6, price: 18000, desc: "+10.2% de FORCA em combate.", flavor: "Modulo boreal forjado sob medida para PERMAFROST MK." },
  { robotId: "coralshiv", name: "PLACA CORALINO", kind: "guard", element: "RECIFE", rarity: "bronze", base: 8, step: 2, price: 8000, desc: "+8% de DEFESA em combate.", flavor: "Modulo coralino forjado sob medida para CORAL SHIV." },
  { robotId: "resinjudge", name: "PROPULSOR AMBARINO", kind: "speed", element: "AMBAR", rarity: "silver", base: 9, step: 2.2, price: 12000, desc: "+9% de AGILIDADE em combate.", flavor: "Modulo ambarino forjado sob medida para RESIN JUDGE." },
  { robotId: "gridrunner", name: "CORACAO NEONICO", kind: "vitality", element: "NEON", rarity: "bronze", base: 10, step: 2.5, price: 8000, desc: "+10% de HP maximo.", flavor: "Modulo neonico forjado sob medida para GRIDRUNNER." },
  { robotId: "seraphimvoid", name: "CELULA NULO", kind: "reactor", element: "VAZIO", rarity: "gold", base: 15.4, step: 3.8, price: 18000, desc: "+15.4% de MP maximo.", flavor: "Modulo nulo forjado sob medida para SERAPHIM VOID." },
  { robotId: "tempestcrown", name: "GARRA CICLONICO", kind: "leech", element: "TEMPESTADE", rarity: "gold", base: 10.2, step: 1.9, price: 18000, desc: "Recupera 10.2% do dano causado como HP.", flavor: "Modulo ciclonico forjado sob medida para TEMPEST CROWN." },
  { robotId: "ironmonarch", name: "ESPINHO FERREO IRON", kind: "thorns", element: "FERRO", rarity: "gold", base: 12.8, step: 2.6, price: 18000, desc: "Reflete 12.8% do dano recebido.", flavor: "Modulo ferreo forjado sob medida para IRON MONARCH." },
  { robotId: "vireoblade", name: "COLMEIA JADEITA", kind: "regen", element: "JADE", rarity: "silver", base: 4.5, step: 0.9, price: 12000, desc: "Repara 4.5% do HP maximo por turno.", flavor: "Modulo jadeita forjado sob medida para VIREO BLADE." },
  { robotId: "aetherloom", name: "VISOR NEBULAR", kind: "crit", element: "NEBULOSA", rarity: "gold", base: 6.4, step: 1.3, price: 18000, desc: "+6.4% de chance de golpe critico.", flavor: "Modulo nebular forjado sob medida para AETHER LOOM." },
  { robotId: "cindercrown", name: "MANTO CINEREO", kind: "phase", element: "CINZAS", rarity: "silver", base: 4.5, step: 0.9, price: 12000, desc: "+4.5% de chance de esquiva.", flavor: "Modulo cinereo forjado sob medida para CINDER CROWN." },
  { robotId: "magnetarfist", name: "RESSOADOR MAGNETICO", kind: "amp", element: "MAGNETISMO", rarity: "gold", base: 9, step: 2.3, price: 18000, desc: "+9% de dano nas habilidades.", flavor: "Modulo magnetico forjado sob medida para MAGNETAR FIST." },
  { robotId: "ravenousbloom", name: "BARREIRA ORGANICO RAVENOUS", kind: "aegis", element: "BIO", rarity: "gold", base: 7.7, step: 1.5, price: 18000, desc: "-7.7% de dano recebido.", flavor: "Modulo organico forjado sob medida para RAVENOUS BLOOM." },
];

export const GADGET_MAP: Record<string, GadgetDef> = Object.fromEntries(
  GADGETS.map((g) => [g.robotId, g]),
);

export const KIND_LABEL: Record<GadgetKind, string> = {
  power: "OVERDRIVE",
  guard: "COURACA",
  speed: "TURBINA",
  vitality: "NUCLEO VITAL",
  reactor: "REATOR",
  leech: "DRENO",
  thorns: "REPULSOR",
  regen: "NANOFORJA",
  crit: "MIRA",
  phase: "DESLOCADOR",
  amp: "AMPLIFICADOR",
  aegis: "EGIDE",
};

/** valor do efeito para um nivel de gadget */
export function gadgetValue(def: GadgetDef, level: number): number {
  const l = Math.max(1, Math.min(GADGET_MAX_LEVEL, level));
  return Math.round((def.base + def.step * (l - 1)) * 10) / 10;
}

export function gadgetDesc(def: GadgetDef, level: number): string {
  const v = gadgetValue(def, level);
  switch (def.kind) {
    case "power":
      return `+${v}% de FORCA em combate.`;
    case "guard":
      return `+${v}% de DEFESA em combate.`;
    case "speed":
      return `+${v}% de AGILIDADE em combate.`;
    case "vitality":
      return `+${v}% de HP maximo.`;
    case "reactor":
      return `+${v}% de MP maximo.`;
    case "leech":
      return `Recupera ${v}% do dano causado como HP.`;
    case "thorns":
      return `Reflete ${v}% do dano recebido.`;
    case "regen":
      return `Repara ${v}% do HP maximo por turno.`;
    case "crit":
      return `+${v}% de chance de golpe critico.`;
    case "phase":
      return `+${v}% de chance de esquiva.`;
    case "amp":
      return `+${v}% de dano nas habilidades.`;
    case "aegis":
      return `-${v}% de dano recebido.`;
  }
}

/** custo para subir do nivel atual para o proximo */
export function upgradeCost(def: GadgetDef, current: number): number {
  return Math.round((def.price * 0.45 * Math.pow(current + 1, 1.35)) / 50) * 50;
}

export function gadgetArt(robotId: string): string {
  return `/gadgets/${robotId}.png`;
}

/** nivel do gadget usado por robos da IA (so a partir do nivel 10 do robo) */
export function aiGadgetLevel(robotId: string, robotLevel: number): number {
  if (robotLevel < GADGET_ROBOT_LEVEL || !GADGET_MAP[robotId]) return 0;
  const seed = [...robotId].reduce((a, c) => a + c.charCodeAt(0), 0);
  const base = Math.floor((robotLevel - GADGET_ROBOT_LEVEL) / 9) + 1;
  return Math.max(1, Math.min(GADGET_MAX_LEVEL, base + (seed % 2)));
}
