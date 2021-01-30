import Api from './api'
import 'babel-core/register'
import 'babel-polyfill';

const getPriceOperation = 'getPrices';
const getOrderOperation = 'getOrder';
const buyOperation = 'buyCoin';
const sellOperation = 'sellCoin';

class Orders extends Api {
    constructor(client) {
        super(client)
    }

    // TODO: move to utils 
    static findPrice(data, crypto) {
        return data.find(price => price.cryptocurrency == crypto)
    }


    async getPrices() {
        try {
            const data = await this.query(getPriceOperation)
            return data
          } catch (error) {
            throw error
          }
    }

    async buy(amount, crypto) {
        try {
            const prices = await this.getPrices()
            var priceData = Orders.findPrice(prices.getPrices, crypto)
            // TODO: Write validator
            if (priceData == undefined) {
                throw new Error (`could not find price for crypto ${crypto}.`)
            }
            if (amount < priceData.minBuy || amount > priceData.maxBuy) {
                console.log("here")
                throw new Error (`price must be betweeen ${priceData.minBuy} and ${priceData.maxBuy}`)
            }
            var buyOptions = {
                crypto,
                amount,
                price: priceData.id
            }
            var data = await this.query(buyOperation, buyOptions)
            return data
          } catch (error) {
            throw error
          }
    }

    async sell(amount, crypto) {
        try {
            const prices = await this.getPrices()
            var priceData = Orders.findPrice(prices.getPrices, crypto)
            // TODO: Write validator
            if (priceData == undefined) {
                throw new Error (`could not find price for crypto ${crypto}.`)
            }
            if (amount < priceData.minSell || amount > priceData.maxSell) {
                console.log("here")
                throw new Error (`price must be betweeen ${priceData.minSell} and ${priceData.maxSell}`)
            }
            var sellOptions = {
                crypto,
                amount,
                price: priceData.id
            }
            var data = await this.query(sellOperation, sellOptions)
            return data
          } catch (error) {
            throw error
          }
    }

    async getOrder(id) {
        try {
            const data = await this.query(getOrderOperation, {id})
            return data
          } catch (error) {
            throw error
          }
    }

}


export default Orders