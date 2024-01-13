import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Card = (props) => {
    const navigate = useNavigate();
    const currentMovie = props.title;
    const goToMovie = () => {
        navigate(`/search/${currentMovie}`);
        // window.location.reload();

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    };
    const rating = (Math.round((props.rate) * 100) / 100).toFixed(1);
    return (
        <>
            {/* <div class="column">

                <div className="card">
                    <div onClick={goToMovie} className="card-nav">
                        <div className="card-container">
                            <div className="card-img" style={{ backgroundImage: `linear-gradient(to top,rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)),url(https://image.tmdb.org/t/p/w500/${props.poster_path})` }} >
                                <p className="rating"><span>★</span>{rating}</p>
                            </div>
                        </div>
                        <div className="movie_name">
                            <h3>{currentMovie}</h3>
                        </div>
                    </div>
                </div>
            </div> */}
            <div class="column">
                <div className="card" onClick={goToMovie} >
                    <div className="card_img" style={{ backgroundImage: `linear-gradient(to top,rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)),url(https://image.tmdb.org/t/p/w500/${props.poster_path})` }} >
                        <p className="rating"><span>★</span>{rating}</p>
                    </div>
                    <h3 className="movie_name">{currentMovie}</h3>
                </div>
            </div>
        </>
    )
}
export default Card;