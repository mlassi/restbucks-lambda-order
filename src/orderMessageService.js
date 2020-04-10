'use strict'

const AWS = require('aws-sdk')
const logger = require('lambda-log')

const AWS_DEPLOY_REGION = process.env.AWS_DEPLOY_REGION
const SNS_TOPIC_ARN = process.env.SNS_TOPIC_ARN

async function sendMessage (order) {
  logger.info(`arguments ${SNS_TOPIC_ARN} ${AWS_DEPLOY_REGION}`)
  const sns = new AWS.SNS({ region: AWS_DEPLOY_REGION })
  const params = {
    Message: JSON.stringify(order),
    TopicArn: SNS_TOPIC_ARN
  }
  logger.info(`publish event ${JSON.stringify(params)}`)
  return sns.publish(params).promise()
}

module.exports = {
  sendMessage
}
