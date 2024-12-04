import { Language } from 'cv-graphql'
import { createTable } from '@templates/table'
import { LanguagesTableTool } from '@organisms/languages-table-tool'
import { LanguagesTableHead } from '@organisms/languages-table-head'
import { LanguagesTableRow } from '@organisms/languages-table-row'
import { useLanguages } from 'hooks/use-languages.hook'
import { useAuth } from 'hooks/use-auth'
import { UserLanguages } from '@pages/user-languages'

const Table = createTable<Language>()

const Languages = () => {
  const { languages, loading } = useLanguages()

  return (
    <div>
      <Table
        items={languages}
        loading={loading}
        TableToolComponent={LanguagesTableTool}
        TableHeadComponent={LanguagesTableHead}
        TableRowComponent={LanguagesTableRow}
        searchBy={['name', 'native_name', 'iso2']}
        defaultSortBy="name"
      />
    </div>
  )
}

const LanguagesAdapter = () => {
  const { isAdmin, userId } = useAuth()

  if (isAdmin) {
    return <Languages />
  }

  return <UserLanguages forUserId={userId} />
}

export default LanguagesAdapter
