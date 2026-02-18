"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ExternalLink, Github, X } from "lucide-react"
import "./Folder.css"

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex
  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("")
  }
  const num = Number.parseInt(color, 16)
  let r = (num >> 16) & 0xff
  let g = (num >> 8) & 0xff
  let b = num & 0xff
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))))
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))))
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))))
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
}

interface ProjectData {
  title: string
  description: string
  tags: string[]
  date: string
  demoUrl?: string
  githubUrl?: string
}

interface FolderProps {
  color?: string
  size?: number
  items?: ProjectData[]
  className?: string
}

const ProjectModal = ({ project, onClose }: { project: ProjectData; onClose: () => void }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <div className="project-modal" onClick={onClose}>
      <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="project-modal-close" onClick={onClose}>
          <X size={18} />
        </button>
        <h3>{project.title}</h3>
        <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "14px", marginBottom: "10px" }}>{project.date}</p>
        <p>{project.description}</p>
        <div className="project-modal-tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="project-modal-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="project-modal-links">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-modal-link">
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-modal-link secondary"
            >
              <Github size={16} />
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

const Folder = ({ color = "#5227FF", size = 0.35, items = [], className = "" }: FolderProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const maxItems = 4
  const projects = items.slice(0, maxItems)
  while (projects.length < maxItems) {
    projects.push({
      title: "Coming Soon",
      description: "New project in development",
      tags: ["TBA"],
      date: "TBA",
    })
  }

  const [open, setOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [paperOffsets, setPaperOffsets] = useState(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })))

  const folderBackColor = darkenColor(color, 0.08)
  const paper1 = darkenColor("#ffffff", 0.1)
  const paper2 = darkenColor("#ffffff", 0.05)
  const paper3 = "#ffffff"
  const paper4 = darkenColor("#ffffff", 0.02)

  // Create arc-like positions for the cards with better spacing
  const getCardPosition = (index: number) => {
    const positions = [
      { x: -230, y: -90, rotation: -12 },
      { x: -100, y: -115, rotation: -4 },
      { x: 10, y: -115, rotation: 4 },
      { x: 120, y: -90, rotation: 12 },
    ]

    return positions[index] || { x: 0, y: 0, rotation: 0 }
  }

  const handleClick = () => {
    setOpen((prev) => !prev)
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })))
    }
  }

  const handlePaperClick = (project: ProjectData, e: React.MouseEvent) => {
    e.stopPropagation()
    if (project.title !== "Coming Soon") {
      setSelectedProject(project)
    }
  }

  const handlePaperMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (!open) return
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const offsetX = (e.clientX - centerX) * 0.15
    const offsetY = (e.clientY - centerY) * 0.15
    setPaperOffsets((prev) => {
      const newOffsets = [...prev]
      newOffsets[index] = { x: offsetX, y: offsetY }
      return newOffsets
    })
  }

  const handlePaperMouseLeave = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    setPaperOffsets((prev) => {
      const newOffsets = [...prev]
      newOffsets[index] = { x: 0, y: 0 }
      return newOffsets
    })
  }

  const folderStyle = {
    "--folder-color": color,
    "--folder-back-color": folderBackColor,
    "--paper-1": paper1,
    "--paper-2": paper2,
    "--paper-3": paper3,
    "--paper-4": paper4,
  } as React.CSSProperties

  const folderClassName = `folder ${open ? "open" : ""}`.trim()
  const scaleStyle = { transform: `scale(${size})` }

  if (!mounted) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-white text-lg">Loading projects...</div>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-center items-center w-full">
        <div style={scaleStyle} className={className}>
          <div className={folderClassName} style={folderStyle} onClick={handleClick}>
            <div className="folder__back">
              {projects.map((project, i) => {
                const position = getCardPosition(i)
                return (
                  <div
                    key={i}
                    className={`paper paper-${i + 1}`}
                    onClick={(e) => handlePaperClick(project, e)}
                    onMouseMove={(e) => handlePaperMouseMove(e, i)}
                    onMouseLeave={(e) => handlePaperMouseLeave(e, i)}
                    style={
                      open
                        ? ({
                            "--magnet-x": `${paperOffsets[i]?.x || 0}px`,
                            "--magnet-y": `${paperOffsets[i]?.y || 0}px`,
                            transform: `translate(var(--magnet-x, 0), var(--magnet-y, 0)) translate(${position.x}%, ${position.y}%) rotateZ(${position.rotation}deg)`,
                          } as React.CSSProperties)
                        : {}
                    }
                  >
                    {project.title}
                    <div className="click-details">(click for details)</div>
                  </div>
                )
              })}
              <div className="folder__front">Click Here</div>
              <div className="folder__front right"></div>
            </div>
          </div>
        </div>
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </>
  )
}

export default Folder
