import styled, { css } from 'styled-components'
import { CloseCircle } from '@styled-icons/ionicons-sharp/CloseCircle'

export const Main = styled.div<{ $inline?: boolean }>`
  ${({ $inline }) =>
    $inline
      ? css`
          height: 100%;
          min-height: 400px;
          position: relative;
          width: 100%;
        `
      : css`
          bottom: 50px;
          position: fixed;
          right: 50px;
          z-index: 9999;
        `}
`

export const WhiteBox = styled.div`
  background-color: var(--tr-surface);
  backdrop-filter: blur(60px);
  border-radius: 12px;
  bottom: 16px;
  box-shadow: 0px 0px 30px 0px rgb(51 51 51 / 20%);
  display: flex;
  flex-direction: column;
  left: 16px;
  overflow: hidden;
  position: fixed;
  right: 16px;
  top: 16px;
`

export const InlineBox = styled.div`
  background: var(--tr-surface);
  border: 1px solid var(--tr-border);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 400px;
  overflow: hidden;
  width: 100%;
`

export const WidgetTopBar = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  gap: 12px;
  justify-content: flex-end;
  padding: 12px 16px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
`

export const DebugToggle = styled.label`
  align-items: center;
  color: var(--tr-muted);
  cursor: pointer;
  display: inline-flex;
  font-size: 13px;
  font-weight: 600;
  gap: 8px;
  user-select: none;

  input {
    accent-color: var(--tr-primary);
    cursor: pointer;
    height: 16px;
    width: 16px;
  }
`

export const BlackCloseCircle = styled(CloseCircle)`
  color: var(--tr-text);
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    opacity: 0.8;
  }
`

export const WidgetContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
`

export const MapInterfaceRoot = styled.div`
  flex: 1;
  min-height: 0;
`

export const ButtonCircle = styled.button`
  background: var(--tr-accent);
  border: none;
  border-radius: 50%;
  box-shadow: 0px 0px 10px 1px rgb(51 51 51 / 10%);
  color: var(--tr-surface);
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  height: 90px;
  padding: 10px;
  width: 90px;

  &:hover {
    opacity: 0.8;
  }
`

export const PanelBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  overflow: auto;
  padding: 56px 20px 20px;
`

export const PanelHeader = styled.h2`
  color: var(--tr-text);
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`

export const TestButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const TestButton = styled.button`
  background: var(--tr-accent);
  border: none;
  border-radius: 8px;
  color: var(--tr-surface);
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 14px;

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

export const UuidInput = styled.input`
  border: 1px solid var(--tr-border);
  border-radius: 8px;
  flex: 1;
  font-size: 13px;
  min-width: 200px;
  padding: 10px 12px;
`

export const StatusBar = styled.div<{ $status: 'idle' | 'loading' | 'success' | 'error' }>`
  background: ${({ $status }) => {
    if ($status === 'loading') return 'var(--tr-border)'
    if ($status === 'success') return 'var(--tr-border)'
    if ($status === 'error') return 'var(--tr-border)'
    return 'var(--tr-surface)'
  }};
  border: 1px solid var(--tr-border);
  border-radius: 8px;
  color: var(--tr-text);
  font-size: 13px;
  padding: 10px 12px;
`

export const ErrorMessage = styled.pre`
  background: var(--tr-border);
  border-radius: 8px;
  color: var(--tr-text);
  font-size: 12px;
  margin: 0;
  max-height: 120px;
  overflow: auto;
  padding: 12px;
  white-space: pre-wrap;
`

export const PanelSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const PanelSectionTitle = styled.h3`
  color: var(--tr-muted);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
`

export const PanelHint = styled.p`
  color: var(--tr-muted);
  font-size: 12px;
  line-height: 1.4;
  margin: 0;
`

export const TestButtonSecondary = styled(TestButton)`
  background: var(--tr-border);
  color: var(--tr-text);
`

export const ResponsePre = styled.pre`
  background: var(--tr-border);
  border-radius: 8px;
  flex: 1;
  font-size: 12px;
  line-height: 1.4;
  margin: 0;
  min-height: 0;
  overflow: auto;
  padding: 12px;
`
