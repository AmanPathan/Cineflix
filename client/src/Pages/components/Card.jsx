import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Card = (props) => {
    const navigate = useNavigate();
    const currentMovie = props.title;
    const goToMovie = () => {
        navigate(`/search/${currentMovie}`);
        window.location.reload();
    };
    const rating = (Math.round((props.rate) * 100) / 100).toFixed(1);
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-4 ">
                        <div>
                            <div onClick={goToMovie} className="card-nav">
                                <div className="card-container">
                                    <div className="card-img" style={{ backgroundImage: `linear-gradient(to top,rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)),url(https://image.tmdb.org/t/p/w500/${props.poster_path})` }} >
                                        <p className="rating"><span>★</span>{rating}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="movie_name">
                            <h3>{currentMovie}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Card;