serverless create --template aws-nodejs --path candidate-service --name candidate
sls deploy
    curl -X POST https://e45ylqgbsi.execute-api.us-east-1.amazonaws.com/dev/candidates

serverless deploy -v
    curl -H "Content-Type: application/json" -X POST -d '{"fullname":"Shekhar Gulati","email": "shekhargulati84@gmail.com", "experience":12}' https://e45ylqgbsi.execute-api.us-east-1.amazonaws.com/dev/candidates