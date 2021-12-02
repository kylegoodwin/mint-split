export default interface Transaction{
        index: number,
        date: string,
        originalDescription: string,
        amount: number,
        transactionType: TransactionType,
        accountName: string
}

enum TransactionType{
    Credit = "credit",
    Debit = "debit"
}