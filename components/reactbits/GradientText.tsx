"use client"

import React from "react"

interface GradientTextProps {
    children: React.ReactNode
    className?: string
    colors?: string[]
    animationSpeed?: number
    showBorder?: boolean
}

export default function GradientText({
    children,
    className = "",
    colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
    animationSpeed = 8,
    showBorder = false,
}: GradientTextProps) {
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        animationDuration: `${animationSpeed}s`,
    }

    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
          @keyframes gradient-text-flow {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
          .gradient-text-animated {
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradient-text-flow var(--gradient-speed, 8s) linear infinite;
          }
          .gradient-text-border {
            display: inline-block;
            position: relative;
            padding: 0.25rem 0.5rem;
          }
          .gradient-text-border::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 9999px;
            padding: 1.5px;
            background: linear-gradient(to right, var(--gradient-colors));
            background-size: 200% auto;
            animation: gradient-text-flow var(--gradient-speed, 8s) linear infinite;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
          }
        `,
                }}
            />
            <span
                className={`gradient-text-animated ${showBorder ? "gradient-text-border" : ""} ${className}`}
                style={{
                    ...gradientStyle,
                    "--gradient-speed": `${animationSpeed}s`,
                    "--gradient-colors": colors.join(", "),
                } as React.CSSProperties}
            >
                {children}
            </span>
        </>
    )
}
