import "./App.css";
import Landing from "./components/landing/Landing";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import Create from "./components/Create/Create";
import Details from "./components/details/Details";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/crear">
          <Create />
        </Route>
        <Route exact path="/details/:id">
          <Details />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
