import jwt from 'jsonwebtoken';

const { SALT } = process.env;

// need to use this as middleware before all our protected backend routes,
// prob need to change to send authtoken thru req header from frontend
// then this fn will take the token thru the req header
// if jwt.verify fails then throw error and dont execute request

const checkAuth = (req, res, next) => {
  try {
    const authToken = req.header('Authorization').replace('Bearer ', '');
    const userInfo = jwt.verify(authToken, SALT);
    req.userId = userInfo.id;
  } catch (err) {
    // res.status(403).json({ err });
    console.log('no user info');
  } finally {
    next();
  }
};

export default checkAuth;
