import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'
import { SearchInput } from '@molecules/search-input'
import { useSkillDialog } from '@dialogs/skill'
import { useUser } from 'hooks/use-user.hook'

export const SkillsTableTool = () => {
  const { isAdmin } = useUser()
  const { t } = useTranslation()
  const [openSkillDialog] = useSkillDialog()

  const handleClick = () => {
    openSkillDialog()
  }

  return (
    <>
      <SearchInput />
      {isAdmin && (
        <Button variant="outlined" onClick={handleClick}>
          {t('Create skill')}
        </Button>
      )}
    </>
  )
}