'use client'

import { useEffect } from 'react'

export default function GradientCursor() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      // Calculate relative position (-1 to 1)
      const x = (clientX / innerWidth - 0.5) * 2
      const y = (clientY / innerHeight - 0.5) * 2

      // Move each gradient based on cursor position with different ranges and directions
      const gradients = [
        { id: 'gradient-1', x: 300, y: 300 },
        { id: 'gradient-2', x: -400, y: -350 },
        { id: 'gradient-3', x: 350, y: -300 },
        { id: 'gradient-4', x: -300, y: 400 },
        { id: 'gradient-5', x: 450, y: -250 },
      ]

      gradients.forEach(({ id, x: rangeX, y: rangeY }) => {
        const element = document.getElementById(id)
        if (element) {
          element.style.transform = `translate(${x * rangeX}px, ${y * rangeY}px)`
        }
      })
    }

    // Throttle the mouse move events
    let ticking = false
    const throttledMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleMouseMove(e)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('mousemove', throttledMouseMove)
    return () => window.removeEventListener('mousemove', throttledMouseMove)
  }, [])

  return null
} 