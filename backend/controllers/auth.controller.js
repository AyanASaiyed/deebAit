export const login = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ error: "Must have a username to continue!" });
    }

    req.session.username = username;

    return res.status(200).json({ message: "Login Successful!", username });
  } catch (error) {
    console.log("Error in Login Controller");
    return res
      .status(500)
      .json({ error: "Internal Server Error on login controller" });
  }
};

export const session = async (req, res) => {
  if (!req.session.username) {
    return res.status(400).json({ error: "Must be Logged in" });
  }

  return res.status(200).json({ username: req.session.username });
};

export const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log("Error destroying session:", err);
        return res
          .status(500)
          .json({ error: "Failed to log out. Please try again." });
      }

      res.clearCookie("connect.sid", { path: "/" });
      return res.status(200).json({ message: "Logged Out Successfully" });
    });
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error on Logout" });
  }
};
