import { useEffect, useRef, useCallback, useMemo } from "react"

const DEFAULT_BEHIND_GRADIENT =
  "radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)"

const DEFAULT_INNER_GRADIENT = "linear-gradient(145deg,#1a1a1a 0%,#000000 100%)"

const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 300,
  INITIAL_DURATION: 800,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
}

const clamp = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max)

const round = (value, precision = 3) => Number.parseFloat(value.toFixed(precision))

const adjust = (value, fromMin, fromMax, toMin, toMax) =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin))

const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

const ProfileCard = ({
  avatarUrl = "https://ik.imagekit.io/cacl2snorter/WhatsApp%20Image%202025-07-13%20at%2021.02.00_d76b459d.webp?updatedAt=1752421638768",
  iconUrl = "https://ik.imagekit.io/cacl2snorter/iconpattern.png?updatedAt=1752350966495",
  grainUrl = "https://ik.imagekit.io/cacl2snorter/grain.webp?updatedAt=1752351421172",
  behindGradient,
  innerGradient,
  showBehindGradient = true,
  className = "",
  enableTilt = true,
  name = "Atinderpal Singh(hover)",
  title = "dev",
}) => {
  const wrapRef = useRef(null)
  const cardRef = useRef(null)
  const rafRef = useRef(null)

  const animationHandlers = useMemo(() => {
    if (!enableTilt) return null

    const updateCardTransform = (offsetX, offsetY, card, wrap) => {
      const width = card.clientWidth
      const height = card.clientHeight

      const percentX = clamp((100 / width) * offsetX)
      const percentY = clamp((100 / height) * offsetY)

      const centerX = percentX - 50
      const centerY = percentY - 50

      const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 6))}deg`,
        "--rotate-y": `${round(centerY / 6)}deg`,
      }

      Object.entries(properties).forEach(([property, value]) => {
        wrap.style.setProperty(property, value)
      })
    }

    const createSmoothAnimation = (duration, startX, startY, card, wrap) => {
      const startTime = performance.now()
      const targetX = wrap.clientWidth / 2
      const targetY = wrap.clientHeight / 2

      const animationLoop = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = clamp(elapsed / duration)
        const easedProgress = easeInOutCubic(progress)

        const currentX = adjust(easedProgress, 0, 1, startX, targetX)
        const currentY = adjust(easedProgress, 0, 1, startY, targetY)

        updateCardTransform(currentX, currentY, card, wrap)

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animationLoop)
        }
      }

      rafRef.current = requestAnimationFrame(animationLoop)
    }

    return {
      updateCardTransform,
      createSmoothAnimation,
      cancelAnimation: () => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
          rafRef.current = null
        }
      },
    }
  }, [enableTilt])

  const handlePointerMove = useCallback(
    (event) => {
      const card = cardRef.current
      const wrap = wrapRef.current

      if (!card || !wrap || !animationHandlers) return

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect()
        animationHandlers.updateCardTransform(event.clientX - rect.left, event.clientY - rect.top, card, wrap)
      })
    },
    [animationHandlers],
  )

  const handlePointerEnter = useCallback(() => {
    const card = cardRef.current
    const wrap = wrapRef.current

    if (!card || !wrap || !animationHandlers) return

    animationHandlers.cancelAnimation()
    wrap.classList.add("active")
    card.classList.add("active")
  }, [animationHandlers])

  const handlePointerLeave = useCallback(
    (event) => {
      const card = cardRef.current
      const wrap = wrapRef.current

      if (!card || !wrap || !animationHandlers) return

      animationHandlers.createSmoothAnimation(
        ANIMATION_CONFIG.SMOOTH_DURATION,
        event.offsetX,
        event.offsetY,
        card,
        wrap,
      )
      wrap.classList.remove("active")
      card.classList.remove("active")
    },
    [animationHandlers],
  )

  useEffect(() => {
    if (!enableTilt || !animationHandlers) return

    const card = cardRef.current
    const wrap = wrapRef.current

    if (!card || !wrap) return

    const pointerMoveHandler = handlePointerMove
    const pointerEnterHandler = handlePointerEnter
    const pointerLeaveHandler = handlePointerLeave

    card.addEventListener("pointerenter", pointerEnterHandler)
    card.addEventListener("pointermove", pointerMoveHandler)
    card.addEventListener("pointerleave", pointerLeaveHandler)

    const initialX = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET

    animationHandlers.updateCardTransform(initialX, initialY, card, wrap)
    animationHandlers.createSmoothAnimation(ANIMATION_CONFIG.INITIAL_DURATION, initialX, initialY, card, wrap)

    return () => {
      card.removeEventListener("pointerenter", pointerEnterHandler)
      card.removeEventListener("pointermove", pointerMoveHandler)
      card.removeEventListener("pointerleave", pointerLeaveHandler)
      animationHandlers.cancelAnimation()
    }
  }, [enableTilt, animationHandlers, handlePointerMove, handlePointerEnter, handlePointerLeave])

  const cardStyle = useMemo(
    () => ({
      "--icon": iconUrl ? `url(${iconUrl})` : "none",
      "--grain": grainUrl ? `url(${grainUrl})` : "none",
      "--behind-gradient": showBehindGradient ? (behindGradient ?? DEFAULT_BEHIND_GRADIENT) : "none",
      "--inner-gradient": innerGradient ?? DEFAULT_INNER_GRADIENT,
    }),
    [iconUrl, grainUrl, showBehindGradient, behindGradient, innerGradient],
  )

  return (
    <div className="w-full max-w-sm mx-auto">
      <style jsx>{`
        :root {
          --pointer-x: 50%;
          --pointer-y: 50%;
          --pointer-from-center: 0;
          --pointer-from-top: 0.5;
          --pointer-from-left: 0.5;
          --card-opacity: 0;
          --rotate-x: 0deg;
          --rotate-y: 0deg;
          --card-radius: 30px;
        }

        .pc-card-wrapper {
          perspective: 600px;
          position: relative;
          width: 100%;
          height: auto;
          max-width: 320px;
          margin: 0 auto;
        }

        .pc-card-wrapper::before {
          content: '';
          position: absolute;
          inset: -8px;
          background-image: var(--behind-gradient);
          border-radius: calc(var(--card-radius) + 8px);
          opacity: 0;
          transition: opacity 0.3s ease, filter 0.3s ease;
          filter: blur(20px);
          z-index: -1;
        }

        .pc-card-wrapper:hover::before,
        .pc-card-wrapper.active::before {
          opacity: 0.8;
          filter: blur(25px);
        }

        .pc-card-wrapper:hover,
        .pc-card-wrapper.active {
          --card-opacity: 1;
        }

        .pc-card {
          height: 80vh;
          max-height: 500px;
          width: 100%;
          aspect-ratio: 0.718;
          border-radius: var(--card-radius);
          position: relative;
          background-image: var(--behind-gradient);
          background-size: 100% 100%;
          background-position: 0 0;
          overflow: hidden;
          transition: transform 0.1s ease, box-shadow 0.3s ease;
          transform: rotateX(0deg) rotateY(0deg);
          box-shadow: 
            rgba(0, 0, 0, 0.3) 0 4px 12px,
            rgba(0, 0, 0, 0.1) 0 2px 4px;
        }

        .pc-card:hover,
        .pc-card.active {
          transform: rotateX(var(--rotate-y)) rotateY(var(--rotate-x));
          box-shadow: 
            rgba(0, 0, 0, 0.4) calc(var(--pointer-from-left) * 8px - 4px) calc(var(--pointer-from-top) * 16px - 8px) 24px,
            rgba(0, 0, 0, 0.2) 0 4px 8px;
        }

        .pc-inside {
          position: absolute;
          inset: 2px;
          background: var(--inner-gradient);
          border-radius: calc(var(--card-radius) - 2px);
          overflow: hidden;
        }

        .pc-icon-pattern {
          position: absolute;
          inset: 0;
          background-image: var(--icon);
          background-size: 80px 80px;
          background-repeat: repeat;
          background-position: calc(var(--pointer-x) * 0.5) calc(var(--pointer-y) * 0.5);
          opacity: 0.15;
          mix-blend-mode: overlay;
          z-index: 1;
          transition: opacity 0.3s ease, background-position 0.1s ease;
        }

        .pc-card:hover .pc-icon-pattern,
        .pc-card.active .pc-icon-pattern {
          opacity: 0.35;
          background-position: calc(var(--pointer-x) * 0.3) calc(var(--pointer-y) * 0.3);
        }

        .pc-grain-overlay {
          position: absolute;
          inset: 0;
          background-image: var(--grain);
          background-size: 200px 200px;
          background-repeat: repeat;
          background-position: calc(var(--pointer-x) * -0.2) calc(var(--pointer-y) * -0.2);
          opacity: 0.2;
          mix-blend-mode: overlay;
          z-index: 2;
          transition: opacity 0.3s ease, background-position 0.1s ease;
        }

        .pc-card:hover .pc-grain-overlay,
        .pc-card.active .pc-grain-overlay {
          opacity: 0.15;
          background-position: calc(var(--pointer-x) * -0.1) calc(var(--pointer-y) * -0.1);
        }

        .pc-glare {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            400px circle at var(--pointer-x) var(--pointer-y),
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.05) 30%,
            transparent 60%
          );
          z-index: 3;
          opacity: 0;
          transition: opacity 0.2s ease;
          mix-blend-mode: overlay;
        }

        .pc-card:hover .pc-glare,
        .pc-card.active .pc-glare {
          opacity: 1;
        }

        .pc-avatar-content {
          position: relative;
          height: 100%;
          overflow: hidden;
          z-index: 4;
        }

        .pc-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: grayscale(0) contrast(1.3) brightness(0.9);
          transition: filter 0.3s ease, transform 0.1s ease;
          transform: scale(1) translate(0, 0);
        }

        .pc-card:hover .pc-avatar,
        .pc-card.active .pc-avatar {
          filter: grayscale(0) contrast(1.1) brightness(1.1) saturate(1.2);
          transform: scale(1.02) translate(calc(var(--pointer-from-left) * -4px + 2px), calc(var(--pointer-from-top) * -4px + 2px));
        }

        .pc-content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          padding: 2rem 1rem;
          z-index: 5;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.3) 30%,
            transparent 100%
          );
          transform: translate(calc(var(--pointer-from-left) * -3px + 1.5px), calc(var(--pointer-from-top) * -3px + 1.5px));
          transition: transform 0.1s ease;
        }

        .pc-details h3 {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 700;
          margin: 0;
          color: #ffffff;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
          background: linear-gradient(135deg, #ffffff 0%, #e0e0ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .pc-details p {
          font-size: 1rem;
          font-weight: 500;
          margin: 0.5rem 0 0 0;
          color: #cccccc;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
          background: linear-gradient(135deg, #cccccc 0%, #9999cc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (max-width: 768px) {
          .pc-card-wrapper {
            max-width: 280px;
          }
          .pc-card {
            height: 70vh;
            max-height: 420px;
          }
          .pc-content {
            padding: 1.5rem 1rem;
          }
        }

        @media (max-width: 480px) {
          .pc-card-wrapper {
            max-width: 260px;
            perspective: none;
          }
          .pc-card {
            height: 60vh;
            max-height: 360px;
          }
          .pc-card:hover,
          .pc-card.active {
            transform: none;
          }
          .pc-content {
            padding: 1rem;
          }
        }
      `}</style>

      <div ref={wrapRef} className={`pc-card-wrapper ${className}`.trim()} style={cardStyle}>
        <div ref={cardRef} className="pc-card">
          <div className="pc-inside">
            <div className="pc-icon-pattern" />
            <div className="pc-grain-overlay" />
            <div className="pc-glare" />
            <div className="pc-avatar-content">
              <img
                className="pc-avatar"
                src={avatarUrl}
                alt={`${name} avatar`}
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = "none"
                }}
                
              />
            </div>
            <div className="pc-content">
              <div className="pc-details">
                <h3>{name}</h3>
                <p>{title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
