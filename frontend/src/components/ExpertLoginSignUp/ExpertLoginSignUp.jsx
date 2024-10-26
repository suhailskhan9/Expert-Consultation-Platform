import { useState } from "react"
import LoginForm from "../LoginForm"
import SignUpForm from "../SignUpForm"
function ExpertLoginSignUp(){

    const [isLogin, setIsLogin] = useState(true)

    const toggleMode = () => {
        setIsLogin(!isLogin)
    }



    return(
        <>
           {isLogin ?(
           <LoginForm
            userType = "Expert"
            toggleMode = {toggleMode}
            
            />
):
           ( <SignUpForm 
            userType = "Expert"
            toggleMode = {toggleMode}
            // leftPanel= "transition-transform duration-500 ease-in-out transform translate-x-full"
            // rightPanel = "transition-transform duration-500 ease-in-out transform -translate-x-full"
            />)
            }

        </>
    )
}

export default ExpertLoginSignUp