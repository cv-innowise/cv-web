import { useTranslation } from 'react-i18next'
import { generatePath, useNavigate } from 'react-router-dom'
import { AddButton } from '@atoms/add-button'
import { SearchInput } from '@molecules/search-input'
import { useAuth } from 'hooks/use-auth'
import { useCvDialog } from '@dialogs/cv'
import { routes } from 'constants/routes'

export const CvsTableTool = () => {
  const { userId } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [openCvDialog] = useCvDialog()

  const handleCreate = () => {
    openCvDialog({
      userId,
      onCreate(data) {
        navigate(generatePath(routes.cvs.details, { cvId: data.createCv.id }))
      }
    })
  }

  return (
    <>
      <SearchInput />
      <AddButton onClick={handleCreate}>{t('Create CV')}</AddButton>
    </>
  )
}
