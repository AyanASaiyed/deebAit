export const setAnswers = async (req, res) => {
  try {
    const { answer } = req.body;

    req.session.answers = answer;

    if (!Array.isArray(answer)) {
      return res.status(400).json({ error: "Expected an array" });
    }

    return res.status(200).json({ message: "Answers set", answer });
  } catch (error) {
    console.log("error in setting answer: ", error.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error on setAnswer" });
  }
};
