"use client";

import CustomLoadingSpinner from "./CustomLoadingSpinner";

interface LoadingOverlayProps {
  text?: string;
  /** Opacidad del fondo (0-1). Default 0.85 */
  backdropOpacity?: number;
}

/**
 * Overlay de pantalla completa que bloquea la interacción y muestra un spinner.
 * Usar mientras se verifica sesión o se carga contenido inicial.
 */
export default function LoadingOverlay({
  text = "Cargando...",
  backdropOpacity = 0.85,
}: LoadingOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A1A1A]"
      style={{
        backgroundColor: `rgba(26, 26, 26, ${backdropOpacity})`,
        pointerEvents: "auto",
      }}
      role="status"
      aria-live="polite"
      aria-label={text}
    >
      <div className="flex flex-col items-center gap-6">
        <CustomLoadingSpinner
          size="lg"
          text={text}
          textColor="white"
          showText={true}
        />
      </div>
    </div>
  );
}
