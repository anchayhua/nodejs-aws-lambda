const requestTarjeta = require("./requestTarjeta");

exports.generartoken = function (event, context, callback) {
    console.log(event.body);
    var result = generarTokenCulqi(event.body);

    callback(null, result);
}

exports.procesarcargo = function (event, context, callback) {

    var params = JSON.parse(event.body)

    if (params.token == undefined || params.token == null) {
        callback(null, JSON.stringify({ statusCode: 400, message: "Token invalido" }));
    }

    var result = procesarCargoCulqi(params.body);

    callback(null, result);
}

exports.obtenertarjeta = function (event, context, callback) {

    if (event.pathParameters.token == undefined || event.pathParameters.token == null) {
        callback(null, JSON.stringify({ statusCode: 400, message: "Token invalido" }));
    }

    var result = obtenertarjeta(event.pathParameters.token);

    callback(null, result);
}

function generarTokenCulqi(params) {
    //Se enviara al proxi o servicio exterior para los APIS de Cuclqi
    return JSON.stringify({ message: "exitoso" });
}

function procesarCargoCulqi(params) {
    //En caso de ser exitoso, se envia el toquen para procesar el cargo en las apps de Culqi
    return JSON.stringify({
        statusCode: 200,
        message: "exitoso",
        value: {
            card_number: 4251658745578785,
            expiration_month: "12",
            expiration_year: "2026",
            email: "prueba@prueba.com"
        }
    });
}

function obtenertarjeta(params) {
    //Metodo para obtenre los datos de la tarjeta alamacenada
    return JSON.stringify({
        statusCode: 200,
        message: "exitoso",
        value: {
            card_number: 4251658745578785,
            expiration_month: "12",
            expiration_year: "2026",
            email: "prueba@prueba.com"
        }
    });
}