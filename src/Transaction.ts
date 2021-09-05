export default interface Transaction{
        date: string,
        description: string,
        originalDescription: string,
        amount: number,
        transactionType: TransactionType,
        accountName: string
}

enum TransactionType{
    Credit = "credit",
    Debit = "debit"
}