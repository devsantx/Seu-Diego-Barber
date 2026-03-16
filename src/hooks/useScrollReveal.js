import { useEffect, useRef, useState } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px 0px -60px 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

export function useActiveSection(sections) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observers = []

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [sections])

  return activeSection
}
