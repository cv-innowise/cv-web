import { ILanguage } from '@interfaces/language.interface'

export type LanguagesResult = {
  languages: ILanguage[]
}

export type CreateLanguageResult = {
  createLanguage: ILanguage
}

export type UpdateLanguageResult = {
  updateLanguage: ILanguage
}

export interface ILanguageService {
  changeLanguage(language: string): void
}
