import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import './api/axiosDefaults'
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { createContext, useContext, useEffect } from "react";
import axios from "axios";

export const CurrentUserContext = createContext()
export const SetCurrentUserContext = createContext()

function App() {
  const [currentUser, setCurrentUser] = useContext(null)

  const handleMount = async (event) => {
    try {
      const {data} = await axios.get('dj-rest-auth/user/')
      setCurrentUser(data)
    } catch (err){
      console.log(err)
    }
  }

  useEffect(() => {
    handleMount()
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home Page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm/>} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route render={() => <h1>Page Not Found</h1>} />
        </Switch>
      </Container>
    </div>
    </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
