export const authApi = 'http://localhost:8080'
export const quatoApi = 'http://localhost:8080'
export const tradeApi = 'http://localhost:8210'
export const quoteApi = 'http://localhost:8220'
export const backendUrl = {
  authService: {
    authenticate: `${authApi}/user/authenticate`,
    register: `${authApi}/user/register`,
    getUser: `${authApi}/user/name/`, //{username}
  },
  quotaService : {
    buy: `${quatoApi}/api/v1/pie/buy`,
    sell: `${quatoApi}/api/v1/pie/sell`,
    pieName: `${quatoApi}/api/v1/pie/`, // {name}
    pieUser: `${quatoApi}/api/v1/pie?user=` // id
  },
  tradeService: {
    getTransactions: `${tradeApi}/transactions`,
    saveTransaction: `${tradeApi}/transactions`,
  },
  quoteService: {
    getCurrencies: `${quoteApi}/currencies`,
    getFxRate: `${quoteApi}/fx-rate`
  }
}


export const prices = [
    {
      "Company Name": "Adobe",
      "Company Abvr": "ADBE",
      "Price": 500.42
    },
    {
      "Company Name": "Apple",
      "Company Abvr": "AAPL",
      "Price": 134.17
    },
    {
      "Company Name": "Amazon",
      "Company Abvr": "AMZN",
      "Price": 312.84
    }
  ]

