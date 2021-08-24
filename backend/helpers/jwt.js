const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        // user revoked function specifify if user is admin or not
        isRevoked: isRevoked
    }).unless({
        path: [
            // {url: `${api}/products`, methods: ['GET', 'OPTIONS']},
            {url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            `${api}/users/login`,
            `${api}/users/register`
        ]
    })
}


async function isRevoked(req, payload, done) {
    // rejected if not admin
    if(!payload.isAdmin) {
        done(null, true)
    }

    done();
}



module.exports = authJwt;