import { motion, Variants } from 'motion/react';
import { useRef, useState, useEffect, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  duration?: number;
  once?: boolean;
}

function useScrollInView(once: boolean = true) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.1, rootMargin: '-60px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return { ref, inView };
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
  once = true,
}: ScrollRevealProps) {
  const { ref, inView } = useScrollInView(once);

  const variantMap: Record<string, { hidden: Variants['hidden']; visible: Variants['visible'] }> = {
    up:    { hidden: { opacity: 0, y: 40 },  visible: { opacity: 1, y: 0 } },
    down:  { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 50 },  visible: { opacity: 1, x: 0 } },
    fade:  { hidden: { opacity: 0 },          visible: { opacity: 1 } },
  };

  const { hidden, visible } = variantMap[direction];

  const variants: Variants = { hidden, visible };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered children reveal */
export function StaggerReveal({
  children,
  className = '',
  staggerDelay = 0.12,
  direction = 'up',
  duration = 0.55,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  duration?: number;
  once?: boolean;
}) {
  const { ref, inView } = useScrollInView(once);

  const directionMap: Record<string, Variants['hidden']> = {
    up:    { opacity: 0, y: 30 },
    down:  { opacity: 0, y: -30 },
    left:  { opacity: 0, x: -40 },
    right: { opacity: 0, x: 40 },
    fade:  { opacity: 0 },
  };

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: staggerDelay } },
  };

  const item: Variants = {
    hidden: directionMap[direction] as Record<string, number>,
    visible: { opacity: 1, y: 0, x: 0, transition: { duration, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {Array.isArray(children)
        ? (children as ReactNode[]).map((child, i) => (
            <motion.div key={i} variants={item}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={item}>{children}</motion.div>}
    </motion.div>
  );
}
