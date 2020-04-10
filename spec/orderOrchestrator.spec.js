'use strict'

const orderOrchestrator = require('../src/orderOrchestrator')
const orderDB = require('../src/orderDB')
const orderMessageService = require('../src/orderMessageService')

describe('order orchestrator', () => {
  it('should return accepted status code when receiving an order that can be persisted and published', async () => {
    spyOn(orderDB, 'saveOrder').and.returnValue(Promise.resolve({}))
    spyOn(orderMessageService, 'sendMessage').and.returnValue(Promise.resolve({}))

    const actual = await orderOrchestrator.processOrder({})

    expect(actual.statusCode).toEqual(202)
  })

  it('should return error status code when receiving an order that fails to persist', async () => {
    spyOn(orderDB, 'saveOrder').and.throwError('error saving')
    spyOn(orderMessageService, 'sendMessage').and.returnValue(Promise.resolve({}))

    const actual = await orderOrchestrator.processOrder({})

    expect(actual.statusCode).toEqual(500)
  })

  it('should return error status code when receiving an order that fails to be published', async () => {
    spyOn(orderDB, 'saveOrder').and.returnValue(Promise.resolve({}))
    spyOn(orderMessageService, 'sendMessage').and.throwError('failed to publish message')

    const actual = await orderOrchestrator.processOrder({})

    expect(actual.statusCode).toEqual(500)
  })
})
