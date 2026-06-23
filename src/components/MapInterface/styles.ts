import styled, { css } from 'styled-components'

export const ThemeRoot = styled.div`
  --tr-primary: #0a5ed7;
  --tr-accent: #ffd202;
  --tr-surface: #ffffff;
  --tr-text: #111827;
  --tr-muted: #6b7280;
  --tr-border: #e5e7eb;
  --tr-marker: var(--tr-primary);
  --tr-route-default: var(--tr-primary);

  background: var(--tr-surface);
  color: var(--tr-text);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  padding-top: 48px;
`

export const TopBarRoot = styled.div`
  align-items: center;
  background: var(--tr-surface);
  border-bottom: 1px solid var(--tr-border);
  display: flex;
  flex-shrink: 0;
  gap: 12px;
  padding: 12px 16px;
`

export const SearchInput = styled.input`
  border: 1px solid var(--tr-border);
  border-radius: 8px;
  flex: 1;
  font-size: 14px;
  min-width: 0;
  padding: 10px 12px;

  &:focus {
    border-color: var(--tr-primary);
    outline: none;
  }

  &:disabled {
    background: #f9fafb;
    cursor: not-allowed;
  }
`

export const FilterToggle = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? 'var(--tr-primary)' : '#f3f4f6')};
  border: 1px solid ${({ $active }) => ($active ? 'var(--tr-primary)' : 'var(--tr-border)')};
  border-radius: 8px;
  color: ${({ $active }) => ($active ? '#fff' : 'var(--tr-text)')};
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 12px;
  white-space: nowrap;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

export const MainLayout = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  position: relative;
`

export const CategorySidebar = styled.aside`
  border-right: 1px solid var(--tr-border);
  flex-shrink: 0;
  overflow: auto;
  padding: 12px;
  width: 220px;
`

export const CategoryChipsRow = styled.div`
  border-bottom: 1px solid var(--tr-border);
  display: flex;
  flex-shrink: 0;
  gap: 8px;
  overflow-x: auto;
  padding: 10px 12px;
`

export const MapArea = styled.div`
  flex: 1;
  min-height: 0;
  position: relative;
`

export const MapOverlay = styled.div`
  align-items: center;
  background: rgba(255, 255, 255, 0.72);
  display: flex;
  inset: 0;
  justify-content: center;
  pointer-events: none;
  position: absolute;
  z-index: 500;
`

export const OverlayCard = styled.div`
  background: var(--tr-surface);
  border: 1px solid var(--tr-border);
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  color: var(--tr-text);
  font-size: 14px;
  padding: 16px 20px;
`

export const ErrorBanner = styled.div`
  align-items: center;
  background: #fef2f2;
  border-bottom: 1px solid #fecaca;
  color: #b91c1c;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  padding: 10px 16px;
`

export const RetryButton = styled.button`
  background: #fff;
  border: 1px solid #fecaca;
  border-radius: 6px;
  color: #b91c1c;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 10px;
`

export const CategoryList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

export const CategoryItem = styled.li<{ $depth?: number }>`
  margin: 0;
  padding-left: ${({ $depth = 0 }) => $depth * 14}px;
`

export const CategoryButton = styled.button<{ $active?: boolean; $color?: string | null }>`
  align-items: center;
  background: ${({ $active }) => ($active ? '#eff6ff' : 'transparent')};
  border: none;
  border-radius: 8px;
  color: var(--tr-text);
  cursor: pointer;
  display: flex;
  font-size: 13px;
  gap: 8px;
  margin-bottom: 4px;
  padding: 8px 10px;
  text-align: left;
  width: 100%;

  &:hover {
    background: #f3f4f6;
  }
`

export const CategoryDot = styled.span<{ $color?: string | null }>`
  background: ${({ $color }) => $color || 'var(--tr-marker)'};
  border-radius: 50%;
  flex-shrink: 0;
  height: 10px;
  width: 10px;
`

export const CategoryChip = styled.button<{ $active?: boolean; $color?: string | null }>`
  align-items: center;
  background: ${({ $active }) => ($active ? 'var(--tr-primary)' : '#f3f4f6')};
  border: 1px solid
    ${({ $active }) => ($active ? 'var(--tr-primary)' : 'var(--tr-border)')};
  border-radius: 999px;
  color: ${({ $active }) => ($active ? '#fff' : 'var(--tr-text)')};
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 600;
  gap: 6px;
  padding: 8px 12px;
`

const detailPanelStyles = css`
  background: var(--tr-surface);
  border: 1px solid var(--tr-border);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow: hidden;
  z-index: 600;
`

export const DetailPanelDesktop = styled.aside`
  ${detailPanelStyles}
  border-radius: 12px 0 0 12px;
  bottom: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: min(360px, 100%);
`

export const DetailPanelMobile = styled.aside`
  ${detailPanelStyles}
  border-radius: 16px 16px 0 0;
  bottom: 0;
  height: min(55vh, 520px);
  left: 0;
  position: absolute;
  right: 0;
`

export const DetailHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid var(--tr-border);
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
`

export const DetailTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin: 0;
`

export const DetailClose = styled.button`
  background: transparent;
  border: none;
  color: var(--tr-muted);
  cursor: pointer;
  font-size: 22px;
  line-height: 1;
`

export const DetailBody = styled.div`
  flex: 1;
  overflow: auto;
  padding: 16px;
`

export const DetailImage = styled.img`
  border-radius: 10px;
  display: block;
  margin-bottom: 12px;
  max-height: 200px;
  object-fit: cover;
  width: 100%;
`

export const DetailLead = styled.p`
  color: var(--tr-muted);
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 12px;
`

export const DetailDescription = styled.div`
  color: var(--tr-text);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
`

export const RouteMetaRow = styled.div`
  color: var(--tr-text);
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  gap: 8px;
  margin-bottom: 16px;
`

export const RouteMetaBadge = styled.span`
  background: #f3f4f6;
  border-radius: 999px;
  padding: 6px 10px;
`

export const DetailCta = styled.a`
  background: var(--tr-accent);
  border-radius: 8px;
  color: #111;
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  padding: 12px 16px;
  text-align: center;
  text-decoration: none;
  width: 100%;
`

export const GalleryGrid = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 16px;
`

export const GalleryImage = styled.img`
  border-radius: 8px;
  height: 100px;
  object-fit: cover;
  width: 100%;
`

export const MultimediaList = styled.ul`
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
`

export const MultimediaLink = styled.a`
  color: var(--tr-primary);
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
`

export const AccessibilityBadge = styled.span`
  background: #ecfdf5;
  border-radius: 999px;
  color: #047857;
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 12px;
  padding: 6px 10px;
`

export const LeafletMapRoot = styled.div`
  height: 100%;
  width: 100%;

  .leaflet-container {
    background: #e5e7eb;
    font-family: inherit;
    height: 100%;
    width: 100%;
  }

  .tr-map-marker {
    background: var(--marker-color, var(--tr-marker));
    border: 2px solid #fff;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    height: 16px;
    position: relative;
    width: 16px;
  }

  .tr-map-marker--accessible::after {
    content: '♿';
    font-size: 10px;
    left: 18px;
    position: absolute;
    top: -4px;
  }
`
