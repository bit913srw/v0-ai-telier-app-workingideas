"use client"

import { useState, useCallback } from "react"
import { RefreshCw } from "lucide-react"

const IDEA_POOLS: string[][] = [
  [
    "A floor-length coat in raw silk with hand-painted chrysanthemum motifs along the hemline.",
    "Deconstructed corsetry in ivory duchesse satin, exposed boning reimagined as sculptural embellishment.",
    "Oversized trousers in washed linen, cinched with a leather obi belt dyed in indigo.",
    "A cape-sleeve evening gown in midnight velvet with constellation-mapped beading.",
    "Tailored vest in herringbone tweed, cut asymmetrically with a single draped lapel.",
    "Layered organza skirt in gradient blush tones, each tier hand-frayed at the edge.",
  ],
  [
    "Menswear-inspired blazer in chalk-stripe flannel, softened with rounded shoulders and a cropped hem.",
    "A slip dress in hammered copper silk with chain-mail straps drawn from medieval armour.",
    "Quilted kimono jacket in recycled cashmere patchwork, each square a different archive fabric.",
    "Wide-leg jumpsuit in graphite wool crepe, anchored by an oversized tortoiseshell buckle at the waist.",
    "Sheer pleated blouse in seafoam chiffon, collar embroidered with seed pearls and glass beads.",
    "A cocoon coat in double-faced camel hair, reversible to reveal a crimson silk lining.",
  ],
  [
    "Sculptural shoulder wrap in felted merino, molded into origami-fold geometry.",
    "Column gown in matte jersey with a single spiraling seam from neckline to hem.",
    "Cropped bomber in distressed gold leather, lined with vintage floral Liberty print.",
    "High-waisted palazzo pants in heavy crepe, paired with a bandeau in matching deadstock fabric.",
    "Opera coat in jacquard brocade featuring oversized pomegranate and vine motifs.",
    "Draped halter top in liquid satin, the neckline secured by a single hand-forged brass ring.",
  ],
  [
    "A tunic dress in raw denim, laser-cut with geometric lattice patterns revealing silk underneath.",
    "Tailored culottes in tobacco suede with topstitching inspired by saddle-making techniques.",
    "Featherweight trench in translucent PVC bonded to organic cotton voile.",
    "Gathered midi skirt in hand-block-printed cotton, the pattern derived from Art Nouveau ironwork.",
    "Cropped mandarin-collar jacket in noir bouclé with jet button closures.",
    "A bias-cut negligee reimagined as eveningwear in pewter charmeuse with lace insets at the seams.",
  ],
]

interface AiMuseProps {
  onAddToNotes: (idea: string) => void
}

export function AiMuse({ onAddToNotes }: AiMuseProps) {
  const [poolIndex, setPoolIndex] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const ideas = IDEA_POOLS[poolIndex]

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    setExpandedIndex(null)
    setTimeout(() => {
      setPoolIndex((prev) => (prev + 1) % IDEA_POOLS.length)
      setIsRefreshing(false)
    }, 400)
  }, [])

  const handleCardClick = useCallback((index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index))
  }, [])

  return (
    <section className="flex flex-col gap-4">
      {/* Section header */}
      <div className="flex flex-col gap-2">
        <div className="h-px bg-primary/40" />
        <h2 className="font-sans text-xs font-bold text-primary uppercase tracking-[0.3em]">
          AI Muse
        </h2>
      </div>

      {/* Ideas grid */}
      <div
        className={`grid grid-cols-2 md:grid-cols-3 gap-3 transition-opacity duration-300 ${
          isRefreshing ? "opacity-0" : "opacity-100"
        }`}
      >
        {ideas.map((idea, index) => (
          <div key={`${poolIndex}-${index}`} className="flex flex-col">
            <button
              onClick={() => handleCardClick(index)}
              className={`group text-left bg-card border border-primary/25 p-3.5 transition-all duration-200 hover:border-primary/60 flex-1 ${
                expandedIndex === index
                  ? "border-primary/60 shadow-sm"
                  : ""
              }`}
              aria-label={`AI design idea ${index + 1}`}
            >
              <p
                className={`font-sans text-xs italic text-foreground/80 leading-relaxed ${
                  expandedIndex === index ? "" : "line-clamp-3"
                }`}
              >
                {idea}
              </p>
            </button>

            {expandedIndex === index && (
              <button
                onClick={() => onAddToNotes(idea)}
                className="mt-1.5 self-end text-primary font-sans text-[10px] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
              >
                + Add to notes
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Refresh button */}
      <div className="flex justify-end">
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 text-primary font-sans text-xs uppercase tracking-[0.2em] hover:opacity-70 transition-opacity disabled:opacity-40"
          aria-label="Refresh AI ideas"
        >
          <span>Refresh</span>
          <RefreshCw
            className={`w-3 h-3 ${isRefreshing ? "animate-spin" : ""}`}
            strokeWidth={1.5}
          />
        </button>
      </div>
    </section>
  )
}
