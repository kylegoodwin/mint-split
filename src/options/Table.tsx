import * as React from 'react';
import { DataGrid, GridColDef, GridRowId, GridValueGetterParams } from '@material-ui/data-grid';
import Transaction from '../Transaction';
import { useState } from 'react';

const columns: GridColDef[] = [
    {
        field: 'date',
        headerName: 'Date',
        width: 100,
    },
    {
        field: 'originalDescription',
        headerName: 'Description',
        width: 200,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        type: 'number',
        width: 200,
    },
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

    const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);

    return (
        <div style={{ height: 800, width: '80%', margin: "auto" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                    console.log(newSelectionModel);
                }}
                selectionModel={selectionModel}
            />
        </div>
    );
}
