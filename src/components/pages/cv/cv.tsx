import { NavLink, Outlet, generatePath, useLocation, useParams } from 'react-router-dom'
import { Tab } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Suspense, useMemo } from 'react'
import { routes } from 'constants/routes'
import { PageLoader } from '@atoms/page-loader'
import { useBreadcrumbs } from 'hooks/use-breadcrumbs'
import { useCv } from 'hooks/use-cvs'
import * as Styled from './cv.styles'

const Cv = () => {
  const { cvId = '' } = useParams()
  const location = useLocation()
  const { t } = useTranslation()
  const detailsPath = generatePath(routes.cvs.details, { cvId })
  const previewPath = generatePath(routes.cvs.preview, { cvId })
  const { cv } = useCv(cvId)

  useBreadcrumbs(
    useMemo(
      () => ({
        [generatePath(routes.cvs.cv, { cvId })]: {
          text: cv?.name,
          to: detailsPath,
          color: 'primary'
        }
      }),
      [cv]
    )
  )

  return (
    <>
      <Styled.Tabs value={location.pathname}>
        <Tab value={detailsPath} label={t('Details')} component={NavLink} to={detailsPath} />
        <Tab value={previewPath} label={t('Preview')} component={NavLink} to={previewPath} />
      </Styled.Tabs>
      <Styled.Content>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </Styled.Content>
    </>
  )
}

export default Cv