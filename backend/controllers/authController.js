import prisma from '../config/db.js';


export const register = async (req, res) => {
  const { username, password } = req.body;

 
  if (!username || typeof username !== 'string' || username.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Username is required.',
    });
  }

  if (!password || typeof password !== 'string' || password.length < 4) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 4 characters long.',
    });
  }

  const existingUser = await prisma.user.findUnique({
    where: { username: username.toLowerCase().trim() },
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'Username is already taken. Please choose another.',
    });
  }

  // Create User
  const newUser = await prisma.user.create({
    data: {
      username: username.toLowerCase().trim(),
      password: password, 
    },
  });

  res.status(201).json({
    success: true,
    message: 'Account created successfully. You can now log in!',
    data: {
      id: newUser.id,
      username: newUser.username,
    },
  });
};


export const login = async (req, res) => {
  const { username, password } = req.body;


  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required.',
    });
  }


  const user = await prisma.user.findUnique({
    where: { username: username.toLowerCase().trim() },
  });

  if (!user || password !== user.password) {
    return res.status(401).json({
      success: false,
      message: 'Invalid username or password.',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Login successful!',
    data: {
      id: user.id,
      username: user.username,
    },
  });
};
