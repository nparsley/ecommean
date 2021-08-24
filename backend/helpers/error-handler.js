function errorHandler(err, req, res, next) {

    // unauth jwt
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({message: 'the user is not authorized'})
    }
    
    // invalid doc, etc
    if (err.name === 'ValidationError') {
        return res.status(401).json({message: err})
    }

    // general err - default to 500 server
    return res.status(500).json({err})
}

module.exports = errorHandler;

