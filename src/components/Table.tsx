import * as React from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import Transaction from '../types/Transaction';
import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import "./Table.scss";
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import { copyTable } from '../utility/table-utilities';
import Filter from './Filter';
import { Subway } from '@material-ui/icons';

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
        hideSortIcons: true,
        disableReorder: true
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
interface BoolMap {[key: string]: boolean}
type Filters = {
    credits: boolean
    citiBike: boolean
    metroCard: boolean
}

export default function DataGridDemo({ rows }: TableProps) {

    const [selectedRows, setSelectedRows] = useState<Transaction[]>([]);
    const [filters, setFilters] = useState<BoolMap>({ credits: true, citiBike: false, metroCard: false });

    // const sortedSelectedRows = React.useMemo(()=> {
    //     return (selectedRows.sort( (a,b) => {return a.index - b.index }))
    // }, [selectedRows])

    const getTotal = (): number => {
        let total: number = 0.0;
        selectedRows.forEach(selectedTransaction => {
            total += selectedTransaction.amount;
        })
        return total;
    }

    const applyFilters = (transaction: Transaction) => {

        let shouldFilter = false;

        if (filters.credits && transaction.transactionType) {
            shouldFilter = transaction.transactionType === "credit"
        }

        if (filters.citiBike && !shouldFilter && transaction.originalDescription) {
            shouldFilter = transaction.originalDescription.includes("CITI BIKE");
        }

        if (filters.metroCard && !shouldFilter && transaction.originalDescription) {
            shouldFilter = transaction.originalDescription.includes("MTA*NYCT");
        }

        return !shouldFilter;
    }

    const copyOutputTable = () => {
        copyTable('#output-data');
    }

    return (<Grid container>
                <div style={{ height: 700, width: '50%' }}>
                    <h2>Recent Transaction </h2>
                    <Grid container>
                        <p>Filters: </p>
                        {/* <button onClick={() => { setFilters({ ...filters, credits: !filters.credits }) }}>{filters.credits ? <Check /> : <Clear />}Credit Transactions</button>
                        <button onClick={() => { setFilters({ ...filters, citiBike: !filters.citiBike }) }}>{filters.citiBike ? <Check /> : <Clear />}Citi Bikes</button>
                        <button onClick={() => { setFilters({ ...filters, metroCard: !filters.metroCard }) }}>{filters.metroCard ? <Check /> : <Clear />}MetroCard</button> */}
                        <Filter filters={filters} setFilters={setFilters} type="metroCard" icon={<Subway />} text="Metro Card" />
                    </Grid>
                    <div style={{height: "100%"}} >
                        <DataGrid
                            hideFooterRowCount
                            hideFooterSelectedRowCount
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
                </div>
                <div className="output-tables" style={{ height: 800, width: '40%', marginLeft: "2em" }}>
                    <h2>Stuff to Split</h2>
                    <div id="output-data">
                    <table id="output-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedRows.map(each => {
                                return <tr key={each.index}>
                                    <td>{each.originalDescription}</td>
                                    <td>{each.amount}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <table>
                        <thead>
                            <tr>
                                <th>Total</th>
                                <th>{getTotal().toFixed(2)}</th>
                            </tr>
                        </thead>
                    </table>
                    </div>
                    <Grid container>
                        <button onClick={copyOutputTable}>Copy to clipboard</button>
                    </Grid>
                </div>
            </Grid>);
}