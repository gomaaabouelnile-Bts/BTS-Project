export interface ItransactionsH
{
    transactionSerial?: number;
    erpTransactionID?: string;
    documentType?: string;
    dateTimeIssued?: Date;
    transactionDescription?: string;
    customerType?: string;
    customerName?: string;
    customerTaxId?: string;
    countryName?: string;
    governorateName?: string;
    regionName?: string;
    street?: string;
    buildingNumber?: string;
    postalCode?: string;
    floor?: string;
    room?: string;
    landmark?: string;

    additionalInformation?: string;
    eRPCurrencyCode: string;
    exchangeRate?: number;
    totalSalesAmount?: number;

    totalDiscountAmount?: number;
    netAmount?: number;
    totalVAT?: number;
    totalWHT?: number;
    extraDiscountAmount?: number;
    totalItemsDiscountAmount?: number;
    totalAmount?: number;
    transactionStatusCode?: number;
    eRPCreationDateTime?: Date;
    ref?: string;
    customerCode?: string;
    ETAID?: string;


}
