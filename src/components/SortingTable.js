import React, { useMemo } from 'react';
import { COLUMNS, GROUPED_COLUMNS } from './columns';
import MOCK_DATA from '../mocks/MOCK_DATA.json';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import './table.css';
import { FcUp, FcDown } from "react-icons/fc";
import { GlobalFilter } from './GlobalFilter';

export const SortingTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({
        columns,
        data
    }, useFilters, useGlobalFilter, useSortBy);
    // Añadimos el hook useSortBy y useGlobalFilter

    const { globalFilter } = state;

    return (
        <div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')} &nbsp;
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
                        rows.map(row => {
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

                <tfoot>
                    {footerGroups.map(footerGroup => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {footerGroup.headers.map(column => (
                                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
        </div>
    )
}
