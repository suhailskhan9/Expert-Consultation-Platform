import Home from "./components/Home"
import ExpertLoginSignUp from "./components/ExpertLoginSignUp"
import UserLoginSignUp from "./components/UserLoginSignUp"
import {  Routes,  Route} from "react-router-dom";
function App() {


  return (

    <Routes>
       {/* LandingPage Route */}
        <Route exact path="/" Component={Home} />

        {/* Expert Page Route */}
        <Route path="/expert" Component={ExpertLoginSignUp} />

        {/* User Page Route */}
        <Route path="/user" Component={UserLoginSignUp} />

        {/* Add additional routes as needed */}

        {/* Default Route (404 Page) */}
        <Route path="*" render={() => <div>404 - Page Not Found</div>} />
      
  </Routes>

  )
}

export default App
