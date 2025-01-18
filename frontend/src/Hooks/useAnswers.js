export const useAnswers = () => {
  const responses = async (answers, players) => {
    try {
      const res = await fetch("http://localhost:4000/answers/setAnswers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: answers }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      console.log("Answers saved successfully!");

      const rankingRes = await fetch(
        "http://localhost:4000/ai/generate-ranking",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(answers, players),
        }
      );

      if (!rankingRes.ok) {
        const rankingErr = await rankingRes.json();
        throw new Error(rankingErr.error);
      }

      const rankingData = await rankingRes.json();
      console.log("AI Ranking: ", rankingData.ranking);
    } catch (error) {
      console.log("Error in useAnswers Hook: ", error.message);
    }
  };

  return responses;
};
