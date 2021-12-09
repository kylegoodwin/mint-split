export default interface Filter{
    title: string,
    matchText: string,
    column: "transactionType" | "originalDescription",
    exactMatch: boolean
}