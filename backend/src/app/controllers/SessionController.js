import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth.configuration';

import User from '../models/User';

class SessionController {
  async store(request, response) {
    const { email, password } = request.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return response.status(400).json({ error: 'User not found' });
      }

      if (!(await user.checkPassword(password))) {
        return response.status(400).json({ error: "Password don't match." });
      }

      const { id, name } = user;
      const { secret, expiresIn } = authConfig;

      const token = jwt.sign({ id }, secret, {
        expiresIn,
      });

      return response.json({
        user: {
          id,
          name,
          email,
        },
        token,
      });
    } catch (error) {
      return response.status(500).json({ error: 'Something wrong.' });
    }
  }
}

export default new SessionController();
