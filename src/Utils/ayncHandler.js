const asyncHandler = (requesHandler) => {
  (req, res, next) => {
    Promise.resolve(requesHandler(req, res, next)).catch((error) =>
      next(erro9r)
    );
  };
};


export default asyncHandler;

// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async() => {}

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
