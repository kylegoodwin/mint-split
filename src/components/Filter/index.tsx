import Check from '@material-ui/icons/Check'
import Clear from '@material-ui/icons/Clear'
import React, { ReactElement } from 'react'
import classes from './styles.module.scss'
interface BoolMap {[key: string]: boolean}

interface Props {
    type: string,
    filters: BoolMap,
    setFilters: (filters: BoolMap) => void,
    text: string,
    icon?: ReactElement

}

export default function Filter({ type, filters, setFilters, text,icon}: Props) {
    const handleClick = () => {
        let tempFilters = {...filters}
        tempFilters[type] = !!!filters[type]
        setFilters(tempFilters)
    }

    return (<button className={classes.filter} onClick={handleClick}>{icon}{text}</button>)
}