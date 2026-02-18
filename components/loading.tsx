"use client"

import { useEffect, useState } from "react"

export default function Loading() {
  const [text, setText] = useState("loading assets...")

  useEffect(() => {
    const texts = ["loading assets...", "almost there..."]
    let index = 0

    const interval = setInterval(() => {
      setText(texts[index % texts.length])
      index++
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-white text-lg font-mono">{text}</div>
      </div>
    </div>
  )
}
