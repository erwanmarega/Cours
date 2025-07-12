"use client"

import { Globe } from "@/components/ui/globe"
import { motion } from "framer-motion"
import { Book, Atom, Globe as GlobeIcon } from "lucide-react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export default function Dashboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const beamsRef = useRef<Beam[]>([])
  const animationFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)

      beamsRef.current = Array.from({ length: 30 }, () =>
        createBeam(canvas.width, canvas.height)
      )
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.filter = "blur(35px)"
      beamsRef.current.forEach((beam, index) => {
        beam.y -= beam.speed
        beam.pulse += beam.pulseSpeed
        if (beam.y + beam.length < -100) {
          beamsRef.current[index] = createBeam(canvas.width, canvas.height)
        }
        drawBeam(ctx, beam)
      })
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-sans">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ filter: "blur(15px)" }} />
      <motion.div
        className="absolute inset-0 z-0 bg-neutral-900/10"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
        style={{ backdropFilter: "blur(50px)" }}
      />

      <main className="relative z-10 px-6 py-10">
        {/* Header */}
        <header className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white">Bienvenue 👋</h1>
            <p className="text-gray-400 mt-2 text-base">Explore les matières ou le globe interactif.</p>
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shadow-md">
            <img src="/avatar.png" alt="User Avatar" className="object-cover w-full h-full" />
          </div>
        </header>

        {/* Subject Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <SubjectCard
            title="Mathématiques"
            description="Algèbre, géométrie, probabilités"
            icon={<Book className="w-7 h-7 text-white" />}
            bg="bg-gradient-to-br from-blue-600 to-cyan-500"
          />
          <SubjectCard
            title="Physique"
            description="Mécanique, ondes, électricité"
            icon={<Atom className="w-7 h-7 text-white" />}
            bg="bg-gradient-to-br from-indigo-600 to-purple-600"
          />
          <SubjectCard
            title="Espace"
            description="Planètes, étoiles, cosmologie"
            icon={<GlobeIcon className="w-7 h-7 text-white" />}
            bg="bg-gradient-to-br from-pink-500 to-yellow-400"
          />
        </section>

        {/* Globe Card */}
        <section className="relative bg-black rounded-3xl border border-white/20 shadow-xl px-6 py-10 overflow-hidden min-h-[500px]">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0"
            style={{ filter: "blur(15px)" }}
          />
          <motion.div
            className="absolute inset-0 z-0 bg-neutral-900/10"
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
            style={{ backdropFilter: "blur(50px)" }}
          />

          <h2 className="relative z-10 text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            🌍 Quiz de Géographie
          </h2>

          <div className="relative z-10 flex items-center justify-center w-full">
            <div className="w-[80vw] sm:w-[60vw] md:w-[500px] lg:w-[600px] xl:w-[700px] aspect-square">
              <Globe className="w-full h-full" />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent z-0" />
        </section>
      </main>
    </div>
  )
}

function SubjectCard({
  title,
  description,
  icon,
  bg,
}: {
  title: string
  description: string
  icon: React.ReactNode
  bg: string
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 160, damping: 18 }}
      className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md p-6 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300"
    >
      <div className={`absolute -top-5 -right-5 rounded-full p-3 ${bg} shadow-lg group-hover:scale-110 transition-transform`}>
        {icon}
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-300 mb-4">{description}</p>
      <button className="text-sm font-medium text-cyan-400 hover:underline">Commencer →</button>
    </motion.div>
  )
}

// --- BEAM UTILS ---

interface Beam {
  x: number
  y: number
  width: number
  length: number
  angle: number
  speed: number
  opacity: number
  hue: number
  pulse: number
  pulseSpeed: number
}

function createBeam(width: number, height: number): Beam {
  const angle = -35 + Math.random() * 10
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.12 + Math.random() * 0.16,
    hue: 190 + Math.random() * 70,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  }
}

function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
  ctx.save()
  ctx.translate(beam.x, beam.y)
  ctx.rotate((beam.angle * Math.PI) / 180)

  const pulsingOpacity =
    beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2)

  const gradient = ctx.createLinearGradient(0, 0, 0, beam.length)
  gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 65%, 0)`)
  gradient.addColorStop(0.1, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`)
  gradient.addColorStop(0.4, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`)
  gradient.addColorStop(0.6, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`)
  gradient.addColorStop(0.9, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`)
  gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 65%, 0)`)

  ctx.fillStyle = gradient
  ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length)
  ctx.restore()
}
