import React, { useState } from 'react'
import ApiTestPanel from './ApiTestPanel'
import MapInterface from './MapInterface'
import {
  BlackCloseCircle,
  ButtonCircle,
  DebugToggle,
  InlineBox,
  Main,
  WhiteBox,
  WidgetContent,
  WidgetTopBar,
} from './styles'

export type WidgetMode = 'launcher' | 'inline'

interface WidgetProps {
  mode?: WidgetMode
  hideDebugMode?: boolean
}

interface ContentProps {
  mode: WidgetMode
  hideDebugMode: boolean
}

const Content = ({ mode, hideDebugMode }: ContentProps) => {
  const [isOpened, setIsOpened] = useState(mode === 'inline')
  const [isDebug, setIsDebug] = useState(false)

  const openWidget = () => {
    setIsOpened(true)
  }

  const closeWidget = () => {
    setIsOpened(false)
  }

  const showTopBar = !hideDebugMode || mode === 'launcher'

  const panelContent = (
    <>
      {showTopBar && (
        <WidgetTopBar>
          {!hideDebugMode && (
            <DebugToggle>
              <input
                type="checkbox"
                checked={isDebug}
                onChange={(event) => setIsDebug(event.target.checked)}
              />
              isDebug
            </DebugToggle>
          )}
          {mode === 'launcher' && (
            <BlackCloseCircle size="40" onClick={closeWidget} />
          )}
        </WidgetTopBar>
      )}

      <WidgetContent>
        {!hideDebugMode && isDebug ? <ApiTestPanel /> : <MapInterface />}
      </WidgetContent>
    </>
  )

  if (mode === 'inline') {
    return <InlineBox>{panelContent}</InlineBox>
  }

  if (isOpened) {
    return <WhiteBox>{panelContent}</WhiteBox>
  }

  return <ButtonCircle onClick={openWidget}>Click Me</ButtonCircle>
}

const Widget = ({ mode = 'launcher', hideDebugMode = false }: WidgetProps) => (
  <Main $inline={mode === 'inline'}>
    <Content mode={mode} hideDebugMode={hideDebugMode} />
  </Main>
)

export default Widget
