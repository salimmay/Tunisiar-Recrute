const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    const userHeader = req.headers["x-auth-user"];

    // Deserialize JSON string to object
    const { token, role } = JSON.parse(userHeader);

    if (!token)
      return res.status(401).send("Access denied. No token provided.");

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
