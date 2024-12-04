import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Fragment, useMemo, useRef } from 'react'
import { useCv, useCvProjects, useCvSkills, usePdfExport } from 'hooks/use-cvs'
import { PageLoader } from '@atoms/page-loader'
import { prepareHtml } from 'helpers/prepare-html'
import { downloadPdf } from 'helpers/download-pdf'
import { sortDates } from 'helpers/table-sort.helper'
import { SortOrder } from 'constants/table-sort.constants'
import { useSkillsWithCategories } from 'hooks/use-skills'
import { AiTranslation, AiTranslationProvider } from '@features/ai_translation'
import { CvTranslation } from '@molecules/cv_translation'
import { DetailedSkills } from './innowise/detailed_skills'
import { Project } from './innowise/project'
import * as Styled from './cv-preview.styles'
import { SummarySkills } from './innowise/summary_skills'

const CvPreview = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { t, i18n } = useTranslation()
  const { cvId = '' } = useParams()
  const { cv, loading } = useCv(cvId)
  const { skills, loading: loadingSkills } = useCvSkills(cvId)
  const { skillCategories, skillCategoriesDetails } = useSkillsWithCategories(skills)
  const { projects } = useCvProjects(cvId)
  const [exportPdf, { loading: loadingPdf }] = usePdfExport()

  const sortedProjects = useMemo(() => {
    return [...projects].sort(sortDates('end_date', SortOrder.Desc))
  }, [projects])

  const handleExport = () => {
    if (!ref.current) {
      return
    }

    exportPdf({
      variables: {
        pdf: {
          html: prepareHtml(ref.current),
          margin: {
            top: '15mm',
            bottom: '15mm',
            left: '12mm',
            right: '12mm'
          }
        }
      }
    }).then(({ data }) => {
      cv && data && downloadPdf({ name: cv.name, base64: data.exportPdf })
    })
  }

  if (loading || !cv || loadingSkills) {
    return <PageLoader />
  }

  return (
    <Styled.Document ref={ref} maxWidth="md">
      <Styled.Head>
        <Typography variant="h4">{cv.user?.profile.full_name}</Typography>
        <Styled.Position>
          <AiTranslation>{cv.user?.position_name}</AiTranslation>
        </Styled.Position>
        <CvTranslation />
        <Styled.Export variant="outlined" disabled={loadingPdf} onClick={handleExport}>
          {t('Export PDF')}
        </Styled.Export>
      </Styled.Head>
      <Styled.Summary>
        <Styled.Left>
          <Styled.Title>{t('Education')}</Styled.Title>
          <Typography>{cv.education || t('No education')}</Typography>
          <Styled.Title>{t('Language proficiency')}</Styled.Title>
          {cv.languages.map(({ name, proficiency }) => (
            <Typography key={name}>
              {name} — {proficiency}
            </Typography>
          ))}
          <Styled.Title>{t('Domains')}</Styled.Title>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            <AiTranslation>
              {[...new Set(sortedProjects.map(({ domain }) => domain))]
                .filter((domain) => domain)
                .join(',\n')}
            </AiTranslation>
          </Typography>
        </Styled.Left>
        <Styled.Main>
          <Styled.Title>
            <AiTranslation>{cv.name}</AiTranslation>
          </Styled.Title>
          <Typography>
            <AiTranslation>{cv.description}</AiTranslation>
          </Typography>
          <SummarySkills skillCategories={skillCategories} />
        </Styled.Main>
      </Styled.Summary>
      <Styled.PageBreak />
      <Styled.Head>
        <Typography variant="h4">{t('Projects')}</Typography>
      </Styled.Head>
      {sortedProjects.map((project) => (
        <Fragment key={project.id}>
          <Project cv={cv} project={project} />
          <Styled.PageBreak />
        </Fragment>
      ))}
      {!sortedProjects.length && <Styled.PageBreak />}
      <Styled.Head>
        <Typography variant="h4">{t('Professional skills')}</Typography>
      </Styled.Head>
      <DetailedSkills projects={projects} skillCategories={skillCategoriesDetails} />
    </Styled.Document>
  )
}

const CvTranslationAdapter = () => {
  return (
    <AiTranslationProvider>
      <CvPreview />
    </AiTranslationProvider>
  )
}

export default CvTranslationAdapter
