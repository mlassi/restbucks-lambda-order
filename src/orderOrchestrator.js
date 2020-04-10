'use strict'

const logger = require('lambda-log')
const uuid = require('uuid')
const orderDB = require('./orderDB')
const orderMessageService = require('./orderMessageService')
const { accepted, error } = require('./response')

async function processOrder (order) {

  try {
    order.orderID = uuid.v4()
    const dbResponse = await orderDB.saveOrder(order)
    logger.info(JSON.stringify(dbResponse))
  } catch (e) {
    logger.error(`error saving order ${e}`)
    return error(500, 'Internal Error')
  }

  try {
    const messageResponse = orderMessageService.sendMessage(order)
    logger.info(`message response: ${JSON.stringify(messageResponse)}`)
  } catch (e) {
    logger.error(`error retrieving message response ${e}`)
    return error(500, 'Internal Error')
  }

  return accepted(order.orderID)
}

module.exports = {
  processOrder
}
