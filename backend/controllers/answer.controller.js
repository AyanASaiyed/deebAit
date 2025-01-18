export const setAnswers = async (req, res) => {
  try {
    const { answer } = req.body;
    const user = req.session.username;

    if (!user) {
      return res.status(400).json({ error: "Please Login first" });
    }
    req.session.answer = answer;

    return res.status(200).json({ message: "Answer Saved!", answer });
  } catch (error) {
    console.log("error in setting answer: ", error.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error on setAnswer" });
  }
};

export const getAnswers = async (req, res) => {
  try {
    const user = req.session.answer;
  } catch (error) {
    console.log("error in getting answer: ", error.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error on getAnswer" });
  }
};
