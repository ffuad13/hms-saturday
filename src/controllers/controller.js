exports.helloWorld = (req, res, next) => {
    res.send('<h1>Halo Student Hari Senin!</h1>');
};

exports.helloMoto = (req, res, next) => {
    console.log('ini request query :>> ', req.query);
    res.send({
        response: req.model
    })
}