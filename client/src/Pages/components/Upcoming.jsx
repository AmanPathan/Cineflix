import React, { useState, useEffect } from "react";
import Card from "./Card";

const Upcoming = () => {
    const [movies, setMovies] = useState([]);
    
    const apiKey = "api_key=72e6a0925bc8daf021f1b91c432c7c20";
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?${apiKey}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setMovies(data.results);
            });
    }, []);
    return (
        <>
            <div class="trending" id="trend">
                <div className="trend">
                    <h2>Upcoming Movies</h2>
                </div>
                <div className="col-md-12 result trending-conatiner">
                    <div className="col-md-10 display">
                        {
                            movies.slice(0, 5).map((key,index) => {
                                return (
                                    <Card
                                        poster_path={key.poster_path}
                                        title={key.title ? key.title : key.name}
                                        id={key.id}
                                        rate={key.vote_average}
                                        key={index}
                                    />
                                );
                            })

                        }
                    </div>
                </div>
                <div className="col-md-12 result trending-conatiner">
                    <div className="col-md-10 display">
                        {
                            movies.slice(5, 10).map((key) => {
                                return (
                                    <Card
                                        poster_path={key.poster_path}
                                        title={key.title ? key.title : key.name}
                                        id={key.id}
                                        rate={key.vote_average}
                                    />
                                );
                            })

                        }
                    </div>
                </div>
                <div className="col-md-12 result trending-conatiner">
                    <div className="col-md-10 display">
                        {
                            movies.slice(10, 15).map((key) => {
                                return (
                                    <Card
                                        poster_path={key.poster_path}
                                        title={key.title ? key.title : key.name}
                                        id={key.id}
                                        rate={key.vote_average}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Upcoming;