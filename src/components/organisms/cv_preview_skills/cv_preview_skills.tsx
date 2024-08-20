import { parseISO } from 'date-fns/esm'
import { Fragment, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { sortItems } from 'helpers/table-sort.helper'
import { SortOrder } from 'constants/table-sort.constants'
import { CvPreviewSkillsProps, SkillsWithYears, UsedSkills } from './cv_preview_skills.types'
import * as Styled from './cv_preview_skills.styles'

export const CvPreviewSkills = ({ projects, groups }: CvPreviewSkillsProps) => {
  const { t } = useTranslation()

  const usedSkills = useMemo(() => {
    const todayYear = new Date().getFullYear()

    return projects.reduce<UsedSkills>((acc, cur) => {
      const firstUsed = parseISO(cur.start_date).getFullYear()
      const lastUsed = cur.end_date ? parseISO(cur.end_date).getFullYear() : todayYear

      for (const skill of cur.environment) {
        if (!acc[skill]) {
          acc[skill] = { firstUsed, lastUsed }
        }

        if (acc[skill].lastUsed < lastUsed) {
          acc[skill].lastUsed = lastUsed
        }

        if (acc[skill].firstUsed > firstUsed) {
          acc[skill].firstUsed = firstUsed
        }
      }

      return acc
    }, {})
  }, [projects])

  const skillsWithYears = useMemo(() => {
    const result: SkillsWithYears = {}

    for (const category in groups) {
      const skills = groups[category]

      result[category] = skills.map((skill) => ({ ...skill, ...usedSkills[skill.name] }))
    }

    return result
  }, [groups, usedSkills])

  return (
    <Styled.Table>
      <thead>
        <tr>
          <Styled.Th colSpan={2} sx={{ textAlign: 'left' }}>
            {t('Skills')}
          </Styled.Th>
          <Styled.Th>{t('Experience in years')}</Styled.Th>
          <Styled.Th>{t('Last used')}</Styled.Th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(skillsWithYears).map(([category, skills], categoryIndex, categories) => (
          <Fragment key={category}>
            {skills
              .map((skill) => ({
                ...skill,
                years: skill.lastUsed ? skill.lastUsed - skill.firstUsed : undefined
              }))
              .sort(sortItems('years', SortOrder.Desc))
              .map((skill, index) => {
                const firstSkill = index === 0
                const lastSkill = index === skills.length - 1
                const lastRow = categoryIndex === categories.length - 1

                return (
                  <Styled.Row separator={lastSkill}>
                    {firstSkill && (
                      <Styled.Category rowSpan={skills.length} last={lastRow}>
                        {t(category)}
                      </Styled.Category>
                    )}
                    <Styled.Skill sx={{ paddingBottom: lastSkill ? '24px' : undefined }}>
                      {skill.name}
                    </Styled.Skill>
                    <Styled.Td sx={{ width: 100 }}>{skill.years}</Styled.Td>
                    <Styled.Td sx={{ width: 140 }}>{skill.lastUsed}</Styled.Td>
                  </Styled.Row>
                )
              })}
          </Fragment>
        ))}
      </tbody>
    </Styled.Table>
  )
}