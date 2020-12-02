npm i -g serverless
serverless login
mkdir serverless-api && cd $_
npm init -y
npm i --save aws-sdk body-parser express node-uuid serverless-http
npm i --save serverless-dynamodb-local@0.2.30 serverless-offline

sls offline start --migrate
    sls dynamodb install
sls deploy


//https://enbonnet.me/article/2/construir-api-nodejs-serverless-con-aws-lambda-y-dyanmodb