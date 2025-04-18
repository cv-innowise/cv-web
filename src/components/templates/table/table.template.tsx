import { FC, memo, useDeferredValue, useMemo, useState } from 'react'
import { TableBody, TableCell, TableFooter, TableRow } from '@mui/material'
import { TableLoader } from '@atoms/table-loader'
import { SortOrder } from 'constants/table-sort.constants'
import { sortDates, sortItems } from 'helpers/table-sort.helper'
import { searchItems } from 'helpers/table-search.helper'
import { NoResults } from '@molecules/no_results'
import { Item, TableProps } from './table.types'
import { TableSearchContext, TableSortContext } from './table.context'
import * as Styled from './table.styles'

const dateFields = ['start_date', 'end_date']

const Table = <T extends Item>({
  items,
  loading,
  TableToolComponent,
  TableHeadComponent,
  TableRowComponent,
  TableFooterComponent,
  searchBy,
  defaultSortBy,
  preventSortForItemId,
  defaultOrder = SortOrder.Asc,
  stickyTop
}: TableProps<T>) => {
  const [search, setSearch] = useState('')
  const _search = useDeferredValue(search)
  const [sortBy, setSortBy] = useState<string>(defaultSortBy)
  const _sortBy = useDeferredValue(sortBy)
  const [order, setOrder] = useState(defaultOrder)
  const _order = useDeferredValue(order)

  const tableSearch = useMemo(() => {
    return { search, setSearch }
  }, [search])

  const tableSort = useMemo(() => {
    return { sortBy, order, setSortBy, setOrder }
  }, [sortBy, order])

  const filteredItems = useMemo(() => {
    return items.filter(searchItems(searchBy, _search))
  }, [items, searchBy, _search])

  const sortedItems = useMemo(() => {
    if (!filteredItems.length) {
      return filteredItems
    }

    if (dateFields.includes(sortBy)) {
      return filteredItems.sort(sortDates(_sortBy, _order))
    }

    if (preventSortForItemId) {
      const topItem = filteredItems.find((item) => item.id === preventSortForItemId)
      const bottomItems = filteredItems.filter((item) => item.id !== preventSortForItemId)
      const sortedItems = bottomItems.sort(sortItems(_sortBy, _order))

      return topItem ? [topItem, ...sortedItems] : sortedItems
    }

    return filteredItems.sort(sortItems(_sortBy, _order))
  }, [sortBy, filteredItems, _sortBy, _order, preventSortForItemId])

  return (
    <Styled.Table stickyHeader>
      <Styled.Thead stickyTop={stickyTop}>
        <TableSearchContext.Provider value={tableSearch}>
          <TableRow>
            <Styled.Actions colSpan={10}>
              <TableToolComponent />
            </Styled.Actions>
          </TableRow>
        </TableSearchContext.Provider>
        <TableSortContext.Provider value={tableSort}>
          <TableHeadComponent />
        </TableSortContext.Provider>
      </Styled.Thead>
      <TableBody>
        {loading && <TableLoader />}
        {sortedItems.map((item) => (
          <TableRowComponent key={item.id} item={item} />
        ))}
        {!filteredItems.length && (
          <TableRow>
            <TableCell colSpan={10}>
              <NoResults search={_search} onReset={() => setSearch('')} />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      {TableFooterComponent && (
        <TableFooter>
          <TableFooterComponent />
        </TableFooter>
      )}
    </Styled.Table>
  )
}

const TableComponent = memo(Table)

export const createTable = <T extends Item>() => TableComponent as unknown as FC<TableProps<T>>
