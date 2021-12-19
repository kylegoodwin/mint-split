import React from 'react'
import FilterButton from '../Filter';
import classes from './styles.module.scss';
import Filter from '../../types/Filter';

interface Props{
    possible : Filter[],
    active: Filter[],
    setActive: (filters : Filter[]) => void
}

export default function FiltersList({possible,active,setActive} : Props) {
    return <div className={classes.filters} >
        {possible.map(filter => { return <FilterButton filters={active} setFilters={setActive} filter={filter} /> })}
    </div>
}