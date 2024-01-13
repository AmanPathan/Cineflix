import React, { useState, useEffect } from "react";
import Card from "./Card";

const Trending = () => {
    const [movies, setMovies] = useState([]);

    const apiKey = "api_key=72e6a0925bc8daf021f1b91c432c7c20";
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/trending/all/day?${apiKey}&append_to_response=credits`)
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
                    <h2>Latest & Trending Movies</h2>
                </div>
                <div className="trending-conatiner trending1">
                    <div class="row">
                        {
                            movies.slice(0, 4).map((key, index) => {
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

                    <div class="row">

                        {
                            movies.slice(4, 8).map((key) => {
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
                    <div className="row">
                        {
                            movies.slice(8, 12).map((key) => {
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
                    <div className="row">
                        {
                            movies.slice(12, 16).map((key) => {
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

                <div className="trending-conatiner trending2">
                    <div class="row">
                        {
                            movies.slice(0, 5).map((key, index) => {
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

                    <div class="row">

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
                    <div className="row">
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
                    <div className="row">
                        {
                            movies.slice(15, 20).map((key) => {
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

export default Trending;