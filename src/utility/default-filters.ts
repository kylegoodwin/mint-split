import Filter from "../types/Filter";

const defaultFilters: Filter[] = [
    { column: "transactionType", matchText: "credit", title: "Credit", exactMatch: true },
    { column: "originalDescription", matchText: "CITI BIKE", title: "Citi Bikes", exactMatch: false},
    { column: "originalDescription", matchText: "MTA*NYCT", title: "Metrocard", exactMatch: false}


]