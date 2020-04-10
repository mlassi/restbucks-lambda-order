'use strict'

const AWS = require('aws-sdk')

const ORDER_TABLE = process.env.ORDER_TABLE
const dynamoDb = new AWS.DynamoDB.DocumentClient()

async function saveOrder (order) {
  const params = {
    TableName: ORDER_TABLE,
    Item: {
      orderId: order.orderID,
      orderDetails: order.orderDetails,
      datePosted: new Date().toUTCString()
    }
  }

  return dynamoDb.put(params).promise()
}

module.exports = {
  saveOrder
}
