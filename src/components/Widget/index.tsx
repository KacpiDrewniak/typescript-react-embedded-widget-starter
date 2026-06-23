import React, { useState } from 'react'
import ApiTestPanel from './ApiTestPanel'
import MapInterface from './MapInterface'
import {
  BlackCloseCircle,
  ButtonCircle,
  DebugToggle,
  Main,
  WhiteBox,
  WidgetContent,
  WidgetTopBar,
} from './styles'

const Content = () => {
  const [isOpened, setIsOpened] = useState(false)
  const [isDebug, setIsDebug] = useState(false)

  const openWidget = () => {
    setIsOpened(true)
  }

  const closeWidget = () => {
    setIsOpened(false)
  }

  if (isOpened) {
    return (
      <WhiteBox>
        <WidgetTopBar>
          <DebugToggle>
            <input
              type="checkbox"
              checked={isDebug}
              onChange={(event) => setIsDebug(event.target.checked)}
            />
            isDebug
          </DebugToggle>
          <BlackCloseCircle size="40" onClick={closeWidget} />
        </WidgetTopBar>

        <WidgetContent>
          {isDebug ? <ApiTestPanel /> : <MapInterface />}
        </WidgetContent>
      </WhiteBox>
    )
  }

  return <ButtonCircle onClick={openWidget}>Click Me</ButtonCircle>
}

const Widget = () => (
  <Main>
    <Content />
  </Main>
)

export default Widget
