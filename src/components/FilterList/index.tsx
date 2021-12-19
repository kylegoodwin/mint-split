import React, { useState } from 'react';
import FilterButton from '../Filter';
import classes from './styles.module.scss';
import Filter from '../../types/Filter';

interface Props {
    possible: Filter[],
    active: Filter[],
    setActive: (filters: Filter[]) => void,
    setShowAddFilter: (value: boolean) => void
}

export default function FiltersList({ possible, active, setActive, setShowAddFilter }: Props) {

    return (<div className={classes.filters} >
        {possible.map(filter => { return <FilterButton filters={active} setFilters={setActive} filter={filter} /> })}
        <button onClick={() => { setShowAddFilter(true) }}>Add Filter</button>
    </div>)
}