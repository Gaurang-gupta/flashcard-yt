import { useNavigate } from "react-router"
import "./AddQuestions.css"
import { useState } from "react"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"
function AddQuestions() {
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const userEmail = sessionStorage.getItem("userEmail")
    const navigate = useNavigate()

    const handleAddQuestion = async (e) => {
        e.preventDefault()
        if(!userEmail | userEmail === ""){
            navigate("/login")
        }
        try{
            const userDocRef = doc(db, "users", userEmail)
            console.log(userDocRef.path)

            // Data to be added to firestore
            const data = {
                question: question,
                answer: answer
            }

            // Add a new document with the data
            await updateDoc(userDocRef, {
                questions: arrayUnion(data)
            })
            alert("Question added sucessfully")
            setQuestion("")
            setAnswer("")
        } catch (error) {
            alert(error.message)
        }
    }

  return (
    <form action="" className="addQuestionForm">
        <div className="addQuestion">
            <div className="addQuestionContainer">
                <label htmlFor="question" className="addQuestionLabel">Question</label>
                <input 
                    type="text" 
                    id="question"
                    name="question"
                    value={question}
                    className="addQuestionInput"
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="question"
                />
            </div>

            <div className="addQuestionContainer">
                <label htmlFor="answer" className="addQuestionLabel">Answer</label>
                <input 
                    type="text" 
                    id="answer"
                    name="answer"
                    value={answer}
                    className="addQuestionInput"
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="answer"
                />
            </div>
        </div>

        <button className="addButton" type="submit" onClick={(e) => handleAddQuestion(e)}>Add Question</button>
    </form>
  )
}

export default AddQuestions