import createHttpError from "http-errors";

// Variant 1

// export const validateBody = schema => {
//     return async (req, res, next) => {
//       try {
//         await schema.validateAsync(req.body, {abortEarly: false,});
//         next();
//       } catch (error) {
//         const validateError = createHttpError(400, error.message);
//         next(validateError);
//       }
//     };
//   };

// Variant 2
 const validateBody = schema => {

    const innerFunc =  async (req, res, next) => {
      try {
        await schema.validateAsync(req.body, {abortEarly: false,});
        next();
      } catch (error) {
        const validateError = createHttpError(400, error.message);
        next(validateError);
      }
    };
    return innerFunc;
  };


  export default validateBody;
