export const useAnswers = () => {
  const responses = async (answers) => {
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
    } catch (error) {
      console.log("Error in useAnswers Hook: ", error.message);
    }
  };

  return responses;
};
