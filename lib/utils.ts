export function cn(...classes: (string | undefined)[]) {
    return classes.filter(Boolean).join(" ");
  }
  

  export const getPlayerPositions = (playerCount: number): string[] => {
    switch (playerCount) {
      case 2:
        return [
          "top-4 left-1/2 -translate-x-1/2",
          "bottom-4 left-1/2 -translate-x-1/2",
        ];
      case 3:
        return [
          "top-4 left-1/2 -translate-x-1/2",
          "bottom-4 left-1/2 -translate-x-1/2",
          "right-4 top-1/2 -translate-y-1/2",
        ];
      case 4:
        return [
          "top-4 left-1/2 -translate-x-1/2",
          "bottom-4 left-1/2 -translate-x-1/2",
          "left-4 top-1/2 -translate-y-1/2",
          "right-4 top-1/2 -translate-y-1/2",
        ];
      case 5:
        return [
          "top-4 left-1/2 -translate-x-1/2",
          "bottom-4 left-1/2 -translate-x-1/2",
          "left-4 top-1/2 -translate-y-1/2",
          "right-4 top-1/2 -translate-y-1/2",
          "top-8 left-8", // en diagonal arriba a la izquierda
        ];
      default:
        return Array(playerCount)
          .fill("top-4 left-1/2 -translate-x-1/2") // fallback si hay más de 5
          .map((_, i) => `top-[${i * 10}px] left-[${i * 10}px]`);
    }
  };