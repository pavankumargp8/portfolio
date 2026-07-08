import { useEffect, useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Simple cn utility to avoid path aliasing issues
const cn = (...classes) => classes.filter(Boolean).join(' ');

const defaultWords = ["LOADING", "COMPUTING", "SEARCHING", "RETRIEVING", "ASSEMBLING"];

// Memoized Letter component for performance
const Letter = memo(function Letter({ char, letterDuration }) {
    return (
        <motion.span
            style={{ transformStyle: "preserve-3d" }}
            variants={{
                initial: {
                    rotateX: 90,
                    y: 15,
                    opacity: 0,
                    filter: "blur(4px)",
                },
                animate: {
                    rotateX: 0,
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    transition: {
                        duration: letterDuration,
                        ease: [0.2, 0.65, 0.3, 0.9],
                    },
                },
                exit: {
                    rotateX: -90,
                    y: -15,
                    opacity: 0,
                    filter: "blur(4px)",
                    transition: {
                        duration: letterDuration * 0.67,
                        ease: "easeIn",
                    },
                },
            }}
            className="inline-block"
        >
            {char === ' ' ? '\u00A0' : char}
        </motion.span>
    );
});

// Memoized Word component for performance
const Word = memo(function Word({
    text,
    staggerDelay,
    exitStaggerDelay,
    letterDuration,
    textClassName
}) {
    const letters = useMemo(() => text.split(""), [text]);

    return (
        <motion.div
            className={cn(
                "flex gap-[0.02em] text-2xl md:text-3xl font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-100",
                textClassName
            )}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
                initial: { opacity: 1 },
                animate: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
                exit: {
                    opacity: 1,
                    transition: {
                        staggerChildren: exitStaggerDelay,
                    },
                },
            }}
        >
            {letters.map((char, i) => (
                <Letter
                    key={`${char}-${i}`}
                    char={char}
                    letterDuration={letterDuration}
                />
            ))}
        </motion.div>
    );
});

export function FlipFadeText({
    words = defaultWords,
    interval = 2200,
    className,
    textClassName,
    letterDuration = 0.5,
    staggerDelay = 0.05,
    exitStaggerDelay = 0.03,
}) {
    const [index, setIndex] = useState(0);

    const updateIndex = useCallback(() => {
        setIndex((prev) => (prev + 1) % words.length);
    }, [words.length]);

    useEffect(() => {
        const timer = setInterval(updateIndex, interval);
        return () => clearInterval(timer);
    }, [updateIndex, interval]);

    const currentWord = useMemo(() => words[index], [words, index]);

    return (
        <div className={cn("flex items-center justify-start min-h-[50px]", className)}>
            <div className="relative flex items-center justify-start" style={{ perspective: "1000px" }}>
                <AnimatePresence mode="wait">
                    <Word
                        key={currentWord}
                        text={currentWord}
                        staggerDelay={staggerDelay}
                        exitStaggerDelay={exitStaggerDelay}
                        letterDuration={letterDuration}
                        textClassName={textClassName}
                    />
                </AnimatePresence>
            </div>
        </div>
    );
}

export default FlipFadeText;
