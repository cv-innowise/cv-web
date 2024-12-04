import { useReactiveVar } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useTranslator } from 'hooks/ai/use_translator'
import { languageService } from 'graphql/languages/languages.service'
import { AiTranslationProps } from './ai_translation.types'

export const AiTranslation = ({ children }: AiTranslationProps) => {
  const translationLanguage = useReactiveVar(languageService.translation$)
  const { isAvailable, translate } = useTranslator()

  const [translation, setTranslation] = useState('')

  useEffect(() => {
    if (!children || !isAvailable) {
      return
    }

    translate(children, translationLanguage).then(setTranslation)
  }, [isAvailable, children, translationLanguage, translate])

  return translation || children
}
