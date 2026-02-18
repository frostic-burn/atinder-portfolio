"use client"

import React from "react"

interface ShinyTextProps {
    children: React.ReactNode
    className?: string
    disabled?: boolean
    speed?: number
    shimmerWidth?: number
}

export default function ShinyText({
    children,
    className = "",
    disabled = false,
    speed = 5,
    shimmerWidth = 100,
}: ShinyTextProps) {
    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
          @keyframes shiny-text-shimmer {
            0%, 90%, 100% {
              background-position: calc(-100% - var(--shimmer-width)) 0;
            }
            30%, 60% {
              background-position: calc(100% + var(--shimmer-width)) 0;
            }
          }
          .shiny-text {
            color: #b4b4b4cc;
            background: linear-gradient(
              120deg,
              transparent 20%,
              rgba(255, 255, 255, 0.9) 40%,
              rgba(255, 255, 255, 0.95) 50%,
              rgba(255, 255, 255, 0.9) 60%,
              transparent 80%
            );
            background-size: var(--shimmer-width) 100%;
            -webkit-background-clip: text;
            background-clip: text;
            animation: shiny-text-shimmer var(--speed) ease-in-out infinite;
          }
          .shiny-text.disabled {
            animation: none;
          }
        `,
                }}
            />
            <span
                className={`shiny-text ${disabled ? "disabled" : ""} ${className}`}
                style={
                    {
                        "--speed": `${speed}s`,
                        "--shimmer-width": `${shimmerWidth}px`,
                    } as React.CSSProperties
                }
            >
                {children}
            </span>
        </>
    )
}
