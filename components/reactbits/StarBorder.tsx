"use client"

import React from "react"

interface StarBorderProps {
    as?: React.ElementType
    className?: string
    color?: string
    speed?: string
    children: React.ReactNode
    [key: string]: unknown
}

export default function StarBorder({
    as: Component = "div",
    className = "",
    color = "white",
    speed = "6s",
    children,
    ...rest
}: StarBorderProps) {
    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
          @keyframes star-border-rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .star-border-container {
            position: relative;
            border-radius: 1rem;
            overflow: hidden;
          }
          .star-border-container::before {
            content: '';
            position: absolute;
            inset: -100%;
            background: conic-gradient(
              from 0deg,
              transparent 0%,
              var(--star-color, white) 5%,
              transparent 10%,
              transparent 40%,
              var(--star-color, white) 45%,
              transparent 50%,
              transparent 85%,
              var(--star-color, white) 90%,
              transparent 95%
            );
            animation: star-border-rotate var(--star-speed, 6s) linear infinite;
            z-index: 0;
          }
          .star-border-inner {
            position: relative;
            z-index: 1;
            margin: 1.5px;
            border-radius: calc(1rem - 1.5px);
            background: linear-gradient(145deg, rgba(15, 15, 15, 0.95), rgba(5, 5, 5, 0.98));
          }
        `,
                }}
            />
            <Component
                className={`star-border-container ${className}`}
                style={
                    {
                        "--star-color": color,
                        "--star-speed": speed,
                    } as React.CSSProperties
                }
                {...rest}
            >
                <div className="star-border-inner">{children}</div>
            </Component>
        </>
    )
}
