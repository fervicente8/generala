"use client";

import { HTMLAttributes } from "react";
import styles from "./CustomLoadingSpinner.module.css";

interface CustomLoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  color?: string;
  speed?: "slow" | "normal" | "fast";
  textColor?: string;
  showText?: boolean;
  text?: string;
}

const CustomLoadingSpinner = ({
  size = "md",
  color = "white",
  speed = "normal",
  textColor = "white",
  showText = true,
  text = "Cargando...",
  className,
  ...props
}: CustomLoadingSpinnerProps) => {
  return (
    <div className={`${styles.container} ${className || ""}`} {...props}>
      {/* Contenedor del dado */}
      <div
        className={`${styles.dice} ${styles[size]} ${
          speed === "slow"
            ? styles["spin-slow"]
            : speed === "fast"
            ? styles["spin-fast"]
            : ""
        }`}
        style={
          {
            "--half-size":
              size === "sm" ? "8px" : size === "md" ? "16px" : "24px",
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
      {showText && (
        <span className={`${styles.text} ${styles[size]} text-${textColor}`}>
          {text}
        </span>
      )}
    </div>
  );
};

export default CustomLoadingSpinner;
