import { ChangeEvent } from 'react'
import { MenuItem, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useReactiveVar } from '@apollo/client'
import { themeService } from 'graphql/theme/theme.service'
import { languageService } from 'graphql/languages/languages.service'
import { CvTranslation } from '@molecules/cv_translation'
import * as Styled from './settings.styles'

const Settings = () => {
  const { t } = useTranslation()
  const theme = useReactiveVar(themeService.theme$)
  const language = useReactiveVar(languageService.language$)

  const handleTheme = (event: ChangeEvent<HTMLInputElement>) => {
    themeService.setTheme(event.target.value)
  }

  const handleLanguage = (event: ChangeEvent<HTMLInputElement>) => {
    languageService.changeLanguage(event.target.value)
  }

  return (
    <Styled.Page>
      <TextField value={theme} select label={t('Appearance')} onChange={handleTheme}>
        <MenuItem value="light">{t('Light')}</MenuItem>
        <MenuItem value="dark">{t('Dark')}</MenuItem>
        <MenuItem value="device">{t('Device settings')}</MenuItem>
      </TextField>
      <TextField value={language} select label={t('Language')} onChange={handleLanguage}>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="de">Deutsch</MenuItem>
        <MenuItem value="ru">Русский</MenuItem>
      </TextField>
      <CvTranslation label="Resume language (Translation)" />
    </Styled.Page>
  )
}

export default Settings
