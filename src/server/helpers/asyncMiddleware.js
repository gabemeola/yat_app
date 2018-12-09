/**
 * Middleware for catching async promise errors
 * and passing to next middleware function.
 *
 * @example: https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
 * @param {function} route
 */
export default function asyncMiddleware(route) {
    return (req, res, next) => {
        Promise
            .resolve(route(req, res, next))
            .catch(next);
    };
}
