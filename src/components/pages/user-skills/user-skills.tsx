import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { SkillMastery } from 'cv-graphql'
import { Add, DeleteForever } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'
import {
  useProfileSkillAdd,
  useProfileSkillDelete,
  useProfileSkillUpdate,
  useProfileSkills
} from 'hooks/use-profile-skills'
import { SkillsGroup } from '@molecules/skills-group'
import { PageLoader } from '@atoms/page-loader'
import { BulkDeletion, bulkDeletionService } from '@features/bulk-deletion'
import { useSkillMasteryDialog } from '@dialogs/skill-mastery'
import { Actions } from '@templates/actions'
import { useBulkDeletion } from 'hooks/use_bulk_deletion'
import { usePermission } from 'hooks/use_permission'
import { addNotification } from 'graphql/notifications'
import { useSkillsWithCategories } from 'hooks/use-skills'
import * as Styled from './user-skills.styles'
import { UserSkillsProps } from './user-skills.types'

const UserSkills = ({ forUserId = '' }: UserSkillsProps) => {
  const { t } = useTranslation()
  const { userId = forUserId } = useParams()
  const { canUpdateProfile } = usePermission()
  // const { user } = useUser(userId)
  const { profile, skills, loading } = useProfileSkills(userId)
  const { skillCategories } = useSkillsWithCategories(skills)
  const [openSkillMasteryDialog] = useSkillMasteryDialog()
  const ownSkills = skills.map((skills) => skills.name)
  const [addProfileSkill] = useProfileSkillAdd()
  const [updateProfileSkill] = useProfileSkillUpdate()
  const [deleteProfileSkill] = useProfileSkillDelete()
  const { isActive$ } = useBulkDeletion()
  // const { skills: availableSkills } = useSkills()

  const handleAdd = () => {
    openSkillMasteryDialog({
      title: 'Add skill',
      ownSkills,
      onConfirm({ name, categoryId, mastery }) {
        return addProfileSkill({
          variables: {
            skill: {
              userId,
              name,
              categoryId,
              mastery
            }
          }
        })
          .then(() => addNotification('Skill was added'))
          .catch((error) => addNotification(error.message, 'error'))
      }
    })
  }

  const handleUpdate = (skill: SkillMastery) => {
    openSkillMasteryDialog({
      title: 'Update skill',
      ownSkills,
      skill,
      disableSkillSelect: true,
      onConfirm({ name, categoryId, mastery }) {
        return updateProfileSkill({
          variables: {
            skill: {
              userId,
              name,
              categoryId,
              mastery
            }
          }
        })
          .then(() => addNotification('Skill was updated'))
          .catch((error) => addNotification(error.message, 'error'))
      }
    })
  }

  const handleDelete = (entityIds: string[]) => {
    const multiple = entityIds.length > 1

    return deleteProfileSkill({
      variables: {
        skill: {
          userId,
          name: entityIds
        }
      }
    })
      .then(() => addNotification(multiple ? 'Skills were removed' : 'Skill was removed'))
      .catch((error) => addNotification(error.message, 'error'))
  }

  if (loading) {
    return <PageLoader />
  }

  return (
    <Styled.Skills maxWidth="md">
      <BulkDeletion onDelete={handleDelete}>
        {!skills.length && canUpdateProfile(profile) && (
          <Button color="secondary" onClick={handleAdd}>
            <Add /> {t('Add skill')}
          </Button>
        )}
        {/* <AiPrompt
          resetHidden
          onPrompt={() => {
            return {
              input: getSkillsPrompt(user?.department?.name, user?.position?.name),
              onChunk(output) {}
            }
          }}
          onReady={(output) => {
            const suggestedSkills = output.split(', ').map((skill) => skill.toLowerCase())
            const newSkills = availableSkills.filter((skill) =>
              suggestedSkills.find((name) => name.includes(skill.name.toLowerCase()))
            )

            Promise.allSettled(
              newSkills.map(({ name, category }) =>
                addProfileSkill({
                  variables: {
                    skill: {
                      userId,
                      name,
                      categoryId: category?.id,
                      mastery: Mastery.Proficient
                    }
                  }
                })
              )
            )
              .then(() => addNotification('Skill was added'))
              .catch((error) => addNotification(error.message, 'error'))
          }}
        /> */}
        {Object.entries(skillCategories).map(([category, skills]) => (
          <SkillsGroup
            key={category}
            category={category}
            skills={skills}
            disabled={!canUpdateProfile(profile)}
            onUpdate={handleUpdate}
          />
        ))}
      </BulkDeletion>
      {!isActive$ && !!skills.length && canUpdateProfile(profile) && (
        <Actions>
          <Button color="secondary" onClick={handleAdd}>
            <Add /> {t('Add skill')}
          </Button>
          <Button onClick={() => bulkDeletionService.startSelection()}>
            <DeleteForever /> {t('Remove skills')}
          </Button>
        </Actions>
      )}
    </Styled.Skills>
  )
}

export default memo(UserSkills)
