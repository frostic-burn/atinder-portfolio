"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Github, Linkedin, Calendar } from "lucide-react"

const GlitchText = ({
  children,
  text,
  speed = 1,
  enableShadows = true,
  enableOnHover = false,
  className = "",
}: {
  children: React.ReactNode
  text?: string
  speed?: number
  enableShadows?: boolean
  enableOnHover?: boolean
  className?: string
}) => {
  const inlineStyles = {
    "--after-duration": `${speed * 3}s`,
    "--before-duration": `${speed * 2}s`,
    "--after-shadow": enableShadows ? "-2px 0 red" : "none",
    "--before-shadow": enableShadows ? "2px 0 cyan" : "none",
  } as React.CSSProperties

  const hoverClass = enableOnHover ? "enable-on-hover" : ""

  const displayText = text ?? (typeof children === "string" ? children : "")

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .glitch {
            color: #fff;
            font-size: clamp(1rem, 2.5vw, 1.5rem);
            white-space: nowrap;
            font-weight: 900;
            position: relative;
            margin: 0;
            user-select: none;
            cursor: pointer;
          }
          .glitch::after,
          .glitch::before {
            content: attr(data-text);
            position: absolute;
            top: 0;
            color: #fff;
            background-color: transparent;
            overflow: hidden;
            clip-path: inset(0 0 0 0);
          }
          .glitch:not(.enable-on-hover)::after {
            left: 2px;
            text-shadow: var(--after-shadow, -2px 0 red);
            animation: animate-glitch var(--after-duration, 3s) infinite linear alternate-reverse;
          }
          .glitch:not(.enable-on-hover)::before {
            left: -2px;
            text-shadow: var(--before-shadow, 2px 0 cyan);
            animation: animate-glitch var(--before-duration, 2s) infinite linear alternate-reverse;
          }
          .glitch.enable-on-hover::after,
          .glitch.enable-on-hover::before {
            content: '';
            opacity: 0;
            animation: none;
          }
          .glitch.enable-on-hover:hover::after {
            content: attr(data-text);
            opacity: 1;
            left: 2px;
            text-shadow: var(--after-shadow, -2px 0 red);
            animation: animate-glitch var(--after-duration, 3s) infinite linear alternate-reverse;
          }
          .glitch.enable-on-hover:hover::before {
            content: attr(data-text);
            opacity: 1;
            left: -2px;
            text-shadow: var(--before-shadow, 2px 0 cyan);
            animation: animate-glitch var(--before-duration, 2s) infinite linear alternate-reverse;
          }
          @keyframes animate-glitch {
            0% { clip-path: inset(20% 0 50% 0); }
            5% { clip-path: inset(10% 0 60% 0); }
            10% { clip-path: inset(15% 0 55% 0); }
            15% { clip-path: inset(25% 0 35% 0); }
            20% { clip-path: inset(30% 0 40% 0); }
            25% { clip-path: inset(40% 0 20% 0); }
            30% { clip-path: inset(10% 0 60% 0); }
            35% { clip-path: inset(15% 0 55% 0); }
            40% { clip-path: inset(25% 0 35% 0); }
            45% { clip-path: inset(30% 0 40% 0); }
            50% { clip-path: inset(20% 0 50% 0); }
            55% { clip-path: inset(10% 0 60% 0); }
            60% { clip-path: inset(15% 0 55% 0); }
            65% { clip-path: inset(25% 0 35% 0); }
            70% { clip-path: inset(30% 0 40% 0); }
            75% { clip-path: inset(40% 0 20% 0); }
            80% { clip-path: inset(20% 0 50% 0); }
            85% { clip-path: inset(10% 0 60% 0); }
            90% { clip-path: inset(15% 0 55% 0); }
            95% { clip-path: inset(25% 0 35% 0); }
            100% { clip-path: inset(30% 0 40% 0); }
          }
        `,
        }}
      />
      <div className={`glitch ${hoverClass} ${className}`} style={inlineStyles} data-text={displayText}>
        {children}
      </div>
    </>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
  ]

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const elem = document.getElementById(targetId)
    elem?.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, rotate: 5 },
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md py-2 md:py-3" : "bg-transparent py-4 md:py-5"
        }`}
    >
      <div className="container mx-auto px-3 md:px-8 flex justify-between items-center">
        <button onClick={scrollToTop} className="flex items-center cursor-pointer flex-shrink-0">
          <GlitchText speed={2} enableShadows={true} text="Atinderpal Singh.">
            Atinderpal Singh<span className="text-red-500">.</span>
          </GlitchText>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 lg:space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors duration-300 relative group text-sm lg:text-base"
              onClick={(e) => scrollToSection(e, link.href)}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <motion.a
            href="mailto:atinderpaul16@gmail.com?subject=Let's%20Connect&body=Hi%20Atinder,"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300"
            aria-label="Schedule a meeting"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <Calendar size={20} />
          </motion.a>
          <motion.a
            href="https://github.com/frostic-burn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300"
            aria-label="GitHub"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <Github size={20} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/atinderpal-sing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300"
            aria-label="LinkedIn"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <Linkedin size={20} />
          </motion.a>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <motion.a
            href="mailto:atinderpaul16@gmail.com?subject=Let's%20Connect&body=Hi%20Atinderpal,"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300 p-1.5"
            aria-label="Schedule a meeting"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <Calendar size={18} />
          </motion.a>
          <motion.a
            href="https://github.com/frostic-burn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300 p-1.5"
            aria-label="GitHub"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <Github size={18} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/atinderpal-sing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-300 p-1.5"
            aria-label="LinkedIn"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
          >
            <Linkedin size={18} />
          </motion.a>
          <button
            className="text-white focus:outline-none p-1.5 ml-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="container mx-auto px-4 py-3"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white py-2.5 px-4 transition-colors duration-300 text-base block"
                    onClick={(e) => scrollToSection(e, link.href)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
