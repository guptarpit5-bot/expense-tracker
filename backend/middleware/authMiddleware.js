
export const protect = (req, res, next) => {
  const userIdHeader = req.headers['x-user-id'];

  if (!userIdHeader) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Please log in first.',
    });
  }

  const userId = parseInt(userIdHeader, 10);
  if (isNaN(userId)) {
    return res.status(401).json({
      success: false,
      message: 'Invalid user session. Please log in again.',
    });
  }

 
  req.userId = userId;
  next();
};
