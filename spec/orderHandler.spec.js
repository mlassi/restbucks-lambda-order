'use strict'

const orderHandler = require('../src/orderHandler')
const orderOrchestrator = require('../src/orderOrchestrator')

const SUCCESS = {
  statusCode: 202,
  body: JSON.stringify({ message: 'Order Accepted' })
}

const EVENT = { body: JSON.stringify({ orderDetails: [] }) }

describe('order handler', () => {
  it('should return accepted status code when recieving an order that can be processed', async () => {
    spyOn(orderOrchestrator, 'processOrder').and.returnValue(Promise.resolve(SUCCESS))
    const actual = await orderHandler.handler(EVENT)
    expect(actual.statusCode).toEqual(202)
  })
})
