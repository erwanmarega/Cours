"use client"

import { Globe } from "@/components/ui/globe"
import { motion } from "framer-motion"
import { Book, Atom, Globe as GlobeIcon, BookText, Languages } from "lucide-react"
import type { COBEOptions } from "cobe"

export default function Dashboard() {
  const GLOBE_CONFIG_EARTH_COLORS: COBEOptions = {
    width: 800,
    height: 800,
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.3,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 3,
    baseColor: [0.2, 0.4, 1],
    markerColor: [0.8, 0.5, 0.1],
    glowColor: [0.1, 0.6, 1],
    markers: [],
    onRender: () => {},
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-sans">
      <main className="relative z-10 px-6 py-10">
        <header className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white">Bienvenue 👋</h1>
            <p className="text-gray-400 mt-2 text-base">Explore les matières ou le globe interactif.</p>
          </div>
        </header>

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
          <SubjectCard
            title="Français"
            description="Grammaire, conjugaison, vocabulaire"
            icon={<BookText className="w-7 h-7 text-white" />}
            bg="bg-gradient-to-br from-red-500 to-pink-600"
          />
          <SubjectCard
            title="Anglais"
            description="Compréhension, expression, culture"
            icon={<Languages className="w-7 h-7 text-white" />}
            bg="bg-gradient-to-br from-green-500 to-emerald-500"
          />
        </section>

        <section className="relative bg-gradient-to-br from-black via-neutral-900 to-black rounded-3xl border border-white/20 shadow-xl px-6 py-10 overflow-hidden">
  <div className="relative z-10 mb-8 text-center">
    <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-2">
      🌍 Quiz de Géographie
    </h2>
    <p className="mt-2 text-sm text-gray-400">
      Explore le monde avec le globe interactif.
    </p>
  </div>

  <div className="relative z-10 flex items-center justify-center">
    <div className="w-[80vw] sm:w-[60vw] md:w-[500px] lg:w-[600px] xl:w-[700px] aspect-square">
      <Globe className="w-full h-full" config={GLOBE_CONFIG_EARTH_COLORS} />
    </div>
  </div>

  <div className="relative z-10 mt-8 flex justify-center">
    <button className="px-6 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 transition text-white text-sm font-medium shadow-md">
      Lancer le quiz →
    </button>
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
