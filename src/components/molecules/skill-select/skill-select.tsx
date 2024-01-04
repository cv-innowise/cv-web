import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useController } from 'react-hook-form'
import { MenuItem, TextField } from '@mui/material'
import { useSkills } from 'hooks/use-skills.hook'
import { useAuth } from 'hooks/use-auth.hook'
import { useProfileSkills } from 'hooks/use-profile.hook'
import { SkillSelectProps } from './skill-select.types'

const SkillSelect = ({ disabled }: SkillSelectProps) => {
  const { t } = useTranslation()
  const { profileId } = useAuth()
  const [allSkills, loading] = useSkills()
  const { field } = useController({ name: 'skill_name' })
  const { data } = useProfileSkills(profileId)
  const ownSkills = data?.profile.skills.map((skill) => skill.skill_name) || []
  const sortedSkills = [...allSkills].sort((a) => {
    if (ownSkills.includes(a.name)) {
      return 1
    }
    return -1
  })

  return (
    <TextField
      {...field}
      sx={{ width: '100%' }}
      select
      disabled={disabled || loading}
      label={t('Skill')}
    >
      {sortedSkills.map(({ id, name }) => (
        <MenuItem key={id} value={name} disabled={ownSkills.includes(name)}>
          {name}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default memo(SkillSelect)
