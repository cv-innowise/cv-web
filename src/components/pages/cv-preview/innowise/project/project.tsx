import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { format, parseISO } from 'date-fns/esm'
import * as Styled from './project.styles'
import { ProjectProps } from './project.types'

export const Project = ({ cv, project }: ProjectProps) => {
  const { t } = useTranslation()
  const { name, description, roles, responsibilities, start_date, end_date, environment } = project

  return (
    <Styled.Project>
      <Styled.Left>
        <Styled.Name>{name}</Styled.Name>
        <Typography>{description}</Typography>
      </Styled.Left>
      <Styled.Main>
        <Styled.Title>{t('Project roles')}</Styled.Title>
        <Typography>{roles.join(', ') || cv.user?.position_name}</Typography>
        <Styled.Title>{t('Period')}</Styled.Title>
        <Typography>
          {format(parseISO(start_date), 'MM.yyyy')} –{' '}
          {end_date ? format(parseISO(end_date), 'MM.yyyy') : t('Till now')}
        </Typography>
        <Styled.Title>{t('Responsibilities')}</Styled.Title>
        <Styled.Responsibilities>
          {responsibilities.map((responsibility, index) => (
            <li key={responsibility}>
              {responsibility.replace(/\.$/, '')}
              {index === responsibilities.length - 1 ? '.' : ';'}
            </li>
          ))}
        </Styled.Responsibilities>
        <Styled.Title>{t('Environment')}</Styled.Title>
        <Typography>{environment.join(', ')}.</Typography>
      </Styled.Main>
    </Styled.Project>
  )
}
