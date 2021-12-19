import React from 'react';
import { Box, Dialog, Grid, IconButton, TextField, Typography } from "@material-ui/core";
import Clear from '@material-ui/icons/Clear';
import classes from './styles.module.scss';


interface Props {
    open: boolean,
    setOpen: (value: boolean) => void
}

export default function AddFilter({ open, setOpen }: Props) {

    const handleClose = () => {
        setOpen(false);
    }

    const addFilter = () => {
        chrome.storage.local.get("customFilters", function (items) {
            console.log(items);
            let tempItems = [{ title: "New", matchText: "New" }]
            // tempItems.push({title: "New", matchText: "New"})
            chrome.storage.local.set({ "customFilters": tempItems }, function () {
                //  Data's been saved boys and girls, go on home
            });

        });
    }

    const getFilters = () => {
        chrome.storage.local.get("customFilters", function (items) {
            console.log(items)
        })
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <div className={classes.container}>
            <Grid className={classes.top} container wrap="nowrap" alignItems="center" justifyContent="space-between">
                <Typography style={{fontSize: "1.5em"}} variant="h2">Add a New Filter</Typography>
                <IconButton onClick={handleClose}>
                    <Clear />
                </IconButton>
            </Grid>
                <button onClick={getFilters}>Get Filters</button>
                <form>
                    <TextField label="Title"></TextField>
                    <br />
                    <TextField label="Description To Match"></TextField>
                    <br />
                </form>
                <button onClick={addFilter}>Submit</button>
                </div>
        </Dialog>
    )
}