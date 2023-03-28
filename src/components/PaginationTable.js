import React, { useMemo } from 'react';
import { COLUMNS, GROUPED_COLUMNS } from './columns';
import MOCK_DATA from '../mocks/MOCK_DATA.json';
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table';
import './table.css';
import { FcUp, FcDown } from "react-icons/fc";
import { GlobalFilter } from './GlobalFilter';

export const PaginationTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({
        columns,
        data
    }, useFilters, useGlobalFilter, useSortBy, usePagination);

    const { globalFilter, pageIndex } = state;

    return (
        <div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')} {' '}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? <FcUp style={{ color: 'white', fontSize: '20px' }} /> : <FcDown style={{ color: 'white', fontSize: '20px' }} />) : ''}
                                    </span>

                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {
                        page.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => (
                                            <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        ))
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong> {' '}
                </span>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
            </div>
        </div>
    )
}
