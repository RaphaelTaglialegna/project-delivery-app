const md5 = require('md5');
const { User } = require('../database/models');
const { createToken } = require('../middlewares/tokenAuth');

const getUsers = async () => { 
   const users = await User.findAll({ attributes: { exclude: ['password'] } });   
   return users;
};

const getSellers = async () => { 
   const users = await User.findAll({ attributes: { exclude: ['password'] },
   where: { role: 'seller' },
    });

   return users;
};

const deleteUser = async (id) => { 
   const users = await User.destroy({ where: { id } });
   return users;
};

const getUserByEmail = async (email) => { 
   const user = await User.findOne({ where: { email } });   
   return user;
};

const login = async (loginEmail, loginPassword) => { 
   const { name, password, role } = await getUserByEmail(loginEmail);
   if (password === md5(loginPassword)) { 
      return { token: createToken({ name, email: loginEmail, role }) };
   }
   return { error: 'Invalid password' };
};

const createUser = async (userName, userEmail, userPassword) => { 
   const user = await getUserByEmail(userEmail);
   
   if (user) { 
      return { error: 'User already exist!' };
   }
   const password = md5(userPassword);
   const role = 'customer';
   await User.create({ name: userName, email: userEmail, password, role });
   return { token: createToken({ name: userName, email: userEmail, role }) };
};
const createUserAdmin = async (userName, userEmail, userPassword, role) => { 
   const user = await getUserByEmail(userEmail);
   
   if (user) { 
      return { error: 'User already exist!' };
   }
   const password = md5(userPassword);
   const { id } = await User.create({ name: userName, email: userEmail, password, role });
   return { id };
};

module.exports = {
  login,
  getUserByEmail,
  getUsers,
  createUser,
  getSellers,
  deleteUser,
  createUserAdmin,
};