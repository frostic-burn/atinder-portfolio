"use client"

import { useMemo, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface BlurTextProps {
    text?: string
    delay?: number
    className?: string
    animateBy?: "words" | "letters"
    direction?: "top" | "bottom" | "left" | "right"
    threshold?: number
    rootMargin?: string
    animationFrom?: Record<string, string | number>
    animationTo?: Record<string, string | number>
    onAnimationComplete?: () => void
    children?: React.ReactNode
}

export default function BlurText({
    text,
    delay = 100,
    className = "",
    animateBy = "words",
    direction = "bottom",
    threshold = 0.1,
    rootMargin = "-50px",
    animationFrom,
    animationTo,
    onAnimationComplete,
    children,
}: BlurTextProps) {
    const ref = useRef<HTMLParagraphElement>(null)
    const isInView = useInView(ref, {
        once: true,
        margin: rootMargin as `${number}px`,
        amount: threshold,
    })

    const displayText = text ?? (typeof children === "string" ? children : "")

    const defaultFrom = useMemo(() => {
        const directionMap: Record<string, Record<string, string | number>> = {
            top: { opacity: 0, filter: "blur(10px)", y: -30 },
            bottom: { opacity: 0, filter: "blur(10px)", y: 30 },
            left: { opacity: 0, filter: "blur(10px)", x: -30 },
            right: { opacity: 0, filter: "blur(10px)", x: 30 },
        }
        return directionMap[direction] || directionMap.bottom
    }, [direction])

    const defaultTo = { opacity: 1, filter: "blur(0px)", y: 0, x: 0 }

    const fromValues = animationFrom || defaultFrom
    const toValues = animationTo || defaultTo

    const elements = useMemo(() => {
        if (animateBy === "words") {
            return displayText.split(" ").map((word, i) => ({
                content: word,
                key: `word-${i}`,
                needsSpace: i < displayText.split(" ").length - 1,
            }))
        }
        return displayText.split("").map((char, i) => ({
            content: char === " " ? "\u00A0" : char,
            key: `char-${i}`,
            needsSpace: false,
        }))
    }, [displayText, animateBy])

    return (
        <p ref={ref} className={`blur-text-wrapper inline-flex flex-wrap ${className}`}>
            {elements.map(({ content, key, needsSpace }, index) => (
                <motion.span
                    key={key}
                    initial={fromValues}
                    animate={isInView ? toValues : fromValues}
                    transition={{
                        duration: 0.5,
                        delay: index * (delay / 1000),
                        ease: [0.215, 0.61, 0.355, 1],
                    }}
                    onAnimationComplete={
                        index === elements.length - 1 ? onAnimationComplete : undefined
                    }
                    style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
                >
                    {content}
                    {needsSpace && "\u00A0"}
                </motion.span>
            ))}
        </p>
    )
}
