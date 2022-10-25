// const serverless = require('serverless-http')
// const bodyParser = require('body-parser')
// const express = require('express')
// const app = express()
// const AWS = require('aws-sdk')
// const uuid = require('node-uuid')

// var Request = require("request")

// const { TODOS_TABLE, IS_OFFLINE } = process.env

// const dynamoDb =
//     IS_OFFLINE === 'true'
//         ? new AWS.DynamoDB.DocumentClient({
//             region: 'localhost',
//             endpoint: 'http://localhost:8000',
//         })
//         : new AWS.DynamoDB.DocumentClient()

// app.use(bodyParser.json({ strict: false }))

// app.get('/general', (req, res) => {
//     const params = {
//         TableName: TODOS_TABLE,
//     }

//     dynamoDb.scan(params, (error, result) => {
//         if (error) {
//             res.status(400).json({ error: 'Error al recuperar los datos' })
//         }

//         const { Items: todos } = result

//         res.json({ todos })
//     })
// })

// app.post('/general', (req, res) => {
//     const { title, done = false } = req.body

//     const todoId = uuid.v4()

//     const params = {
//         TableName: TODOS_TABLE,
//         Item: {
//             todoId,
//             title,
//             done,
//         },
//     }

//     dynamoDb.put(params, error => {
//         if (error) {
//             console.log('Error al crear dato: ', error)
//             res.status(400).json({ error: 'No se pudo crear la data' })
//         }

//         res.json({ todoId, title, done })
//     })
// })

// app.get('/general/:todoId', (req, res) => {
//     const { todoId } = req.params

//     const params = {
//         TableName: TODOS_TABLE,
//         Key: {
//             todoId,
//         },
//     }

//     dynamoDb.get(params, (error, result) => {
//         if (error) {
//             res.status(400).json({ error: 'Error al recupera la data' })
//         }

//         if (result.Item) {
//             const { todoId, title, done } = result.Item
//             res.json({ todoId, title, done })
//         } else {
//             res.status(404).json({ error: `Todo with id: ${todoId} not found` })
//         }
//     })
// })

// app.put('/general', (req, res) => {
//     const { todoId, title, done } = req.body

//     var params = {
//         TableName: TODOS_TABLE,
//         Key: { todoId },
//         UpdateExpression: 'set #a = :title, #b = :done',
//         ExpressionAttributeNames: { '#a': 'title', '#b': 'done' },
//         ExpressionAttributeValues: { ':title': title, ':done': done },
//     }

//     dynamoDb.update(params, error => {
//         if (error) {
//             console.log(`Error al actualizar con el id ${todoId}: `, error)
//             res.status(400).json({ error: 'No se pudo actualizar la data' })
//         }

//         res.json({ todoId, title, done })
//     })
// })

// app.delete('/general/:todoId', (req, res) => {
//     const { todoId } = req.params

//     const params = {
//         TableName: TODOS_TABLE,
//         Key: {
//             todoId,
//         },
//     }

//     dynamoDb.delete(params, error => {
//         if (error) {
//             console.log(`Erro al actualizar con el id ${todoId}`, error)
//             res.status(400).json({ error: 'No se pudo eliminar el dato' })
//         }

//         res.json({ success: true })
//     })
// })

// //////////////////// Consumiendo otro serivicio /////////////////////////////

// app.get('/starwars', (req, res) => {

//     Request.get("https://swapi.py4e.com/api/people/1/?format=json", (error, response, body) => {
//         if (error) {
//             res.status(400).json({ error: 'Error al obtener los datos' })
//         }

//         if (body) {

//             var listfilmaciones = [];

//             res.json(
//                 {
//                     nombre: JSON.parse(body).name,
//                     altura: JSON.parse(body).height,
//                     masa: JSON.parse(body).mass,
//                     color_cabello: JSON.parse(body).hair_color,
//                     color_piel: JSON.parse(body).skin_color,
//                     color_ojo: JSON.parse(body).eye_color,
//                     anio_nacimiento: JSON.parse(body).birth_year,
//                     genero: JSON.parse(body).gender,
//                     nacionalidad: JSON.parse(body).homeworld
//                 }
//             )
//         } else {
//             res.json(JSON.parse(body))
//         }
//     });
// })

// module.exports.handler = serverless(app)

// //https://enbonnet.me/article/2/construir-api-nodejs-serverless-con-aws-lambda-y-dyanmodb
// //https://www.trendmicro.com/de_de/devops/22/c/how-to-build-a-serverless-api-with-lambda-and-node-js.html