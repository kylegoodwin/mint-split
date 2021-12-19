import Chip from '@material-ui/core/Chip'
import { CheckCircle } from '@material-ui/icons'
import Check from '@material-ui/icons/Check'
import Clear from '@material-ui/icons/Clear'
import React, { ReactElement } from 'react'
import Filter from '../../types/Filter'
import classes from './styles.module.scss'

interface Props {
    filter: Filter,
    filters: Filter[],
    setFilters: (filters: Filter[]) => void,
    icon?: ReactElement

}

export default function Filter({ filter, filters, setFilters, icon }: Props) {

    const active = !!filters.find(each => { return Object.is(each, filter) })

    const handleClick = () => {
        let newFilters = [...filters];
        let index = newFilters.findIndex(e => { return (e.matchText === filter.matchText && e.column === filter.column) })

        if (index >= 0) {
            console.log("found")
            newFilters.splice(index, 1)
        } else {
            newFilters.push(filter)
        }

        setFilters(newFilters);
    }

    return (<Chip
        label={filter.title}
        onClick={handleClick}
        onDelete={handleClick}
        deleteIcon={<Check />}
        variant="outlined"
    />)
}