"use client"

import { useMemo, useRef, useCallback, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

interface SplitTextProps {
  text?: string
  className?: string
  delay?: number
  animationFrom?: Record<string, string | number>
  animationTo?: Record<string, string | number>
  easing?: string
  threshold?: number
  rootMargin?: string
  textAlign?: "left" | "center" | "right"
  onLetterAnimationComplete?: () => void
  children?: React.ReactNode
}

export default function SplitText({
  text,
  className = "",
  delay = 50,
  animationFrom = { opacity: 0, transform: "translate3d(0,40px,0)" },
  animationTo = { opacity: 1, transform: "translate3d(0,0,0)" },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
  children,
}: SplitTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, {
    once: true,
    margin: rootMargin as `${number}px`,
    amount: threshold,
  })
  const [completedCount, setCompletedCount] = useState(0)

  const displayText = text ?? (typeof children === "string" ? children : "")

  const letters = useMemo(() => {
    const result: { char: string; key: string }[] = []
    displayText.split("").forEach((char, i) => {
      result.push({ char, key: `${char}-${i}` })
    })
    return result
  }, [displayText])

  const handleComplete = useCallback(() => {
    setCompletedCount((prev) => {
      const next = prev + 1
      if (next === letters.length && onLetterAnimationComplete) {
        onLetterAnimationComplete()
      }
      return next
    })
  }, [letters.length, onLetterAnimationComplete])

  return (
    <p
      ref={ref}
      className={`split-text-wrapper overflow-hidden inline ${className}`}
      style={{ textAlign, whiteSpace: "pre-wrap", wordWrap: "break-word" }}
    >
      {letters.map(({ char, key }, index) => (
        <motion.span
          key={key}
          initial={animationFrom}
          animate={isInView ? animationTo : animationFrom}
          transition={{
            duration: 0.5,
            delay: index * (delay / 1000),
            ease: [0.215, 0.61, 0.355, 1],
          }}
          onAnimationComplete={index === letters.length - 1 ? handleComplete : undefined}
          style={{ display: "inline-block", willChange: "transform, opacity" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </p>
  )
}
