const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, adminCode } = req.body;

    let finalRole = 'user';
    if (role === 'admin') {
      if (adminCode !== process.env.ADMIN_CODE) {
        return res.redirect('/register.html?error=Wrong admin code');
      }
      finalRole = 'admin';
    }

    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.redirect('/register.html?error=Email already used');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword, role: finalRole });
    res.redirect('/login.html');
  } catch (err) {
    console.log(err);
    res.redirect('/register.html?error=Something went wrong');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.redirect('/login.html?error=1');

    const correct = await bcrypt.compare(password, user.password);
    if (!correct) return res.redirect('/login.html?error=1');

    req.session.userId = user.id;
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.redirect('/login.html?error=1');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/login.html'));
};
