import React, { useMemo } from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import Transaction from '../types/Transaction';
import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import "./Table.scss";
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import { copyTable } from '../utility/table-utilities';
import { KeyboardArrowDown, Subway } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Clipboard from '@material-ui/icons/FileCopy'
import { Box } from '@material-ui/core';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AddFilter from './AddFilter';
import defaultFilters from '../utility/default-filters';
import Filter from '../types/Filter';
import FilterButton from './Filter'
import FiltersList from './FilterList';

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

    const [showCreateFilter, setShowCreateFilter] = useState<boolean>(false);

    const [selectedRows, setSelectedRows] = useState<Transaction[]>([]);
    const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
    const [possibleFilters, setPossibleFilters] = useState<Filter[]>(defaultFilters);

    const sortedSelectedRows = React.useMemo(() => {
        return (selectedRows.sort((a, b) => { return a.index - b.index }))
    }, [selectedRows])

    const getTotal = (): number => {
        let total: number = 0.0
        selectedRows.forEach(selectedTransaction => {
            total += selectedTransaction.amount;
        })
        return total;
    }

    const copyOutputTable = () => {
        copyTable('#output-data');
    }

    const [showFilters, setShowFilters] = useState<boolean>(false);

    const toggleVisible = () => {
        setShowFilters(!showFilters);
    }

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

    const applyFilters = (transaction: Transaction) => {
        // Create combined list of filters from default filters and saved
        //Loop though each filter that is enabled and set shuouldFilter to 
        for (let each of activeFilters) {
            const relevantValue = transaction[each.column]
            if (!relevantValue) {
                // console.log("Missing Data Encountered")
                return true;
            }

            if (each.exactMatch) {
                if (relevantValue === each.matchText) {
                    return false;
                }
            } else {
                if (relevantValue.includes(each.matchText)) {
                    return false;
                }
            }
        }
        return true;
    }

    const originalRows = useMemo(() => {
        return (rows.filter(applyFilters))
    }, [activeFilters])

    return (<>
        <AddFilter open={showCreateFilter} setOpen={setShowCreateFilter} />
        <Grid wrap="nowrap" container>
            <div style={{ height: 700, flexGrow: 1 }}>
                <h2>Recent Transaction </h2>
                <Grid style={{ padding: ".5em 0" }} container>
                    <div onMouseEnter={handleVisible} onMouseLeave={handleHide} style={{ position: "relative" }}>
                        <Button onClick={toggleVisible} style={{ textTransform: "capitalize" }} variant="outlined">Filters <KeyboardArrowDown /></Button>
                        {showFilters && <FiltersList
                            possible={possibleFilters}
                            active={activeFilters}
                            setActive={setActiveFilters}
                            setShowAddFilter={setShowCreateFilter}
                        />}
                    </div>
                </Grid>
                <div style={{ height: "100%" }} >
                    <DataGrid
                        hideFooterRowCount
                        hideFooterSelectedRowCount
                        rows={originalRows}
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