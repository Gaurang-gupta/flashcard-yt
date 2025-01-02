import { useState, useEffect } from "react"
import { db } from "../../firebase";
import { doc, getDoc, arrayRemove, updateDoc } from "firebase/firestore";

function Questions() {
  const [questions, setQuestions] = useState([])
  const userEmail = sessionStorage.getItem("userEmail")
  useEffect(() => {
    const fetchQuestions = async () => {
        try {
            const userDocRef = doc(db, 'users', userEmail);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                if (userData.questions) {
                    setQuestions(userData.questions);
                } else {
                    console.log("No questions array found in user document.");
                }
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching document: ", error);
        }
        console.log(questions)
    };

    fetchQuestions();
  }, [userEmail]);

  const handleDeleteQuestion = async (qa) => {
    try {
      const userDocRef = doc(db, 'users', userEmail);
      await updateDoc(userDocRef, {
        questions: arrayRemove(qa)
      });

      setQuestions(questions.filter(item => item.question !== qa.question));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
    return (
      <div className="xs:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">All Questions</h1>
        <ul className="bg-white shadow-md rounded-lg">
          {questions.length > 0 ? questions.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 border-b last:border-none"
            >
                <div className="text-left">
                    <p>Q: {item.question}</p>
                    <p>A: {item.answer}</p>
                </div>
              
                <button
                    onClick={() => handleDeleteQuestion(item)}
                    className="text-red-500 hover:text-red-700"
                >
                    Delete
                </button>
            </li>
          )) : <p>No questions are here</p>}
          
        </ul>
      </div>
    )
}

export default Questions