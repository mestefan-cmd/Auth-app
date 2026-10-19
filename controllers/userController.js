const path = require('path');
const User = require('../models/User');

exports.showDashboard = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'dashboard.html'));
};

exports.getMe = async (req, res) => {
  const user = await User.findByPk(req.session.userId);
  res.json({ name: user.name, role: user.role });
};
