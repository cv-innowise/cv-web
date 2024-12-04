import { useReactiveVar } from '@apollo/client'
import { MenuItem, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ChangeEvent } from 'react'
import { languageService } from 'graphql/languages/languages.service'
import { ai18n } from '@features/ai_translation/ai_translation_provider'
import { CvTranslationProps } from './cv_translation.types'

export const CvTranslation = ({ label }: CvTranslationProps) => {
  const { t } = useTranslation()
  const translation = useReactiveVar(languageService.translation$)

  const handleLanguage = (event: ChangeEvent<HTMLInputElement>) => {
    const language = event.target.value

    ai18n.changeLanguage(language)
    languageService.changeTranslation(language)
  }

  return (
    <TextField value={translation} select label={t(label || 'Language')} onChange={handleLanguage}>
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="de">Deutsch</MenuItem>
      <MenuItem value="ru">Русский</MenuItem>
    </TextField>
  )
}
