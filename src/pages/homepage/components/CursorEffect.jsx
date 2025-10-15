import React, { useEffect, useState } from "react";
import styles from "./CursorEffect.module.css";

export default function CursorEffect() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const hideCursor = () => {
      setIsVisible(false);
    };

    document.addEventListener("mousemove", updateCursor);
    document.addEventListener("mouseenter", () => setIsVisible(true));
    document.addEventListener("mouseleave", hideCursor);

    return () => {
      document.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseenter", () => setIsVisible(true));
      document.removeEventListener("mouseleave", hideCursor);
    };
  }, []);

  return (
    <>
      <div 
        className={`${styles.cursorPill} ${isVisible ? styles.visible : ''}`}
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
        }}
      />
      <div 
        className={styles.bgAnimated}
        style={{
          '--mx': `${cursorPosition.x}px`,
          '--my': `${cursorPosition.y}px`,
        }}
      />
    </>
  );
}

