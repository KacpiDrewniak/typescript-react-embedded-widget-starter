export interface ThemeTokens {
  primary: string
  accent: string
  surface: string
  text: string
  muted: string
  border: string
  dot: string
}

export const DEFAULT_THEME: ThemeTokens = {
  primary: '#000000',
  accent: '#000000',
  surface: '#ffffff',
  text: '#000000',
  muted: '#666666',
  border: '#e5e5e5',
  dot: '#000000',
}

/** Paleta z samych odcieni niebieskiego — do przekazania w `theme` przy mount(). */
export const BLUE_THEME: ThemeTokens = {
  primary: '#084298',
  accent: '#1d5fbf',
  surface: '#f0f5fc',
  text: '#0a1f3d',
  muted: '#5a7a9a',
  border: '#b8cfe8',
  dot: '#2563eb',
}

/** Paleta z samych odcieni zielonego — do przekazania w `theme` przy mount(). */
export const GREEN_THEME: ThemeTokens = {
  primary: '#166534',
  accent: '#15803d',
  surface: '#f0fdf4',
  text: '#052e16',
  muted: '#5f8a6e',
  border: '#a7d7b8',
  dot: '#22c55e',
}

export function mergeTheme(partial?: Partial<ThemeTokens>): ThemeTokens {
  return { ...DEFAULT_THEME, ...partial }
}

export function themeToCssVariables(
  theme: ThemeTokens,
): Record<string, string> {
  return {
    '--tr-primary': theme.primary,
    '--tr-accent': theme.accent,
    '--tr-surface': theme.surface,
    '--tr-text': theme.text,
    '--tr-muted': theme.muted,
    '--tr-border': theme.border,
    '--tr-dot': theme.dot,
    '--tr-marker': theme.primary,
    '--tr-route-default': theme.primary,
  }
}

export function applyThemeToElement(
  el: HTMLElement,
  theme: ThemeTokens,
): void {
  const variables = themeToCssVariables(theme)
  Object.entries(variables).forEach(([name, value]) => {
    el.style.setProperty(name, value)
  })
}
