import { useState } from "react"
import LoginForm from "../LoginForm"
import SignUpForm from "../SignUpForm"


function UserLoginSignUp(){

    const [isLogin, setIsLogin] = useState(true)

    const toggleMode = () => {
        setIsLogin(!isLogin)
    }


    return(
        <>
        {isLogin ?(
        <LoginForm
         userType = "User"
         toggleMode = {toggleMode}
         
         />
):
        ( <SignUpForm 
         userType = "User"
         toggleMode = {toggleMode}
         // leftPanel= "transition-transform duration-500 ease-in-out transform translate-x-full"
         // rightPanel = "transition-transform duration-500 ease-in-out transform -translate-x-full"
         />)
         }

     </>
    )
}

export default UserLoginSignUp