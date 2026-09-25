/**
 * Geometry of the qamariya: a half-circle arch split into a hub and a fan of
 * seven panes, above a rectangle of 2 × 4 panes. Everything is computed so
 * the mullions (gaps between panes) keep a constant width.
 */
import type { Glass } from '@/shared/content'

export const VIEW = { width: 360, height: 600 }

const M = 8 // mullion width
const LEFT = 10
const RIGHT = 350
const CX = 180
const SPRING = 180 // y where the arch meets the rectangle
const BOTTOM = 500
const R_OUT = 170
const R_HUB = 56
const FAN = 7

export type Pane = { id: string; d: string; cx: number; cy: number; final: Glass }

const pt = (r: number, a: number, cy: number) =>
  `${(CX + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`

/** Outer silhouette of the window (also used as the clip path for the light). */
export const FRAME_PATH = `M ${LEFT} ${BOTTOM} V ${SPRING} A ${R_OUT} ${R_OUT} 0 0 1 ${RIGHT} ${SPRING} V ${BOTTOM} Z`

// Symmetric, calm arrangement — the "organised" state.
const FAN_GLASS: Glass[] = ['turquoise', 'clear', 'amber', 'clear', 'amber', 'clear', 'turquoise']
const HUB_GLASS: Glass = 'ruby'
const GRID_GLASS: Glass[][] = [
  ['clear', 'clear', 'clear', 'clear'],
  ['clear', 'amber', 'amber', 'clear'],
]

function buildPanes(): Pane[] {
  const panes: Pane[] = []
  const archCy = SPRING - M / 2

  // Hub: half disc.
  const rh = R_HUB - M / 2
  panes.push({
    id: 'hub',
    d: `M ${CX - rh} ${archCy} A ${rh} ${rh} 0 0 1 ${CX + rh} ${archCy} Z`,
    cx: CX,
    cy: archCy - rh / 2,
    final: HUB_GLASS,
  })

  // Fan: annular sectors from 180° to 360°.
  const r1 = R_HUB + M / 2
  const r2 = R_OUT - M
  const step = Math.PI / FAN
  for (let i = 0; i < FAN; i++) {
    const a0 = Math.PI + i * step
    const a1 = a0 + step
    // Keep the mullion width constant along the radius.
    const g1 = M / 2 / r1
    const g2 = M / 2 / r2
    const s1 = i === 0 ? a0 : a0 + g1
    const e1 = i === FAN - 1 ? a1 : a1 - g1
    const s2 = i === 0 ? a0 : a0 + g2
    const e2 = i === FAN - 1 ? a1 : a1 - g2
    const mid = (a0 + a1) / 2
    const rm = (r1 + r2) / 2
    panes.push({
      id: `fan-${i}`,
      d: `M ${pt(r1, s1, archCy)} L ${pt(r2, s2, archCy)} A ${r2} ${r2} 0 0 1 ${pt(r2, e2, archCy)} L ${pt(r1, e1, archCy)} A ${r1} ${r1} 0 0 0 ${pt(r1, s1, archCy)} Z`,
      cx: CX + rm * Math.cos(mid),
      cy: archCy + rm * Math.sin(mid),
      final: FAN_GLASS[i] ?? 'clear',
    })
  }

  // Grid: 2 rows × 4 columns.
  const x0 = LEFT + M
  const x1 = RIGHT - M
  const y0 = SPRING + M / 2
  const y1 = BOTTOM - M
  const w = (x1 - x0 - M * 3) / 4
  const h = (y1 - y0 - M) / 2
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      const x = x0 + col * (w + M)
      const y = y0 + row * (h + M)
      panes.push({
        id: `grid-${row}-${col}`,
        d: `M ${x} ${y} h ${w} v ${h} h ${-w} Z`,
        cx: x + w / 2,
        cy: y + h / 2,
        final: GRID_GLASS[row]?.[col] ?? 'clear',
      })
    }
  }
  return panes
}

export const PANES = buildPanes()

/** Light cast on the floor by the lower row, falling away from the sun (top-right). */
export const CAST = (() => {
  const x0 = LEFT + M
  const w = (RIGHT - M - x0 - M * 3) / 4
  const top = BOTTOM + 4
  const depth = 76
  const shift = -54
  return (GRID_GLASS[1] ?? []).map((glass, col) => {
    const x = x0 + col * (w + M)
    return {
      id: `cast-${col}`,
      glass,
      d: `M ${x} ${top} h ${w} l ${shift} ${depth} h ${-w} Z`,
    }
  })
})()
