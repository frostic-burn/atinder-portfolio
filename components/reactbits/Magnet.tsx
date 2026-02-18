"use client"

import React, { useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"

interface MagnetProps {
    children: React.ReactNode
    padding?: number
    disabled?: boolean
    magnetStrength?: number
    activeTransition?: {
        type?: string
        stiffness?: number
        damping?: number
        mass?: number
    }
    inactiveTransition?: {
        type?: string
        stiffness?: number
        damping?: number
        mass?: number
    }
    className?: string
}

export default function Magnet({
    children,
    padding = 50,
    disabled = false,
    magnetStrength = 2,
    activeTransition = { type: "spring", stiffness: 200, damping: 20, mass: 0.5 },
    inactiveTransition = { type: "spring", stiffness: 300, damping: 25, mass: 0.8 },
    className = "",
}: MagnetProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (disabled || !ref.current) return

            const { clientX, clientY } = e
            const { left, top, width, height } = ref.current.getBoundingClientRect()

            const centerX = left + width / 2
            const centerY = top + height / 2

            const deltaX = (clientX - centerX) / magnetStrength
            const deltaY = (clientY - centerY) / magnetStrength

            setPosition({ x: deltaX, y: deltaY })
        },
        [disabled, magnetStrength]
    )

    const handleMouseEnter = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (disabled || !ref.current) return

            const { clientX, clientY } = e
            const { left, top, width, height } = ref.current.getBoundingClientRect()

            const expandedLeft = left - padding
            const expandedTop = top - padding
            const expandedWidth = width + padding * 2
            const expandedHeight = height + padding * 2

            if (
                clientX >= expandedLeft &&
                clientX <= expandedLeft + expandedWidth &&
                clientY >= expandedTop &&
                clientY <= expandedTop + expandedHeight
            ) {
                setIsHovered(true)
            }
        },
        [disabled, padding]
    )

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false)
        setPosition({ x: 0, y: 0 })
    }, [])

    return (
        <motion.div
            ref={ref}
            className={`inline-block ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            animate={{
                x: position.x,
                y: position.y,
            }}
            transition={isHovered ? activeTransition : inactiveTransition}
            style={{ willChange: "transform" }}
        >
            {children}
        </motion.div>
    )
}
