"use client";

import { HTMLAttributes } from "react";
import styles from "./Dice.module.css";

interface DiceProps extends HTMLAttributes<HTMLDivElement> {
  value: 1 | 2 | 3 | 4 | 5 | 6;
  rolling?: boolean;
  selectedForReroll?: boolean;
  isMyTurn?: boolean;
  onClick?: () => void;
}

const Dice = ({
  value,
  rolling = false,
  selectedForReroll = false,
  isMyTurn = false,
  onClick,
  className,
  ...props
}: DiceProps) => {
  return (
    <div
      className={`${styles.container} ${className || ""} ${
        selectedForReroll ? styles.selected : ""
      } ${isMyTurn ? styles.interactive : ""}`}
      onClick={isMyTurn ? onClick : undefined}
      {...props}
    >
      <div
        className={`${styles.dice} ${
          rolling ? styles.rolling : styles[`face-${value}`]
        }`}
        style={
          {
            "--half-size": "16px",
          } as React.CSSProperties
        }
      >
        {/* Caras del dado */}
        {["front", "back", "right", "left", "top", "bottom"].map((face) => (
          <div key={face} className={`${styles.face} ${styles[face]}`}>
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={styles.dot} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dice;
