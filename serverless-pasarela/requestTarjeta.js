module.exports = RequestTarjeta => {
    return RequestTarjeta.object({
        card_number: RequestTarjeta.number().required()
        // userName: RequestTarjeta.string().min(5).max(30).required(),
        // email: RequestTarjeta.string()
        //     .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        //     .required(),
        // password: RequestTarjeta.string()
        //     .pattern(
        //         new RegExp(
        //             "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        //         )
        //     )
        //     .required(),
        // repeatPassword: RequestTarjeta.ref("password"),
    });
}