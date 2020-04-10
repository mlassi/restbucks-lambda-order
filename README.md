# restbucks-lambda-order

To create an order:
url -X POST -d '{"orderDetails":[{"item":"latte", "qty":1}, {"item":"coffee", "qty":2}]}' https://{API_GATEWAY_URI}/dev/order