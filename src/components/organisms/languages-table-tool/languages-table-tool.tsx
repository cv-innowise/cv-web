import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'
import { SearchInput } from '@molecules/search-input'
import { useUser } from '@hooks/use-user.hook'
import { useLanguageDialog } from '@dialogs/language'

export const LanguagesTableTool = () => {
  const { isAdmin } = useUser()
  const { t } = useTranslation()
  const [openLanguageDialog] = useLanguageDialog()

  const handleClick = () => {
    openLanguageDialog()
  }

  return (
    <>
      <SearchInput />
      {isAdmin && (
        <Button variant="outlined" onClick={handleClick}>
          {t('Create language')}
        </Button>
      )}
    </>
  )
}
