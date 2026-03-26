import type { GameUser } from "@/types";

/** Misma lógica que el anotador (categorías por etiqueta de fila). */
export function calculateCategoryScore(
  categoryLabel: string,
  dice: number[],
  rollCount: number,
  playerScore: GameUser,
): number {
  if (dice.length !== 5 || dice.some((d) => d < 1 || d > 6)) return 0;

  const counts = dice.reduce(
    (acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );

  const sorted = [...dice].sort();
  const servedBonus = rollCount === 1 ? 5 : 0;

  switch (categoryLabel) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6": {
      const num = parseInt(categoryLabel, 10);
      return (counts[num] || 0) * num;
    }

    case "Escalera": {
      const s = sorted.join("");
      const base = ["12345", "23456", "13456"].includes(s) ? 20 : 0;
      return base > 0 ? base + servedBonus : 0;
    }

    case "Full": {
      const vals = Object.values(counts);
      const base = vals.includes(3) && vals.includes(2) ? 30 : 0;
      return base > 0 ? base + servedBonus : 0;
    }

    case "Poker": {
      const base = Object.values(counts).some((c) => c >= 4) ? 40 : 0;
      return base > 0 ? base + servedBonus : 0;
    }

    case "Generala": {
      const base = Object.values(counts).some((c) => c === 5) ? 50 : 0;
      return base > 0 ? base + servedBonus : 0;
    }

    case "Doble Generala":
    case "Generala II": {
      const base =
        Object.values(counts).some((c) => c === 5) && playerScore.generala
          ? 100
          : 0;
      return base > 0 ? base + servedBonus : 0;
    }

    default:
      return 0;
  }
}

type CategoryDef = {
  label: string;
  name: keyof Pick<
    GameUser,
    | "ones"
    | "twos"
    | "threes"
    | "fours"
    | "fives"
    | "sixes"
    | "straight"
    | "fullHouse"
    | "poker"
    | "generala"
    | "double"
  >;
};

const SCORING_CATEGORIES: CategoryDef[] = [
  { label: "1", name: "ones" },
  { label: "2", name: "twos" },
  { label: "3", name: "threes" },
  { label: "4", name: "fours" },
  { label: "5", name: "fives" },
  { label: "6", name: "sixes" },
  { label: "Escalera", name: "straight" },
  { label: "Full", name: "fullHouse" },
  { label: "Poker", name: "poker" },
  { label: "Generala", name: "generala" },
  { label: "Generala II", name: "double" },
];

function categoryFilled(player: GameUser, name: CategoryDef["name"]): boolean {
  const v = player[name];
  return v !== null && v !== undefined;
}

/** Cara que cumple mínimo de repeticiones (la más alta si hay empate). */
function faceMeetingMinCount(dice: number[], minCount: number): number | null {
  const counts = dice.reduce(
    (acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );
  let best: number | null = null;
  for (let f = 1; f <= 6; f++) {
    if ((counts[f] || 0) >= minCount) {
      if (best === null || f > best) best = f;
    }
  }
  return best;
}

function formatHintLine(
  def: CategoryDef,
  score: number,
  dice: number[],
): string {
  if (/^[1-6]$/.test(def.label)) {
    return `${score} al ${def.label}`;
  }
  if (def.name === "straight") {
    return `${score} a la escalera`;
  }
  if (def.name === "fullHouse") {
    return `${score} al full house`;
  }
  if (def.name === "poker") {
    const f = faceMeetingMinCount(dice, 4);
    return `${score} al poker`;
  }
  if (def.name === "generala") {
    return `${score} a la generala`;
  }
  if (def.name === "double") {
    return `${score} a la doble generala`;
  }
  return `${score}`;
}

export type ScoreSheetCategoryKey =
  | "ones"
  | "twos"
  | "threes"
  | "fours"
  | "fives"
  | "sixes"
  | "straight"
  | "fullHouse"
  | "poker"
  | "generala"
  | "double";

export type PossibleMarkHint = {
  score: number;
  line: string;
  categoryOrder: number;
  /** Campo que envía la API `submit-score` */
  category: ScoreSheetCategoryKey;
};

/**
 * Categorías libres donde estos dados dan puntos > 0, ordenadas de menor a mayor puntaje.
 * No incluye tachar (0); no indica qué dados conservar.
 */
export function getPossibleMarkHints(
  player: GameUser,
  dice: number[],
  rollCount: number,
): PossibleMarkHint[] {
  if (dice.length !== 5) return [];

  const out: PossibleMarkHint[] = [];
  SCORING_CATEGORIES.forEach((def, categoryOrder) => {
    if (categoryFilled(player, def.name)) return;
    const score = calculateCategoryScore(def.label, dice, rollCount, player);
    if (score <= 0) return;
    out.push({
      score,
      line: formatHintLine(def, score, dice),
      categoryOrder,
      category: def.name,
    });
  });

  out.sort((a, b) =>
    a.score !== b.score ? a.score - b.score : a.categoryOrder - b.categoryOrder,
  );
  return out;
}
