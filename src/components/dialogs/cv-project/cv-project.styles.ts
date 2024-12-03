import { DialogContent, TextField, styled } from '@mui/material'

export { Skills } from '@molecules/project_skills_select/project_skills_select.styles'

export const Column = styled(DialogContent)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: 32,
  rowGap: 32,
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr'
  }
}))

export const Description = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    height: 'auto'
  },

  [theme.breakpoints.up('sm')]: {
    gridColumn: 'span 2'
  }
}))
