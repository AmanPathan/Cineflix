import React, { useState, useEffect } from "react";
import './components/styles/all.css';
import Navbar from "./components/Navbar";
import Trending from "./components/Trending";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const apiKey = "api_key=72e6a0925bc8daf021f1b91c432c7c20";
    const [list, setList] = useState([]);
    const [homeGenreList, setHomeGenreList] = useState([{}]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [currMovies, setCurrMovies] = useState([{}]);
    const [inputValue, setInputValue] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        setCurrMovies([]);
        setSelectedGenres([]);
        setHomeGenreList([]);
        setList([]);
        fetch("http://localhost:5000/api/movies").then((Response) =>
            Response.json().then((data) => setList(data.arr))
        );
        fetch(`https://api.themoviedb.org/3/genre/movie/list?${apiKey}`).then(
            (Response) =>
                Response.json().then((data) => setHomeGenreList(data.genres))
        );
    }, []);

    const handleScroll = () => {
        const element = document.getElementById('content');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const handleChange = (event) => {
        /*Handling the change in inputValue when the user types in the searchbar*/
        setNotFound(false);
        const wordEntered = event.target.value.trim();
        setInputValue(wordEntered);
        const newFilter = list.filter((value) => {
            /*filtering the movie list according to searched movie*/
            return value.toLowerCase().includes(wordEntered.toLowerCase());
        });
        setFilteredMovies([]);
        if (newFilter.length > 0) {
            setFilteredMovies(newFilter);
        }
        if (wordEntered.length === 0) {
            setFilteredMovies([]);
        }
    };
    const buttonSubmit = () => {
        let flag = false;

        for (let movie of list) {
            if (inputValue.toLowerCase() === movie.toLowerCase()) {
                flag = true;
                break;
            }
        }
        if (flag) {
            navigate(`/search/${inputValue}`);
            handleScroll();
        } else {
            setNotFound(true);
        }
    };
    return (
        <>
            <div className='herosection'>
                <div className='container col-md-11 '>
                    <Navbar />
                    <div className="container greet">
                        <h1>Welcome to <span><i>Cineflix</i></span></h1>
                        <p className="landing_text">Trying to find the perfect movie for your mood? Look no further!</p>
                        <p className="landing_text1">Because,Cineflix Knows Your <span>Flicks!</span></p>
                        <button onClick={handleScroll} className="getstarted">Get Started <i className="fa-solid fa-angle-right"></i></button>
                    </div>
                </div>
            </div>
            <div className='content' id='content'>
                <div className="search">
                    <input type="text"
                        id="inputbox"
                        name="inputbox"
                        list="data"
                        className="search_text"
                        placeholder="Search Movies, TV Series, Web Series & More.. "
                        autoComplete="off"
                        onChange={handleChange}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                buttonSubmit();
                            }
                        }}
                    />
                    <button className="search_glass">
                        <i className="fa-solid fa-magnifying-glass fa-fade"></i>
                    </button>
                </div>
                {filteredMovies.length > 0 ? (
                    <div className="searchList">
                        {filteredMovies.slice(0, 10).map((movie) => (
                            <div
                                className="searchItem"
                                onClick={() => navigate(`/search/${movie}`)}
                            >
                                {movie}
                            </div>
                        ))}
                    </div>
                ) : null}
                {notFound && filteredMovies.length === 0 ? (
                    <div className="NotFound">
                        Oops!! Looks like the movie you trying to search is not in our database.
                    </div>
                ) : null}
            </div>
            <Trending/>
        </>
    )
}
export default Home;