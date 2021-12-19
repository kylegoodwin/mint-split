import React from 'react';
import { Dialog, Grid, IconButton, TextField } from "@material-ui/core";
import Clear from '@material-ui/icons/Clear';

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
            <Grid justifyContent="flex-end" style={{ width: "100%" }}>
                <IconButton onClick={handleClose}>
                    <Clear />
                </IconButton>
            </Grid>
            <div>
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