"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useInView } from "framer-motion"

interface DecryptedTextProps {
    text: string
    speed?: number
    maxIterations?: number
    characters?: string
    className?: string
    parentClassName?: string
    encryptedClassName?: string
    animateOn?: "view" | "hover"
    revealDirection?: "start" | "end" | "center"
    onAnimationComplete?: () => void
}

export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
    className = "",
    parentClassName = "",
    encryptedClassName = "",
    animateOn = "view",
    revealDirection = "start",
    onAnimationComplete,
}: DecryptedTextProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" as `${number}px` })
    const [displayText, setDisplayText] = useState(text)
    const [isAnimating, setIsAnimating] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)
    const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set())

    const getRandomChar = useCallback(() => {
        return characters[Math.floor(Math.random() * characters.length)]
    }, [characters])

    const animate = useCallback(() => {
        if (isAnimating) return
        setIsAnimating(true)
        setRevealedIndices(new Set())

        let iteration = 0
        const revealOrder: number[] = []

        for (let i = 0; i < text.length; i++) {
            if (revealDirection === "start") revealOrder.push(i)
            else if (revealDirection === "end") revealOrder.push(text.length - 1 - i)
            else {
                const mid = Math.floor(text.length / 2)
                if (i % 2 === 0) revealOrder.push(mid + Math.floor(i / 2))
                else revealOrder.push(mid - Math.ceil(i / 2))
            }
        }

        const interval = setInterval(() => {
            iteration++
            const charsToReveal = Math.floor((iteration / maxIterations) * text.length)

            const newRevealed = new Set<number>()
            for (let i = 0; i < charsToReveal && i < revealOrder.length; i++) {
                const idx = revealOrder[i]
                if (idx >= 0 && idx < text.length) {
                    newRevealed.add(idx)
                }
            }
            setRevealedIndices(new Set(newRevealed))

            setDisplayText(
                text
                    .split("")
                    .map((char, i) => {
                        if (char === " ") return " "
                        if (newRevealed.has(i)) return char
                        return getRandomChar()
                    })
                    .join("")
            )

            if (iteration >= maxIterations) {
                clearInterval(interval)
                setDisplayText(text)
                setRevealedIndices(new Set(text.split("").map((_, i) => i)))
                setIsAnimating(false)
                setHasAnimated(true)
                onAnimationComplete?.()
            }
        }, speed)

        return () => clearInterval(interval)
    }, [text, speed, maxIterations, characters, revealDirection, isAnimating, getRandomChar, onAnimationComplete])

    useEffect(() => {
        if (animateOn === "view" && isInView && !hasAnimated) {
            animate()
        }
    }, [isInView, animateOn, hasAnimated, animate])

    const handleHover = () => {
        if (animateOn === "hover") {
            animate()
        }
    }

    return (
        <motion.span
            ref={ref}
            className={`inline-block ${parentClassName}`}
            onMouseEnter={handleHover}
            initial={{ opacity: 0 }}
            animate={isInView || animateOn === "hover" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {displayText.split("").map((char, i) => (
                <span
                    key={i}
                    className={revealedIndices.has(i) ? className : `${className} ${encryptedClassName}`}
                    style={{
                        opacity: revealedIndices.has(i) ? 1 : 0.7,
                        color: revealedIndices.has(i) ? undefined : "#8b5cf6",
                        transition: "color 0.2s ease, opacity 0.2s ease",
                    }}
                >
                    {char}
                </span>
            ))}
        </motion.span>
    )
}
