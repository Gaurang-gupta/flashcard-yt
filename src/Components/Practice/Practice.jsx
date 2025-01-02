import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Flashcard from "../Flashcard/Flashcard";
function Practice() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const userEmail = sessionStorage.getItem('userEmail');

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
        };
    
        fetchQuestions();
      }, [userEmail]);
    
      const handleNextPractice = () => {
        setCurrentIndex((currentIndex + 1) % questions.length);
      };
  return (
    <>
        {questions.length>0 && <>
        <Flashcard front={questions[currentIndex]?.question} back={questions[currentIndex]?.answer} />
        <button className="nextButton" onClick={handleNextPractice}>Next</button>
        </>
        }
    </>
  )
}

export default Practice