import styles from "./ScoreSheet.module.css";

/** Lápiz fijo en viewport (evita recortes por overflow y transforms del panel). */
export function mountBodyPencilCursor(container: HTMLElement): () => void {
  const pointer = document.createElement("div");
  pointer.className = styles.pointer;
  pointer.setAttribute("aria-hidden", "true");
  document.body.appendChild(pointer);

  const half = 12;
  const trackPointer = (e: MouseEvent) => {
    pointer.style.left = `${e.clientX - half + 10}px`;
    pointer.style.top = `${e.clientY - half - 10}px`;
  };

  const onEnter = () => {
    pointer.style.opacity = "1";
  };
  const onLeave = () => {
    pointer.style.opacity = "0";
  };

  document.addEventListener("mousemove", trackPointer);
  container.addEventListener("mouseenter", onEnter);
  container.addEventListener("mouseleave", onLeave);

  return () => {
    document.removeEventListener("mousemove", trackPointer);
    container.removeEventListener("mouseenter", onEnter);
    container.removeEventListener("mouseleave", onLeave);
    pointer.remove();
  };
}
