import { PANES, VIEW } from './geometry'

describe('qamariya geometry', () => {
  it('has a hub, seven fan panes and a 2×4 grid', () => {
    expect(PANES.filter((p) => p.id === 'hub')).toHaveLength(1)
    expect(PANES.filter((p) => p.id.startsWith('fan-'))).toHaveLength(7)
    expect(PANES.filter((p) => p.id.startsWith('grid-'))).toHaveLength(8)
  })

  it('keeps every pane inside the view box', () => {
    for (const p of PANES) {
      expect(p.cx).toBeGreaterThan(0)
      expect(p.cx).toBeLessThan(VIEW.width)
      expect(p.cy).toBeGreaterThan(0)
      expect(p.cy).toBeLessThan(VIEW.height)
    }
  })
})
