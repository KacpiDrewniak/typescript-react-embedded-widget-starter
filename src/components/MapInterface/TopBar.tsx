import React from 'react'
import { FilterToggle, SearchInput, TopBarRoot } from './styles'

interface TopBarProps {
  name: string
  accessibleOnly: boolean
  onlyRoutes: boolean
  disabled?: boolean
  onNameChange: (value: string) => void
  onAccessibleToggle: () => void
  onRoutesToggle: () => void
}

const TopBar = ({
  name,
  accessibleOnly,
  onlyRoutes,
  disabled = false,
  onNameChange,
  onAccessibleToggle,
  onRoutesToggle,
}: TopBarProps) => (
  <TopBarRoot>
    <SearchInput
      type="search"
      value={name}
      disabled={disabled}
      placeholder="Szukaj miejsca..."
      onChange={(event) => onNameChange(event.target.value)}
    />
    <FilterToggle
      type="button"
      $active={accessibleOnly}
      disabled={disabled}
      onClick={onAccessibleToggle}
    >
      ♿ Dostępne
    </FilterToggle>
    <FilterToggle
      type="button"
      $active={onlyRoutes}
      disabled={disabled}
      onClick={onRoutesToggle}
    >
      🛤 Tylko trasy
    </FilterToggle>
  </TopBarRoot>
)

export default TopBar
