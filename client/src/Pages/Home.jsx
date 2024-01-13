import React, { useState, useEffect } from "react";
import './components/styles/all.css';
import './components/styles/Hero.css';
import './components/styles/Navbar.css';
import logo from './components/images/cineflix.png';
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
    const handleScrollTrend = () => {
        const element = document.getElementById('trend');
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
            <div className="home_container">
                {/* navbar */}
                <div className="navbar-mobile">
                    <div className="nav_left">
                        <img className="logo" src={logo} />
                    </div>
                    <div className="nav_right">
                        <a href="https://github.com/AmanPathan/Cineflix" target="_blank" className="github_btn"><i class="fa-brands fa-github"></i></a>
                    </div>
                </div>
                <div className="navbar">
                    <div className="left">
                        <img className="logo" src={logo} />
                    </div>
                    <div className="mid">
                        <div className="search_div">
                            <i className="fa-solid fa-search"></i>
                            <input type="text"
                                id="inputbox"
                                name="inputbox"
                                list="data"
                                className="search"
                                placeholder="Search Movies to Get Recommendations... "
                                autoComplete="off"
                                onChange={handleChange}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        buttonSubmit();
                                    }
                                }}
                            />
                        </div>
                        {filteredMovies.length > 0 ? (
                            <div className="searchList">
                                {filteredMovies.slice(0, 5).map((movie) => (
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
                            <div className="searchList">
                                <div className="searchItem1">
                                    No Match Found!
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <div className="right">
                        <a href="https://github.com/AmanPathan/Cineflix" target="_blank" className="github_btn"><i class="fa-brands fa-github"></i></a>
                    </div>
                </div>

                {/* navbar end */}
                <div className="home_welcome">
                    <h1>Welcome to <br></br>Cineflix</h1>
                    <h3 className="h3">Your Gateway to <span>Cinematic Bliss!</span></h3>
                    <button className="scroll_trend" onClick={handleScrollTrend}><i class="fa-solid fa-angles-down fa-beat-fade"></i></button>
                </div>

                {/* {filteredMovies.length > 0 ? (
                    <div className="searchList">
                        {filteredMovies.slice(0, 5).map((movie) => (
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
                    <div className="searchList">
                        <div className="searchItem1">
                        No Match Found!
                        </div>
                    </div>
                ) : null} */}
            </div>
            <Trending />
        </>
    )
}
export default Home;