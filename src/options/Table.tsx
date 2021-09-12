import * as React from 'react';
import { DataGrid, GridColDef, GridRowId, GridValueGetterParams } from '@material-ui/data-grid';
import Transaction from '../Transaction';
import { useState } from 'react';
import Grid from '@material-ui/core/Grid'

const simpleColumns: GridColDef[] = [
    {
        field: 'date',
        headerName: 'Date',
        width: 150,
    },
    {
        field: 'originalDescription',
        headerName: 'Description',
        width: 175,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        type: 'number',
        width: 100,
    }
]


const columns: GridColDef[] = [
    ...simpleColumns,
    {
        field: 'accountName',
        headerName: 'Account',
        type: 'string',
        width: 200,
    },
    {
        field: 'transactionType',
        headerName: 'Type',
        type: 'string',
        width: 200,
    },

];

type TableProps = {
    rows: Transaction[]
}

export default function DataGridDemo({ rows }: TableProps) {

    const [selectedRows, setSelectedRows] = useState<Transaction[]>([]);

    const getTotal = (): number => {
        let total : number = 0.0;
        selectedRows.forEach(selectedTransaction => {
            total+= selectedTransaction.amount;
        })
        return total;
    }


    getTotal();

    return (
        <>
        <Grid container>
          
        <div style={{ height: 800, width: '50%' }}>
            Shared Transaction Total: {getTotal()}
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectedRows(newSelectionModel.map(rowId => {
                        return rows[rowId as number]
                    }));
                }}
            />

        </div>
        <div style={{ height: 800, width: '40%', marginLeft: "2em" }}>
            Output
            <DataGrid
                rows={selectedRows}
                columns={simpleColumns}
            />

        </div>
        </Grid>
        </>
    );
}
