'use strict'

const orderOrchestrator = require('./orderOrchestrator')
const logger = require('lambda-log')

exports.handler = async function (event) {
  logger.info(`received event ${JSON.stringify(event)}`)
  const order = JSON.parse(event.body)

  return await orderOrchestrator.processOrder(order)
}
