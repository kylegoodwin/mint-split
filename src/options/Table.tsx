import * as React from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import Transaction from '../models/Transaction';
import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import "./Table.scss";
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';

const simpleColumns: GridColDef[] = [
    {
        field: 'date',
        headerName: 'Date',
        width: 150,
    },
    {
        field: 'originalDescription',
        headerName: 'Description',
        flex: 175
    },
    {
        field: 'amount',
        headerName: 'Amount',
        type: 'number',
        width: 150,
    }
]

const columns: GridColDef[] = [
    ...simpleColumns,
    {
        field: 'accountName',
        headerName: 'Account',
        type: 'string',
        width: 200,
    }

];

type TableProps = {
    rows: Transaction[]
}

type Filters = {
    credits: boolean
    citiBike: boolean
}

export default function DataGridDemo({ rows }: TableProps) {

    const [selectedRows, setSelectedRows] = useState<Transaction[]>([]);
    const [filters, setFilters] = useState<Filters>({ credits: true, citiBike: false });

    const getTotal = (): number => {
        let total: number = 0.0;
        selectedRows.forEach(selectedTransaction => {
            total += selectedTransaction.amount;
        })
        return total;
    }

    const applyFilters = (transaction : Transaction) => {

        let shouldFilter = false;

        if (filters.credits) {
            shouldFilter = transaction.transactionType === "credit"
        } 
        
        if(filters.citiBike && !shouldFilter){
            shouldFilter = transaction.originalDescription.includes("CITI BIKE");
        }

        return !shouldFilter;
    }

    const copyTable = () => {
        const elTable = document.querySelector('.output-tables');

        let range, sel;

        // Ensure that range and selection are supported by the browsers
        if (document.createRange && window.getSelection) {

            range = document.createRange();
            sel = window.getSelection();
            // unselect any element in the page
            if (sel && elTable) {
                sel.removeAllRanges();

                try {
                    range.selectNodeContents(elTable);
                    sel.addRange(range);
                } catch (e) {
                    range.selectNode(elTable);
                    sel.addRange(range);
                }

                document.execCommand('copy');


                sel.removeAllRanges();
            }
        }
    }

    return (
        <>
            <Grid container>
                <Grid className="filters-container" container>
                    <p>Filters: </p>
                    <button onClick={() => { setFilters({...filters, credits: !filters.credits }) }}>
                        {filters.credits ? <Check /> : <Clear />}
                        Credit Transactions</button>
                        <button onClick={() => { setFilters({...filters, citiBike: !filters.citiBike }) }}>
                        {filters.citiBike ? <Check /> : <Clear />}
                        Citi Bikes</button>
                </Grid>
                <div style={{ height: 800, width: '50%' }}>
                    <DataGrid
                        rows={rows.filter(applyFilters)}
                        columns={columns}
                        checkboxSelection
                        onRowClick={(stuff, event) => {
                            //Prevents need for double click to select
                            event.preventDefault();
                        }}
                        onSelectionModelChange={(newSelectionModel) => {
                            setSelectedRows(newSelectionModel.map(rowId => {
                                return rows[rowId as number]
                            }));
                        }}
                    />

                </div>
                <div className="output-tables" style={{ height: 800, width: '40%', marginLeft: "2em" }}>
                    <table id="output-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedRows.map(each => {
                                return <tr>
                                    <td>{each.originalDescription}</td>
                                    <td>{each.amount}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <table>
                        <tr>
                            <th>Total</th>
                            <th>{getTotal().toFixed(2)}</th>
                        </tr>
                    </table>
                    <Grid container>
                        <button onClick={copyTable}>Copy to clipboard</button>
                    </Grid>
                </div>
            </Grid>
        </>
    );
}