import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./components/Card";
import logo from './components/images/cineflix.png';
import { useNavigate } from "react-router-dom";

const Result = () => {
    const params = useParams();
    const navigate = useNavigate();
    const apiKey = "api_key=72e6a0925bc8daf021f1b91c432c7c20";
    const inputValue = params.id;
    const [movie, setMovie] = useState({});
    const [recommendations, setRecommendations] = useState([{}]);
    const [cast, setCast] = useState([{}]);
    const [director, setDirector] = useState("");
    const [genres, setGenre] = useState([{}]);
    const [genre_names, setGenreNames] = useState([]);
    const [currGenre, setCurrGenre] = useState([{}]);
    const [videoData, setVideoData] = useState([]);
    const [runtime, setRuntime] = useState("");
    const [release_date, setRelease] = useState("");

    const handleNavigation = () => {
        navigate(`/`);
    }
    // useEffect(() => {
    //     window.scrollTo({
    //         top: 0,
    //         left: 0,
    //         behavior: "smooth",
    //     });
    // })
    // const handleScroll = () => {
    //     const element = document.getElementById('recommendation');
    //     if (element) {
    //         element.scrollIntoView({ behavior: 'smooth' });
    //     }
    // }
    const getCast = (castData) => {
        setCast([]);

        let counter = 6;
        for (let cast of castData) {
            setCast((castMembers) => [...castMembers, cast]);
            counter--;
            if (counter === 0) break;
        }
    };
    const getDirector = (castData) => {
        setDirector("");
        for (let item of castData) {
            if (item.job === 'Director') {
                setDirector(item.original_name);
                break;
            }
        }
    };
    const getVideo = (data) => {
        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(
                (vid) => vid.name === "Official Trailer"
            );
            setVideoData(trailer ? trailer : data.videos.results[0]);
        }
    };
    const getDetails = (data) => {
        const time = data.runtime;
        const runtime = `${Math.trunc(time / 60)} hr ${time % 60} min`;
        setRuntime(runtime);
        setRelease(data.release_date);
        const genre_list = data.genres;
        let final_list = [];
        genre_list.map((item) => {
            final_list.push(item.name);
        })
        setGenreNames(final_list);
    }
    const getRecommendations = (apiData) => {
        setRecommendations([]);
        let counter = 20;
        for (let movie of apiData.movies) {
            fetch(
                `https://api.themoviedb.org/3/search/movie?${apiKey}&query=${movie}`
            ).then((response) =>
                response.json().then((data) =>
                    setRecommendations((recommendations) => [
                        ...recommendations,
                        data.results[0],
                    ])
                )
            );
            counter--;
            if (counter === 0) break;
        }
    };
    useEffect(
        () => {
            const getMovieData = (apiData) => {
                const realMovieData = apiData.results[0];
                setCurrGenre([]);
                setCurrGenre(realMovieData.genre_ids);

                setMovie(realMovieData);
                fetch(
                    `https://api.themoviedb.org/3/movie/${realMovieData.id}/credits?${apiKey}`
                ).then((Response) =>
                    Response.json().then((data) => { getCast(data.cast); getDirector(data.crew) })
                );
                fetch(
                    `https://api.themoviedb.org/3/movie/${realMovieData.id}?${apiKey}&append_to_response=videos`
                ).then((Response) =>
                    Response.json().then((data) => getVideo(data))
                );
                fetch(
                    `https://api.themoviedb.org/3/movie/${realMovieData.id}?${apiKey}`
                ).then((Response) =>
                    Response.json().then((data) => getDetails(data))
                );
            };
            // getting data for the searched movie from tmdb
            fetch(
                `https://api.themoviedb.org/3/search/movie?${apiKey}&query=${inputValue}`
            ).then((Response) =>
                Response.json().then((data) => getMovieData(data))
            );
            // getting list of recommended movie from our flask server
            fetch(`http://localhost:5000/api/similarity/${inputValue}`).then((Response) =>
                Response.json().then((data) => getRecommendations(data))
            );
            // getting the list of all genres
            fetch(
                `https://api.themoviedb.org/3/genre/movie/list?${apiKey}`
            ).then((Response) =>
                Response.json().then((data) => setGenre(data.genres))
            );

        },
        [inputValue] /*Making api call whenever the searched movie changes */
    );
    // recommendations.sort(function(a, b){return b.vote_average - a.vote_average});
    return (
        <>
            <div className="info-container">
                <div className="nav_container">
                    <div className="nav_left">
                        <img src={logo} alt="Movie.Ai" className="logo_nav" onClick={handleNavigation} />
                    </div>
                    <div className="nav_right" onClick={handleNavigation}>
                        <i class="fa-solid fa-home"></i>
                    </div>
                </div>
                <div className="center-div">
                    <div className="titles">
                        <div className="left-titles">
                            <h2 className="text">{inputValue}</h2>
                            <div className="leftdiv"><h4>{release_date.slice(0, 4)} <span id="dot"> &nbsp; • &nbsp;</span></h4> &nbsp; <h4>{runtime}</h4></div>
                        </div>
                        <div className="right-titles">
                            <div className="rate">
                                <p className="text-title">Rating</p>
                                <p className="text-title"><i class="fa-solid fa-star"></i> {movie.vote_average}</p>
                            </div>
                            <div className="rate">
                                <p className="text-title">Votes</p>
                                <p className="text-title"><i class="fa-solid fa-heart"></i> {movie.vote_count}k</p>
                            </div>
                        </div>
                    </div>
                    <div className="poster-video">
                        <img className="poster_img" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                        <iframe className="youtube" src={`https://www.youtube.com/embed/${videoData.key}?autoplay=1`} allow='autoplay'></iframe>
                    </div>
                    <div className="bottom">
                        <div className="overview">
                            <p className="about">{movie.overview}</p>
                        </div>
                        <div className="overview">
                            <p className="about"><span id="span"> <i class="fa-solid fa-play"></i>Genre :</span> {genre_names.join(', ')} </p>
                        </div>
                        <div className="overview">
                            <p className="about"><span id="span"> <i class="fa-solid fa-play"></i>Director : </span>{director}</p>
                        </div>
                        <div className="cast">
                            <p className="about"><span id="span"> <i class="fa-solid fa-play"></i>Cast :</span> </p>
                            {/* <p className="about"><span id="span"> <i class="fa-solid fa-play"></i>Cast : </span>{cast.slice(0, 4).map((names) => { return <a className="cast_link" href={`https://en.wikipedia.org/wiki/${names.name}`} >{names.name}, </a> })} {cast.slice(4,).map((names) => { return <a className="cast_link" href={`https://en.wikipedia.org/wiki/${names.name}`} >{names.name} </a> })}</p> */}
                            <div className="cast_div">
                                {cast.slice(0, 6).map((names) => {
                                    return (
                                        <>
                                            <a className="cast_link" target="_blank" href={`https://en.wikipedia.org/wiki/${names.name}`} >
                                                <div className="cast_container">
                                                    <img src={`https://image.tmdb.org/t/p/w500/${names.profile_path}`} className="cast_img" />
                                                    <div className="cast_text">
                                                        <span id="link_span">{names.name}</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </>)
                                })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="trending" id="recommendation">
                <div className="trend">
                    <h2 className="h2">Recommended Movies for You</h2>
                </div>
                <div className="trending-conatiner trending2">
                    <div class="row">
                        {recommendations.slice(0, 5).map((movie) => {
                            if (movie) {
                                return (
                                    <Card
                                        poster_path={movie.poster_path}
                                        title={movie.title ? movie.title : movie.name}
                                        id={movie.id}
                                        rate={movie.vote_average}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                    <div class="row">
                        {recommendations.slice(5,10).map((movie) => {
                            if (movie) {
                                return (
                                    <Card
                                        poster_path={movie.poster_path}
                                        title={movie.title ? movie.title : movie.name}
                                        id={movie.id}
                                        rate={movie.vote_average}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                <div class="row">
                        {recommendations.slice(10, 15).map((movie) => {
                            if (movie) {
                                return (
                                    <Card
                                        poster_path={movie.poster_path}
                                        title={movie.title ? movie.title : movie.name}
                                        id={movie.id}
                                        rate={movie.vote_average}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                </div>
                <div className="trending-conatiner trending1">
                    <div class="row">
                        {recommendations.slice(0, 5).map((movie) => {
                            if (movie) {
                                return (
                                    <Card
                                        poster_path={movie.poster_path}
                                        title={movie.title ? movie.title : movie.name}
                                        id={movie.id}
                                        rate={movie.vote_average}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                    <div class="row">
                        {recommendations.slice(5, 10).map((movie) => {
                            if (movie) {
                                return (
                                    <Card
                                        poster_path={movie.poster_path}
                                        title={movie.title ? movie.title : movie.name}
                                        id={movie.id}
                                        rate={movie.vote_average}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                <div class="row">
                        {recommendations.slice(10, 15).map((movie) => {
                            if (movie) {
                                return (
                                    <Card
                                        poster_path={movie.poster_path}
                                        title={movie.title ? movie.title : movie.name}
                                        id={movie.id}
                                        rate={movie.vote_average}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                </div>
                {/* <div className="col-md-12 result trending-conatiner">
                    <div className="col-md-10 display">
                        {recommendations.slice(15, 20).map((movie) => {
                            if (movie) {
                                return (
                                    <Card
                                        poster_path={movie.poster_path}
                                        title={movie.title ? movie.title : movie.name}
                                        id={movie.id}
                                        rate={movie.vote_average}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                </div> */}
            </div>
        </>
    )
}
export default Result;