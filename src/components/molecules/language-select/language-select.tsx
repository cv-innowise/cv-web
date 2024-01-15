import { ChangeEvent } from 'react'
import { MenuItem } from '@mui/material'
import { Language } from '@mui/icons-material'
import { useReactiveVar } from '@apollo/client'
import { languageService } from 'graphql/languages/languages.service'
import * as Styled from './language-select.styles'
import { LanguageSelectProps } from './language-select.types'

export const LanguageSelect = (props: LanguageSelectProps) => {
  const language$ = useReactiveVar(languageService.language$)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    languageService.changeLanguage(event.target.value)
  }

  return (
    <Styled.Select
      {...props}
      value={language$}
      select
      InputProps={{ startAdornment: <Language color="secondary" /> }}
      inputProps={{ renderValue: (value: string) => value.toUpperCase() }}
      onChange={handleChange}
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="de">Deutsch</MenuItem>
      <MenuItem value="ru">Русский</MenuItem>
    </Styled.Select>
  )
}
