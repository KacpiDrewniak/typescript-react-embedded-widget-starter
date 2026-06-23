import styled from 'styled-components'
import { CloseCircle } from '@styled-icons/ionicons-sharp/CloseCircle'

export const Main = styled.div`
  position: fixed;
  bottom: 0px;
  right: 50px;
  bottom: 50px;
  z-index: 9999;
`

export const BlackCloseCircle = styled(CloseCircle)`
  color: black;
  position: absolute;
  top: 14px;
  right: 16px;
  cursor: pointer;
  z-index: 1;
  &:hover {
    opacity: 0.8;
  }
`

export const ButtonCircle = styled.button`
  background: #ffd202;
  height: 90px;
  width: 90px;
  padding: 1rem;
  border: none;
  cursor: pointer;
  font-color: black;
  font-size: 14px;
  font-weight: bold;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0px 0px 10px 1px rgb(51 51 51 / 10%);
  &:hover {
    opacity: 0.8;
  }
`

export const WhiteBox = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  bottom: 16px;
  left: 16px;
  background-color: rgba(255, 255, 255, 1);
  backdrop-filter: blur(60px);
  box-shadow: 0px 0px 30px 0px rgb(51 51 51 / 20%);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const PanelBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  padding: 56px 20px 20px;
  overflow: hidden;
`

export const PanelHeader = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #111;
`

export const TestButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const TestButton = styled.button`
  background: #ffd202;
  border: none;
  border-radius: 8px;
  color: #111;
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
  border: 1px solid #d1d5db;
  border-radius: 8px;
  flex: 1;
  font-size: 13px;
  min-width: 200px;
  padding: 10px 12px;
`

export const StatusBar = styled.div<{ $status: 'idle' | 'loading' | 'success' | 'error' }>`
  background: ${({ $status }) => {
    if ($status === 'loading') return '#eff6ff'
    if ($status === 'success') return '#ecfdf5'
    if ($status === 'error') return '#fef2f2'
    return '#f9fafb'
  }};
  border-radius: 8px;
  color: #374151;
  font-size: 13px;
  padding: 10px 12px;
`

export const ErrorMessage = styled.pre`
  background: #fef2f2;
  border-radius: 8px;
  color: #b91c1c;
  font-size: 12px;
  margin: 0;
  max-height: 120px;
  overflow: auto;
  padding: 12px;
  white-space: pre-wrap;
`

export const ResponsePre = styled.pre`
  background: #f3f4f6;
  border-radius: 8px;
  flex: 1;
  font-size: 12px;
  line-height: 1.4;
  margin: 0;
  min-height: 0;
  overflow: auto;
  padding: 12px;
`
