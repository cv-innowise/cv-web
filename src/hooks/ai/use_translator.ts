import { useCallback } from 'react'

// @ts-expect-error translation types
const detectorPromise = window.LanguageDetector?.create?.()
// @ts-expect-error translation types
const translatorPromise_enRu = window.Translator?.create?.({
  sourceLanguage: 'en',
  targetLanguage: 'ru'
})
// @ts-expect-error translation types
const translatorPromise_enDe = window.Translator?.create?.({
  sourceLanguage: 'en',
  targetLanguage: 'de'
})

export const useTranslator = () => {
  // @ts-expect-error translation types
  const isAvailable = window.LanguageDetector?.availability()

  const detect = useCallback(async (source: string) => {
    try {
      const detector = await detectorPromise
      const results = await detector.detect(source)

      return results[0]
    } catch (error) {
      console.error(error)
    }
  }, [])

  const translate = useCallback(
    async (source: string, targetLanguage: string) => {
      try {
        const { detectedLanguage: sourceLanguage } = await detect(source)

        if (sourceLanguage === targetLanguage) {
          return source
        }

        if (sourceLanguage === 'en' && targetLanguage === 'ru') {
          return (await translatorPromise_enRu).translate(source)
        }

        if (sourceLanguage === 'en' && targetLanguage === 'de') {
          return (await translatorPromise_enDe).translate(source)
        }
      } catch (error) {
        console.error(error)
      }
    },
    [detect]
  )

  return { isAvailable, detect, translate }
}
