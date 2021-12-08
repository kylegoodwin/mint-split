import React from 'react';
import { TextField } from "@material-ui/core";

export default function AddFilter() {

    const addFilter = () => {
        chrome.storage.local.get("customFilters", function(items){
            console.log(items);
            let tempItems = [{title: "New", matchText: "New"}]
            // tempItems.push({title: "New", matchText: "New"})
            chrome.storage.local.set({ "customFilters": tempItems }, function(){
                //  Data's been saved boys and girls, go on home
            });
            
        });
    }

    const getFilters = () => {
        chrome.storage.local.get("customFilters", function(items){
            console.log(items)
        })
    }

    return (
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
    )
}