export const players = async (req, res) => {
  try {
    const { persons } = req.body;
    console.log("received data: ", persons);

    if (!Array.isArray(persons)) {
      return res.status(400).json({ error: "Expected an array" });
    }

    return res.status(200).json({ message: "Players set", persons });
  } catch (error) {
    console.log("error in players API, ", error.message);
    return res.status(500).json({ error: "Error in players API", error });
  }
};
