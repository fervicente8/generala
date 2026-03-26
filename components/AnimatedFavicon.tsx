"use client";

import { useEffect, useRef } from "react";

const SIZE = 32;
const UPDATE_MS = 90;
const ROTATION_PER_TICK = 0.22;

function getIconLinks(): HTMLLinkElement[] {
  return Array.from(
    document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]'),
  );
}

function drawDiceOnCanvas(
  ctx: CanvasRenderingContext2D,
  angle: number,
  img: HTMLImageElement | null,
  useImage: boolean,
) {
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.save();
  ctx.translate(SIZE / 2, SIZE / 2);
  ctx.rotate(angle);
  ctx.translate(-SIZE / 2, -SIZE / 2);

  if (useImage && img && img.naturalWidth > 0) {
    ctx.drawImage(img, 0, 0, SIZE, SIZE);
  } else {
    const pad = 3;
    const w = SIZE - pad * 2;
    ctx.fillStyle = "#f4f1e8";
    ctx.strokeStyle = "#6b5a3e";
    ctx.lineWidth = 1.25;
    ctx.fillRect(pad, pad, w, w);
    ctx.strokeRect(pad + 0.5, pad + 0.5, w - 1, w - 1);
    ctx.fillStyle = "#2e2b14";
    const r = 1.35;
    const cx = pad + w / 2;
    const cy = pad + w / 2;
    const off = w * 0.22;
    const dots: [number, number][] = [
      [cx - off, cy - off],
      [cx + off, cy - off],
      [cx, cy],
      [cx - off, cy + off],
      [cx + off, cy + off],
    ];
    for (const [x, y] of dots) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

/**
 * Actualiza el favicon con el dado rotando (canvas → data URL).
 * Apple touch icon se deja fija desde metadata.
 */
export function AnimatedFavicon() {
  const angleRef = useRef(0);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    let useImage = false;
    img.decoding = "async";
    img.src = "/dice-icon.png";
    img.onload = () => {
      useImage = true;
    };
    img.onerror = () => {
      useImage = false;
    };

    const tick = () => {
      angleRef.current += ROTATION_PER_TICK;
      drawDiceOnCanvas(ctx, angleRef.current, img, useImage);
      const url = canvas.toDataURL("image/png");
      for (const link of getIconLinks()) {
        link.type = "image/png";
        link.href = url;
      }
    };

    const id = setInterval(tick, UPDATE_MS);
    tick();

    return () => clearInterval(id);
  }, []);

  return null;
}
