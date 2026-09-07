import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let velocityX = 0;
    let velocityY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Bouncy spring animation
    const animate = () => {
      const springStrength = 0.15;
      const damping = 0.75;

      // Calculate spring force
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;

      // Apply spring physics
      velocityX += dx * springStrength;
      velocityY += dy * springStrength;

      // Apply damping
      velocityX *= damping;
      velocityY *= damping;

      // Update position
      cursorX += velocityX;
      cursorY += velocityY;

      cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;

      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Hide on mobile/touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
    >
      <div className="h-5 w-5 rounded-full bg-foreground" />
    </div>
  );
};

export default CustomCursor;

