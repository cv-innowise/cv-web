import { Button } from '@mui/material'
import { SearchInput } from '../../molecules/search-input'
import { useAdminRole } from '../../../hooks/use-admin-role.hook'

export const LanguagesTableTool = () => {
  const isAdmin = useAdminRole()

  return (
    <>
      <SearchInput />
      {isAdmin && <Button variant="outlined">Create Language</Button>}
    </>
  )
}