import { format } from 'date-fns';
//* Si se quiere agregar un filtro a cada columna, entonces...
import { ColumnFilter } from './ColumnFilter';

export const COLUMNS = [{
    Header: "Id",
    Footer: "Id",
    accessor: "id",
    Filter: ColumnFilter,
    disableFilters: true
}, {
    Header: "First Name",
    Footer: "First Name",
    accessor: "first_name",
    Filter: ColumnFilter
}, {
    Header: "Last Name",
    Footer: "Last Name",
    accessor: "last_name",
     Filter: ColumnFilter
}, {
    Header: "Date of Birth",
    Footer: "Date of Birth",
    accessor: "date_of_birth",
    Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy') },
    Filter: ColumnFilter,
    disableFilters: true
}, {
    Header: "Country",
    Footer: "Country",
    accessor: "country",
    Filter: ColumnFilter
}, {
    Header: "Phone",
    Footer: "Phone",
    accessor: "phone",
    Filter: ColumnFilter
}
]
//*Esto le sirve a react table a saber que info ira en cada columna

// * Creando una estructura de informacion agrupada : 

export const GROUPED_COLUMNS = [
    {
        Header: "ID",
        Footer: "ID",
        accessor: "id"
    },
    {
        Header: "NOMBRE",
        Footer: "NOMBRE",
        columns: [
            {
                Header: "NOMBRE",
                Footer: "NOMBRE",
                accessor: "first_name"
            }, {
                Header: "APELLIDO",
                Footer: "APELLIDO",
                accessor: "last_name"
            },
        ]
    },
    {
        Header: "INFO",
        Footer: "INFO",
        columns: [
            {
                Header: "NACIMIENTO",
                Footer: "NACIMIENTO",
                accessor: "date_of_birth"
            }, {
                Header: "PAIS",
                Footer: "PAIS",
                accessor: "country"
            }, {
                Header: "TELEFONO",
                Footer: "TELEFONO",
                accessor: "phone"
            }
        ]
    }
];