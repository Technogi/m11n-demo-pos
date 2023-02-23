#!/bin/bash

curl --location --request POST 'https://4oyajm3ql4.execute-api.us-east-1.amazonaws.com/prod/' \
--header 'x-api-key: je5uvQ3fX88zh8I0rKzdR4FxSTxqln2CaOFjQ1R7' \
--header 'Content-Type: application/json' \
--data-raw '{"event-type":"NewSale","product-id":1,"sold-on":12345}'