'use strict'

function error (code, message) {
  return build(code,
    {
      message: message
    })
}

function accepted (orderID) {
  return build(202,
    {
      message: 'Accepted',
      orderID: orderID
    })
}

function build (code, body) {
  return {
    statusCode: code,
    body: JSON.stringify(body)
  }
}

module.exports = { accepted, error }
