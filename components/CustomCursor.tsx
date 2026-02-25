import React, { useEffect, useRef, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
}

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const starIdRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const animationFrameRef = useRef<number>();

  // Colors for stars: gold and logo colors
  const starColors = [
    '#FFD700', // Gold
    '#FFC700', // Darker Gold
    '#FFED4E', // Light Gold
    '#3B82F6', // Brand Blue
    '#0EA5E9', // Cyan
    '#1E40AF', // Darker Blue
  ];

  useEffect(() => {
    document.body.classList.add('custom-cursor-active');

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create star
    const createStar = (x: number, y: number) => {
      // PERFORMANCE: Limit the number of stars to prevent lag
      if (starsRef.current.length > 35) {
        starsRef.current.shift();
      }

      const size = Math.random() * 8 + 3; // 3-11px
      const vx = (Math.random() - 0.5) * 3; // Horizontal velocity
      const vy = Math.random() * 2 + 1; // Falling velocity
      const color = starColors[Math.floor(Math.random() * starColors.length)];

      starsRef.current.push({
        id: starIdRef.current++,
        x,
        y: y - 5, // Offset slightly above cursor
        size,
        color,
        vx,
        vy,
      });
    };

    // Animate stars
    const animateStars = () => {
      const now = Date.now();
      const deltaTime = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars - efficient loop
      let i = starsRef.current.length;
      while (i--) {
        const star = starsRef.current[i];
        star.x += star.vx * 60 * deltaTime;
        star.y += star.vy * 60 * deltaTime;

        // Life cycle based on alpha/position
        const opacity = Math.max(0, 1 - (Date.now() - (lastTimeRef.current - 1000)) / 1000); // Decays over ~1s

        if (star.y > canvas.height || opacity <= 0) {
          starsRef.current.splice(i, 1);
          continue;
        }

        drawStar(ctx, star.x, star.y, star.size, star.color, opacity);
      }

      animationFrameRef.current = requestAnimationFrame(animateStars);
    };

    const drawStar = (
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      size: number,
      color: string,
      opacity: number
    ) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;

      // Reduce shadow blur for better performance on mobile/low-end devices
      ctx.shadowColor = color;
      ctx.shadowBlur = 4; // Smaller blur = faster rendering

      const points = 5;
      const innerRadius = size / 2;
      const outerRadius = size;

      ctx.beginPath();
      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / points - Math.PI / 2;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Track mouse movement
    let lastCreatedTime = Date.now();
    const moveCursor = (e: MouseEvent) => {
      // Use requestAnimationFrame for smooth cursor movement
      if (cursorRef.current) {
        const style = cursorRef.current.style;
        style.opacity = '1';
        style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) scaleX(-1)`;
      }

      const now = Date.now();
      if (now - lastCreatedTime > 40) { // Increased throttle for better performance
        createStar(e.clientX, e.clientY);
        lastCreatedTime = now;
      }
    };

    const onMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
    };

    const onMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    animationFrameRef.current = requestAnimationFrame(animateStars);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-[9998] pointer-events-none"
        style={{ display: 'block' }}
      />
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 z-[9999] pointer-events-none hidden md:block"
        style={{
          backgroundImage: `url('mascots/h3.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          willChange: 'transform',
          marginTop: '-10px',
          marginLeft: '-10px'
        }}
      />
    </>
  );
};

export default CustomCursor;