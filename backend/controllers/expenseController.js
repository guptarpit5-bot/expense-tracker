import prisma from '../config/db.js';


export const getExpenses = async (req, res) => {
  const expenses = await prisma.expense.findMany({
    where: {
      userId: req.userId,
    },
    orderBy: {
      expenseDate: 'desc',
    },
  });

  return res.status(200).json({
    success: true,
    count: expenses.length,
    data: expenses,
  });
};

export const getExpenseById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid expense ID.',
    });
  }

  const expense = await prisma.expense.findUnique({
    where: { id },
  });

  
  if (!expense) {
    return res.status(404).json({
      success: false,
      message: 'Expense not found.',
    });
  } else {
    if (expense.userId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to view this expense.',
      });
    } else {
      return res.status(200).json({
        success: true,
        data: expense,
      });
    }
  }
};


export const createExpense = async (req, res) => {
  const { title, amount, category, expenseDate, description } = req.body;

  
  if (!title || !amount || !category || !expenseDate) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required.',
    });
  } else {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than zero.',
      });
    } else {
    
      const newExpense = await prisma.expense.create({
        data: {
          title: title.trim(),
          amount: parsedAmount,
          category: category,
          expenseDate: new Date(expenseDate),
          description: description || null,
          userId: req.userId,
        },
      });

      return res.status(201).json({
        success: true,
        message: 'Expense created successfully',
        data: newExpense,
      });
    }
  }
};


export const updateExpense = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid expense ID.',
    });
  }

  const { title, amount, category, expenseDate, description } = req.body;

  if (!title || !amount || !category || !expenseDate) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required.',
    });
  } else {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than zero.',
      });
    } else {
    
      const existingExpense = await prisma.expense.findUnique({
        where: { id },
      });


      if (!existingExpense) {
        return res.status(404).json({
          success: false,
          message: 'Expense not found.',
        });
      } else {
        if (existingExpense.userId !== req.userId) {
          return res.status(403).json({
            success: false,
            message: 'You are not authorized to update this expense.',
          });
        } else {
      


          
          const updatedExpense = await prisma.expense.update({
            where: { id },
            data: {
              title: title.trim(),
              amount: parsedAmount,
              category: category,
              expenseDate: new Date(expenseDate),
              description: description || null,
            },
          });

          return res.status(200).json({
            success: true,
            message: 'Expense updated successfully',
            data: updatedExpense,
          });
        }
      }
    }
  }
};


export const deleteExpense = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid expense ID.',
    });
  }

  
  const existingExpense = await prisma.expense.findUnique({
    where: { id },
  });

  
  if (!existingExpense) {
    return res.status(404).json({
      success: false,
      message: 'Expense not found.',
    });
  } else {
    if (existingExpense.userId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this expense.',
      });
    } else {
      // Perform delete
      await prisma.expense.delete({
        where: { id },
      });

      return res.status(200).json({
        success: true,
        message: 'Expense deleted successfully',
      });
    }
  }
};
