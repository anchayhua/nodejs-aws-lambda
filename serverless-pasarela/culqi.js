exports.generartoken = function (event, context, callback) {
    var foo = event.foo;
    var bar = event.bar;
    console.log(event.body);
    var result = generarTokenCulqi(event.body);

    callback(null, result);
}

exports.procesarcargo = function (event, context, callback) {
    var foo = event.foo;
    var bar = event.bar;
    console.log(event.body);
    var result = procesarCargoCulqi(event.body);

    callback(null, result);
}

exports.obtenertarjeta = function (event, context, callback) {
    var foo = event.foo;
    var bar = event.bar;
    console.log(event.body);
    var result = obtenertarjeta(event.body);

    callback(null, result);
}

function generarTokenCulqi(params) {
    //Se enviara al proxi o servicio exterior para los APIS de Cuclqi
    return JSON.stringify({ message: "correcto" });
}

function procesarCargoCulqi(params) {
    //En caso de ser exitoso, se envia el toquen para procesar el cargo en las apps de Culqi
    return JSON.stringify({ message: "correcto" });
}

function obtenertarjeta(params) {
    //Metodo para obtenre los datos de la tarjeta alamacenada
    return JSON.stringify({ message: "correcto" });
}