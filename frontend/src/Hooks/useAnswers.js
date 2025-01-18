export const useAnswers = () => {
  const responses = async (answers) => {
    try {
      const res = await fetch("http://localhost:4000/answers/setAnswers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: answers }),
      });

      console.log(res);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      const data = await res.json();
      sessionStorage.setItem("answers", answers);
      console.log("ANSWERS: ", answers);
      console.log("DATA: ", data);
    } catch (error) {
      console.log("Error in useAnswers Hook: ", error);
    }
  };

  return responses;
};
