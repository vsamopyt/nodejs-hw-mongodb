import createHttpError from "http-errors";
// const notFoundHandler =
//     (reg, res) => {
//         res.status(404).json({ message: `${reg.url} not found` });
//       };
// export default notFoundHandler;

const notFoundHandler =
    (reg, res, next) => {
        // res.status(404).json({ message: `${reg.url} not found` });
        throw createHttpError(404,`Route ${reg.url} not found`);
       
      };
export default notFoundHandler;
