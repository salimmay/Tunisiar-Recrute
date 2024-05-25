const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];
    console.log(token);
    if (!token)
      return res.status(401).send("Access denied. No token provided.");

    const role = "user";
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== role) {
      return res
        .status(401)
        .send({ message: "Invalid token.", success: false });
    }

    if (req.route.path === "/auth") {
      return res.status(200).send({ message: "Valid token.", success: true });
    } else {
      req.user = decoded;
      next();
    }
  } catch (ex) {
    res.status(500).send({ message: "Something went wrong.", success: false });
  }
};
module.exports = auth;
