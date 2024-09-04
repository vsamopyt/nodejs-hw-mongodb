const errorHandler = (err, req, res, next) => {
  const { status = 500, message } = err;
  if(status === 500) {
    res.status(status).json({
        status: res.status,
        message: 'Something went wrong',
        data: message,
      });
  }
  res.status(status).json({
     message,
  });
};
export default errorHandler;
