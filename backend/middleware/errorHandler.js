
export const errorHandler = (err, req, res, next) => {
  console.error('Error details:', err.message);


  if (res.headersSent) {
    return next(err);
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'The requested record was not found.',
    });
  }


  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected server error occurred.',
  });
};
