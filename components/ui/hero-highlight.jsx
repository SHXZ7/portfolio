"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate, useSpring, useScroll, useTransform } from "framer-motion";

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Buttery-smooth spring-physics trail for the cursor radial reveal glow
  const smoothMouseX = useSpring(mouseX, { stiffness: 90, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 90, damping: 20 });

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const dotPattern = (color) => ({
    backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
    backgroundSize: '16px 16px',
  });

  return (
    <div
      className={cn(
        "relative min-h-[30rem] flex items-center justify-center w-full group overflow-hidden rounded-3xl",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20" 
        style={dotPattern('rgb(142 196 56)')} // Brand moss-green dots
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          ...dotPattern('rgb(200 255 92)'), // Brand neon-lime dots
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              250px circle at ${smoothMouseX}px ${smoothMouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              250px circle at ${smoothMouseX}px ${smoothMouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />

      <div className={cn("relative z-20 w-full", className)}>{children}</div>
    </div>
  );
};

export const Highlight = ({
  children,
  className,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';
  const ref = React.useRef(null);

  // Track the scroll coordinate of the highlighted text as it crosses the viewport center
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 45%"],
  });

  // Inertial spring coordinate to smooth out stepped mousewheel ticks
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    restDelta: 0.001,
  });

  // Map progress directly to horizontal background-size reveal
  const backgroundSize = useTransform(smoothProgress, [0, 1], ["0% 100%", "100% 100%"]);

  // Smooth color morphing: Starts unified with standard text, morphs to black/moss-green as highlight sweeps
  const textColor = useTransform(
    smoothProgress,
    [0, 0.75], // Completes color transition early for excellent readability
    isDark
      ? ["rgba(255, 255, 255, 0.85)", "#000000"] // White -> Black in Dark Mode
      : ["rgba(15, 23, 42, 0.85)", "#142c00"]  // Dark Slate -> Moss Green in Light Mode
  );

  return (
    <motion.span
      ref={ref}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
        backgroundSize: backgroundSize,
        color: textColor,
      }}
      className={cn(
        `relative inline pb-1.5 px-2 rounded-xl transition-colors duration-500 bg-gradient-to-r font-extrabold ${
          isDark 
            ? 'from-[#C8FF5C] to-[#a2e030] shadow-lg shadow-[#C8FF5C]/10' 
            : 'from-[#a2e030] to-[#8ec438] shadow-md shadow-[#a2e030]/10'
        }`,
        className
      )}
    >
      {children}
    </motion.span>
  );
};
