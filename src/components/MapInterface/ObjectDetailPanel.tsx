import React, { useEffect } from 'react'
import type { Point } from '../../api'
import RouteMeta from './RouteMeta'
import {
  AccessibilityBadge,
  DetailBody,
  DetailClose,
  DetailCta,
  DetailDescription,
  DetailHeader,
  DetailImage,
  DetailLead,
  DetailPanelDesktop,
  DetailPanelMobile,
  DetailTitle,
  GalleryGrid,
  GalleryImage,
  MultimediaLink,
  MultimediaList,
  OverlayCard,
} from './styles'

interface ObjectDetailPanelProps {
  point: Point | null
  loading: boolean
  isMobile: boolean
  onClose: () => void
}

const ObjectDetailPanel = ({
  point,
  loading,
  isMobile,
  onClose,
}: ObjectDetailPanelProps) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  if (!point && !loading) {
    return null
  }

  const Panel = isMobile ? DetailPanelMobile : DetailPanelDesktop

  return (
    <Panel>
      <DetailHeader>
        <DetailTitle>{point?.name ?? 'Ładowanie...'}</DetailTitle>
        <DetailClose type="button" aria-label="Zamknij" onClick={onClose}>
          ×
        </DetailClose>
      </DetailHeader>

      <DetailBody>
        {loading && !point && (
          <OverlayCard>Pobieranie szczegółów obiektu...</OverlayCard>
        )}

        {point && (
          <>
            {point.for_disabled === 1 && (
              <AccessibilityBadge>♿ Dostępne dla osób z niepełnosprawnościami</AccessibilityBadge>
            )}

            {point.image && (
              <DetailImage src={point.image} alt={point.name} />
            )}

            {point.lead && <DetailLead>{point.lead}</DetailLead>}

            {point.is_tourist_route === 1 && (
              <RouteMeta
                distance={point.distance}
                routeTime={point.route_time}
                routeType={point.route_type}
              />
            )}

            {point.description && (
              <DetailDescription>{point.description}</DetailDescription>
            )}

            {point.gallery && point.gallery.length > 0 && (
              <GalleryGrid>
                {point.gallery.map((imageUrl) => (
                  <GalleryImage key={imageUrl} src={imageUrl} alt="" />
                ))}
              </GalleryGrid>
            )}

            {point.multimedia && point.multimedia.length > 0 && (
              <MultimediaList>
                {point.multimedia.map((item) => (
                  <li key={`${item.type}-${item.src}`}>
                    {item.src ? (
                      <MultimediaLink href={item.src} target="_blank" rel="noreferrer">
                        {item.title || item.type || 'Multimedia'}
                      </MultimediaLink>
                    ) : (
                      item.title
                    )}
                  </li>
                ))}
              </MultimediaList>
            )}

            {point.btn_link && (
              <DetailCta href={point.btn_link} target="_blank" rel="noreferrer">
                {point.btn_text || 'Zobacz więcej'}
              </DetailCta>
            )}
          </>
        )}
      </DetailBody>
    </Panel>
  )
}

export default ObjectDetailPanel
