'use strict'

const orderDB = require('../src/orderDB')
const AWS = require('aws-sdk')

describe('order DB', () => {
  it('should return promise when order can be persisted', async () => {
    spyOn(AWS.DynamoDB.DocumentClient.prototype, 'put').and.returnValue({ promise: () => Promise.resolve({}) })

    const actual = await orderDB.saveOrder({})

    expect(actual).toEqual({})
  })

  it('should return unresolved promise when error from DynamoDB', async (done) => {
    spyOn(AWS.DynamoDB.DocumentClient.prototype, 'put').and.throwError('error')

    orderDB.saveOrder({})
      .then(() => done(new Error('Should not be evaluated')))
      .catch(() => done())
  })
})
