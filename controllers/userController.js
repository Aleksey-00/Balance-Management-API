import { sequelize } from '../models/index.js';
import User from '../models/user.js';

class UserController {
  async updateBalance(req, res) {
    const { userId } = req.params;
    const { amount } = req.body;

    try {
      const result = await sequelize.transaction(async (t) => {
        const user = await User.findOne({
          where: { id: userId },
          lock: true,
          transaction: t
        });

        if (!user) {
          throw new Error('User not found');
        }

        const newBalance = parseFloat(user.balance) + parseFloat(amount);
        
        if (newBalance < 0) {
          throw new Error('Insufficient funds');
        }

        user.balance = newBalance;
        await user.save({ transaction: t });
        
        return user;
      });

      res.json({ 
        success: true, 
        balance: result.balance 
      });

    } catch (error) {
      if (error.message === 'Insufficient funds') {
        return res.status(400).json({ 
          success: false, 
          error: 'Недостаточно средств на балансе' 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }
}

export default new UserController(); 