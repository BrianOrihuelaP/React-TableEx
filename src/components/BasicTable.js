import React, { useMemo } from 'react';
import { COLUMNS, GROUPED_COLUMNS } from './columns';
import MOCK_DATA from '../mocks/MOCK_DATA.json';
import { useTable } from 'react-table';
import './table.css';

export const BasicTable = () => {
    console.log("RENDERIZANDO TABLA");
    // *Utilizando useMemo para mejorar el performance de la app
    // y evitar la reelectura de la informacion cargada

    // *Step 3 - definir columna y descripciones para usar react-table
    const columns = useMemo(() => GROUPED_COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);

    // useTable({
    //     columns: columns,
    //     data: data
    // });
    // con shorthand --->
    // const tableInstance = useTable({
    //     columns,
    //     data
    // });

    // lo anterior se puede destructurar directamente en la instanciación

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    });

    //* getTableProps, getTableBodyProps --> son funciones que necesitan ser deestructuradas para formalizar los campos de la tabla
    // * headerGroups --> contiene las cabeceras de la informacion solicitada (inside of thead tag on the table)

    // *Step 4 crear la estructura basica de una tabla HTML
    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
