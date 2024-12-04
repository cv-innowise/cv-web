import { makeVar } from '@apollo/client'
import i18next from 'config/i18next'
import { StorageKeys } from 'constants/storage.constants'
import { ILanguageService } from './languages.types'

class LanguageService implements ILanguageService {
  language$ = makeVar(this.getLanguage())
  translation$ = makeVar(this.getTranslation())

  getLanguage() {
    return localStorage.getItem(StorageKeys.Language) || 'en'
  }

  getTranslation() {
    return localStorage.getItem(StorageKeys.Translation) || 'en'
  }

  changeLanguage(language: string) {
    i18next.changeLanguage(language)
    this.language$(language)
    localStorage.setItem(StorageKeys.Language, language)
  }

  changeTranslation(translation: string) {
    this.translation$(translation)
    localStorage.setItem(StorageKeys.Translation, translation)
  }
}

export const languageService = new LanguageService()
