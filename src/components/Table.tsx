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
import { KeyboardArrowDown, Subway } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Clipboard from '@material-ui/icons/FileCopy'
import { Box } from '@material-ui/core';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AddFilter from './AddFilter';

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
interface BoolMap { [key: string]: boolean }

export default function DataGridDemo({ rows }: TableProps) {

    const [selectedRows, setSelectedRows] = useState<Transaction[]>([]);
    const [filters, setFilters] = useState<BoolMap>({ credits: true, citiBike: false, metroCard: false });

    const sortedSelectedRows = React.useMemo(() => {
        return (selectedRows.sort((a, b) => { return a.index - b.index }))
    }, [selectedRows])

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

    const [showFilters, setShowFilters] = useState<boolean>(false);

    const handleVisible = () => {
        if (!showFilters) {
            setShowFilters(true);
        }
    }

    const handleHide = () => {
        if (showFilters) {
            setShowFilters(false);
        }
    }

    return (<>
        <AddFilter />
        <Grid wrap="nowrap" container>
            <div style={{ height: 700, flexGrow: 1 }}>
                <h2>Recent Transaction </h2>
                <Grid style={{ padding: ".5em 0" }} container>
                    <div onMouseEnter={handleVisible} onMouseLeave={handleHide} style={{ position: "relative" }}>
                        <Button style={{ textTransform: "capitalize" }} variant="outlined">Filters <KeyboardArrowDown /></Button>
                        {showFilters && <div style={{ position: "absolute", bottom: "-250px", width: "300px", height: "250px", backgroundColor: "white", borderRadius: "10px", border: "solid 2px lightgray", zIndex: 2 }}>
                            <p>Filters: </p>
                            <button onClick={() => { setFilters({ ...filters, credits: !filters.credits }) }}>{filters.credits ? <Check /> : <Clear />}Credit Transactions</button>
                            <button onClick={() => { setFilters({ ...filters, citiBike: !filters.citiBike }) }}>{filters.citiBike ? <Check /> : <Clear />}Citi Bikes</button>
                            <button onClick={() => { setFilters({ ...filters, metroCard: !filters.metroCard }) }}>{filters.metroCard ? <Check /> : <Clear />}MetroCard</button>
                            {/* <Filter filters={filters} setFilters={setFilters} type="metroCard" icon={<Subway />} text="Metro Card" /> */}
                        </div>}
                    </div>
                </Grid>
                <div style={{ height: "100%" }} >
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
            <div className="output-tables" style={{ flexGrow: 0, marginLeft: "2em" }}>
                <h2>Stuff to Split</h2>
                <div id="output-data">
                    <table id="output-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedSelectedRows.map(each => {
                                return <tr key={each.index}>
                                    <td className="description">{each.originalDescription}</td>
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
                <Grid style={{ padding: "1em 0" }} container>
                    <Button variant="outlined" style={{ textTransform: "capitalize" }} onClick={copyOutputTable}><Clipboard />Copy to clipboard</Button>
                    <Box width=".5em" />
                    <Button variant="outlined" style={{ textTransform: "capitalize" }} ><AssignmentTurnedInIcon />Finalize Group</Button>
                </Grid>
            </div>
        </Grid>
    </>
    );
}