import { useNavigate } from 'react-router';
import { auth, db } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDoc, setDoc, doc } from 'firebase/firestore';
function Login() {
    const navigate = useNavigate();

    const checkAddCreateUserCollections = async (email) => {
        const userDocRef = doc(db, "users", email)
        const userDoc = await getDoc(userDocRef)

        if(!userDoc.exists()){
            await setDoc(userDocRef, {
                createdAt: new Date(),
                questions: [],
                results: []
            })
        }
    }

    const handleGoogleLogin = async() => {
        const provider = new GoogleAuthProvider();
        try{
            const result = await signInWithPopup(auth, provider)
            const userEmail = result.user.email 
            await checkAddCreateUserCollections(userEmail)
            sessionStorage.setItem("userEmail", userEmail)
            alert("Login Successful")
            navigate("/")
        } catch (error) {
            alert(error.message)
        }
    }
  return (
    <div className='bg-[#8fd3f4] flex items-center justify-center min-h-screen'>
        <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
            <h2 className='text-2xl font-bold mb-6 text-center'>
                Login
            </h2>
            <button 
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline'
            onClick={handleGoogleLogin}
            >
                Login with Google
            </button>
        </div>
    </div>
  )
}

export default Login