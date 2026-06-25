import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  applyThemeToElement,
  mergeTheme,
  type ThemeTokens,
} from '../theme/defaults'
import Widget, { type WidgetMode } from './Widget'

export interface MountOptions {
  anchor?: string
  theme?: Partial<ThemeTokens>
  hideDebugMode?: boolean
}

function resolveMountTarget(anchor?: string): {
  target: HTMLElement
  mode: WidgetMode
} {
  if (anchor) {
    const anchorElement = document.getElementById(anchor)
    if (anchorElement) {
      return { target: anchorElement, mode: 'inline' }
    }
  }

  return { target: document.body, mode: 'launcher' }
}

export default class EmbeddedWidget {
  static el: HTMLElement

  static mount(options?: MountOptions) {
    const theme = mergeTheme(options?.theme)
    const { target, mode } = resolveMountTarget(options?.anchor)
    const hideDebugMode = options?.hideDebugMode ?? false
    const component = <Widget mode={mode} hideDebugMode={hideDebugMode} />

    function doRender() {
      if (EmbeddedWidget.el) {
        throw new Error('EmbeddedWidget is already mounted, unmount first')
      }
      const el = document.createElement('div')
      el.setAttribute('class', 'cleanslate')
      applyThemeToElement(el, theme)

      target.appendChild(el)

      createRoot(el).render(component)
      EmbeddedWidget.el = el
    }

    if (document.readyState === 'complete') {
      doRender()
    } else {
      window.addEventListener('load', () => {
        doRender()
      })
    }
  }
}
