import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import filterChevron from "../../img/moviesFilter.svg";
import { convertDate } from "../../repository/dataConvert";
import movies from "../../repository/movies";
import "./default.css";
import { CustomCircularProgress } from "../../repository/CircularProgress";

function Movies() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  async function getPopularMovies() {
    const resp = await movies.getMoviesByName("popular?language=en-US&page=1");
    setPopularMovies(resp.results);
    setLoader(false);
  }

  useEffect(() => {
    getPopularMovies();
  }, []);

  if (loader) {
    return (
      <div className="loader">
        <SpinnerCircular
          size={100}
          thickness={100}
          speed={100}
          color="#000"
          secondaryColor="rgba(0, 0, 0, 0.3)"
        />
      </div>
    );
  }

  const handleClick = (id) => {
    navigate(`/movies/${id}`);
  };

  return (
    <div className="moviesContainer">
      <h2>Popular Movies</h2>
      <div className="moviesWrapper">
        <div className="moviesFilter">
          <div className="sort">
            <h3>Sort</h3>
            <img src={filterChevron} alt="filter chevron" />
          </div>
          <div className="sort">
            <h3>Filters</h3>
            <img src={filterChevron} alt="filter chevron" />
          </div>
          <button className="filterSearch">Search</button>
        </div>
        <div className="moviesCards">
          {popularMovies?.map((item, index) => {
            return (
              <div
                onClick={() => {
                  handleClick(item.id);
                }}
                key={index}
                className="card"
              >
                <span className="material-symbols-outlined moreIcon">
                  more_horiz
                </span>
                <img
                  src={`https://media.themoviedb.org/t/p/w440_and_h660_face/${item.poster_path}`}
                  alt=""
                />
                <div className="cardBody">
                  <span >
                    <CustomCircularProgress
                      value={Math.round(item.vote_average * 10)}
                    />
                  </span>
                  <h1>{item.original_title}</h1>
                  <p>{convertDate(item.release_date)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Movies;
