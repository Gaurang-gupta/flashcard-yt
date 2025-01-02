import { useEffect, useState } from "react"
import "./Navbar.css"
import { Link, useNavigate } from "react-router"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase"

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(true)
    const userEmail = sessionStorage.getItem("userEmail")
    const navigate = useNavigate()

    const logoutUser = async() => {
      try{
        await signOut(auth)
        sessionStorage.clear()
        navigate("/login")
      } catch (error) {
        alert(error.message)
      }
    }

    useEffect(() => {
      const checkLoginUser = () => {
        if(!userEmail){
          navigate("/login")
        }
      }
      checkLoginUser()
    }, [])

  return (
    <nav>
      <Link to="/" className="title">
        FlashCard
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
            <Link to={"/addQuestions"}>Add Questions</Link>
        </li>
        <li>
            <Link to={"/questions"}>Question List</Link>
        </li>
        <li>
            <a onClick={logoutUser}>Log Out</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar