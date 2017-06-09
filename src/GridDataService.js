export default class GridDataService {
    constructor(dispatch) {
        this.dispatch = dispatch;

        this.rowData = [
            {symbol: "AAPL", name: "Apple Corp", price: 154.99},
            {symbol: "GOOG", name: "Google", price: 983.41},
            {symbol: "MSFT", name: "Microsoft", price: 71.95}
        ];
    }

    start() {
        setInterval(() => {
            this.applyPriceUpdateToRandomRow();

            this.dispatch({
                type: 'ROW_DATA_CHANGED',
                rowData: this.rowData.slice(0)
            })
        }, 1500);
    }

    applyPriceUpdateToRandomRow() {
        let swingPositive = Math.random() >= 0.5; // if the price is going up or down

        let rowIndexToUpdate = Math.floor(Math.random() * 3);
        let rowToUpdate = this.rowData[rowIndexToUpdate];
        let currentPrice = rowToUpdate.price;
        let swing = currentPrice / 10; // max of 10% swing

        let newPrice = currentPrice + (swingPositive ? 1 : -1) * swing;
        rowToUpdate.price = newPrice;
    }
}