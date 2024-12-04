import { useCallback } from 'react'

// @ts-expect-error translation types
const detectorPromise = window.translation?.createDetector()

export const useTranslator = () => {
  // @ts-expect-error translation types
  const isAvailable = !!window.translation

  const detect = useCallback(async (source: string) => {
    try {
      const detector = await detectorPromise
      const results = await detector.detect(source)

      return results[0]
    } catch (error) {
      // todo error
    }
  }, [])

  const translate = useCallback(
    async (source: string, targetLanguage: string) => {
      try {
        const { detectedLanguage: sourceLanguage } = await detect(source)

        if (sourceLanguage === targetLanguage) {
          return source
        }

        // @ts-expect-error translation types
        const canTranslate = await window.translation?.canTranslate({
          sourceLanguage,
          targetLanguage
        })

        if (canTranslate === 'readily' || canTranslate === 'after-download') {
          // @ts-expect-error translation types
          const translator = await window.translation?.createTranslator({
            sourceLanguage,
            targetLanguage
          })

          return translator.translate(source)
        }
      } catch (error) {
        // todo error
      }
    },
    [detect]
  )

  return { isAvailable, detect, translate }
}
