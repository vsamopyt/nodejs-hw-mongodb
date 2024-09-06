import createHttpError from "http-errors";


const notFoundHandler =
    (reg, res, next) => {

        throw createHttpError(404,`Route ${reg.url} not found`);

      };
export default notFoundHandler;
