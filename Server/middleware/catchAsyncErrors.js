
//To resolve promise pending error,this is a higher order function

module.exports = (theFunc) =>
    (req, res, next) => {
        Promise
            .resolve(theFunc(req, res, next))
            .catch(next);

    };