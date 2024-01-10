import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'
import { Cv } from 'cv-graphql'
import { useUserCvs } from 'hooks/use-users'
import { createTable } from '@templates/table'
import { CvsTableTool } from '@organisms/cvs-table-tool'
import { ProfileCvsTableHead } from '@organisms/cvs-table-head'
import { ProfileCvsTableRow } from '@organisms/cvs-table-row'

const Table = createTable<Cv>()

const UserCvs = () => {
  const { userId = '' } = useParams()
  const { cvs, loading } = useUserCvs(userId)

  if (loading) {
    return <CircularProgress />
  }

  return (
    <Box sx={{ width: 'calc(100vw - 48px)', alignSelf: 'center' }}>
      <Table
        items={cvs}
        loading={loading}
        TableToolComponent={CvsTableTool}
        TableHeadComponent={ProfileCvsTableHead}
        TableRowComponent={ProfileCvsTableRow}
        searchBy={['name']}
        defaultSortBy="name"
      />
    </Box>
  )
}

export default memo(UserCvs)
