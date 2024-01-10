import { Add } from '@mui/icons-material'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'
import { useSkillMasteryDialog } from '@dialogs/skill-mastery'
import { useProfileSkillAdd } from 'hooks/use-profile'
import { useAuth } from 'hooks/use-auth'
import * as Styled from './new-profile-skill.styles'

const NewProfileSkill = () => {
  const { profileId } = useAuth()
  const { t } = useTranslation()
  const [addProfileSkill] = useProfileSkillAdd()
  const [openSkillMasteryDialog] = useSkillMasteryDialog()

  const handleClick = () => {
    openSkillMasteryDialog({
      title: 'Add Skill',
      onConfirm({ name, category, mastery }) {
        return addProfileSkill({
          variables: {
            skill: {
              profileId,
              name,
              category,
              mastery
            }
          }
        })
      }
    })
  }

  return (
    <Styled.Card color="secondary" onClick={handleClick}>
      <Add sx={{ m: '0 auto' }} /> <Typography textAlign="left">{t('Add Skill')}</Typography>
    </Styled.Card>
  )
}

export default memo(NewProfileSkill)