import { ReactiveVar } from '@apollo/client'
import { Language } from 'cv-graphql'

export type LanguagesResult = {
  languages: Language[]
}

export type CreateLanguageResult = {
  createLanguage: Language
}

export type UpdateLanguageResult = {
  updateLanguage: Language
}

export interface ILanguageService {
  language$: ReactiveVar<string>
  translation$: ReactiveVar<string>
  getLanguage(): string
  getTranslation(): string
  changeLanguage(language: string): void
  changeTranslation(translation: string): void
}
