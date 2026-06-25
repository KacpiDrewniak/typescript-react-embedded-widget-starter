import styled from 'styled-components'
import { DEFAULT_THEME } from './defaults'

export const ThemeRoot = styled.div`
  --tr-primary: ${DEFAULT_THEME.primary};
  --tr-accent: ${DEFAULT_THEME.accent};
  --tr-surface: ${DEFAULT_THEME.surface};
  --tr-text: ${DEFAULT_THEME.text};
  --tr-muted: ${DEFAULT_THEME.muted};
  --tr-border: ${DEFAULT_THEME.border};
  --tr-dot: ${DEFAULT_THEME.dot};
  --tr-marker: var(--tr-primary);
  --tr-route-default: var(--tr-primary);

  background: var(--tr-surface);
  color: var(--tr-text);
`
