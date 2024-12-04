import { PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'
import { languageService } from 'graphql/languages/languages.service'
import i18n from '../../../config/i18next'

export const ai18n = i18n.cloneInstance({ lng: languageService.getTranslation() || 'en' })

export const AiTranslationProvider = ({ children }: PropsWithChildren) => {
  return <I18nextProvider i18n={ai18n}>{children}</I18nextProvider>
}
