import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add class to body to hide default cursor when component mounts
    document.body.classList.add('custom-cursor-active');

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Ensure opacity is 1 whenever mouse moves (fixes issue where it stays hidden on load)
        cursorRef.current.style.opacity = '1'; 
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    // Show cursor when moving
    const onMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
    };

    // Hide cursor when leaving window
    const onMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      // w-32 = 8rem = 10px
      className="fixed top-0 left-0 w-10 h-10 z-[9999] pointer-events-none hidden md:block"
      style={{
        // Using lh3.googleusercontent.com/d/ID usually bypasses the view/export redirect issues for images
        backgroundImage: `url('https://lh3.googleusercontent.com/d/1Bi96pcjtaB_VZZf-k1ZoMHMYfHNsYEqK')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: 0, 
        transition: 'opacity 0.2s ease',
        willChange: 'transform',
        // Center the 10x10 image on the cursor tip
        marginTop: '-10px',
        marginLeft: '-10px'
      }}
    />
  );
};

export default CustomCursor;