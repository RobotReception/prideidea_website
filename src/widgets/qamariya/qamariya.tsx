import { useEffect, useId, useRef } from 'react'
import type { Glass } from '@/shared/content'
import { cn } from '@/shared/lib'
import { CAST, FRAME_PATH, PANES, VIEW } from './geometry'

const FILL: Record<Glass, string> = {
  amber: 'var(--c-amber)',
  ruby: 'var(--c-ruby)',
  turquoise: 'var(--c-turquoise)',
  clear: 'var(--q-clear)',
}

// Deterministic "raw data" colours for the first half of the animation.
const RAW_SEQUENCE: Glass[] = ['ruby', 'clear', 'amber', 'turquoise', 'amber', 'clear', 'ruby']
const rawFor = (i: number): Glass => RAW_SEQUENCE[(i * 5 + 3) % RAW_SEQUENCE.length] ?? 'clear'

const BEAM_START = 250
const BEAM_DURATION = 1300
const SORT_START = 1850
const SORT_STAGGER = 45
const SORT_DURATION = 240

/**
 * The qamariya: the site's single signature element.
 *
 * Motion (once, on load): light crosses the window from the top-right, the
 * panes catch scattered colour (raw data), then settle into an ordered
 * pattern whose light falls on the floor (organised intelligence).
 * Without motion the final, ordered state is shown directly.
 */
export function Qamariya({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const clipId = useId()
  const beamGradId = useId()

  useEffect(() => {
    const svg = ref.current
    if (!svg || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (typeof svg.animate !== 'function') return

    const animations: Animation[] = []
    const panes = svg.querySelectorAll<SVGPathElement>('[data-pane]')
    // Reading order for the sort: right-to-left, top-to-bottom.
    const order = [...panes].sort(
      (a, b) =>
        Number(a.dataset.cy) - Number(b.dataset.cy) || Number(b.dataset.cx) - Number(a.dataset.cx),
    )

    panes.forEach((pane, i) => {
      const cx = Number(pane.dataset.cx)
      const cy = Number(pane.dataset.cy)
      const final = FILL[pane.dataset.final as Glass]
      const raw = FILL[rawFor(i)]
      // The beam is slanted, so it reaches the top of the window earlier.
      const progress = (VIEW.width - cx + cy * 0.35) / (VIEW.width + VIEW.height * 0.35)
      const tRaw = BEAM_START + progress * BEAM_DURATION
      const tSort = SORT_START + order.indexOf(pane) * SORT_STAGGER
      const total = tSort + SORT_DURATION
      animations.push(
        pane.animate(
          [
            { fill: FILL.clear, offset: 0 },
            { fill: FILL.clear, offset: tRaw / total },
            { fill: raw, offset: Math.min((tRaw + 220) / total, tSort / total) },
            { fill: raw, offset: tSort / total },
            { fill: final, offset: 1 },
          ],
          { duration: total, easing: 'ease-out', fill: 'forwards' },
        ),
      )
    })

    const beam = svg.querySelector<SVGGElement>('[data-beam]')
    if (beam) {
      animations.push(
        beam.animate(
          [
            { transform: 'translateX(300px)', opacity: 0 },
            { transform: 'translateX(220px)', opacity: 1, offset: 0.12 },
            { transform: 'translateX(-260px)', opacity: 1, offset: 0.88 },
            { transform: 'translateX(-340px)', opacity: 0 },
          ],
          {
            duration: BEAM_DURATION + 300,
            delay: BEAM_START - 150,
            easing: 'cubic-bezier(.45,0,.3,1)',
            fill: 'both',
          },
        ),
      )
    }

    const castStart = SORT_START + PANES.length * SORT_STAGGER
    svg.querySelectorAll<SVGPathElement>('[data-cast]').forEach((cast) =>
      animations.push(
        cast.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 700,
          delay: castStart,
          easing: 'ease-out',
          fill: 'both',
        }),
      ),
    )

    return () => animations.forEach((a) => a.cancel())
  }, [])

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
      role="img"
      aria-label="نافذة قمرية صنعانية يعبرها الضوء فيتحول إلى نمط ملوّن منتظم"
      className={cn('qamariya block h-auto w-full overflow-visible', className)}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={FRAME_PATH} />
        </clipPath>
        <linearGradient id={beamGradId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Floor: the ordered light cast by the lower row. */}
      <g className="q-cast">
        {CAST.filter((c) => c.glass !== 'clear').map((c) => (
          <path key={c.id} data-cast="" d={c.d} fill={FILL[c.glass]} fillOpacity={0.24} />
        ))}
      </g>

      {/* Frame (the white of the mullions). */}
      <path d={FRAME_PATH} fill="var(--c-white)" stroke="var(--c-ink)" strokeWidth={2} />

      {PANES.map((p) => (
        <path
          key={p.id}
          data-pane=""
          data-cx={p.cx.toFixed(1)}
          data-cy={p.cy.toFixed(1)}
          data-final={p.final}
          className="q-pane"
          d={p.d}
          fill={FILL[p.final]}
          stroke="var(--c-ink)"
          strokeWidth={1.25}
          strokeLinejoin="round"
        />
      ))}

      {/* The passing light, clipped to the window. */}
      <g clipPath={`url(#${clipId})`} style={{ mixBlendMode: 'screen' }}>
        <g data-beam="" className="q-beam" style={{ opacity: 0 }}>
          <rect
            x={120}
            y={-260}
            width={70}
            height={1100}
            fill={`url(#${beamGradId})`}
            transform="rotate(32 155 290)"
          />
        </g>
      </g>
    </svg>
  )
}
