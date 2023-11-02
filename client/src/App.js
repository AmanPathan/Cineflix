import "./App.css";
import Home from "./Pages/Home";
import Result from "./Pages/Result";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route
                        exact
                        path="/search/:id"
                        element={<Result />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
