import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [title, setTitle] = useState("");
  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const previousPage = () => {
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage != totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value === "") {
      setResult([]);
      setTotalPage(0);
      setCurrentPage(1);
    }
  };
  const searchMovieDB = () => {
    axios
      .get("http://www.omdbapi.com/", {
        params: {
          apikey: "4392338a",
          s: title,
          page: currentPage,
        },
      })
      .then(function (response) {
        console.log(response.data);
        setResult([...response.data.Search]);
        setTotalPage(Math.ceil(response.data.totalResults / 10));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    if (title != "") {
      searchMovieDB();
    }
  }, [currentPage]);
  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovieDB();
  };

  const moviesList = result.map((movie) => {
    return (
      <Card
        id={movie.imdbID}
        title={movie.Title}
        year={movie.Year}
        type={movie.Type}
        poster={movie.Poster}
        key={movie.imdbID}
      />
    );
  });
  const pageFooter = (() => {
    if (totalPage) {
      return (
        <p>
          Page {currentPage} of {totalPage}
        </p>
      );
    }
  })();
  return (
    <div className="text-[#FFFFFF] min-h-screen">
      <div className="text-center h-40 flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          <h1 className="text-4xl font-semibold text-black my-5 py-2 bg-[#E1B517] rounded-xl">
            Film TV Game
          </h1>
          <input
            className="border-solid text-black pl-3 h-8 w-60 border-2 rounded-xl placeholder:text-center placeholder:text-[#9AA0A5]"
            type="search"
            name="q"
            id="search"
            value={title}
            onChange={handleChange}
            placeholder="type title here"
          />
          <button className="ml-4 bg-[#E1B517]s p-1 rounded-2xl">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </div>
      <div className="flex flex-row flex-wrap justify-center">{moviesList}</div>
      <div className="flex justify-center my-2">
        <button
          className="border-solid border-2 rounded-md px-3 mr-2"
          onClick={previousPage}
        >
          Previous
        </button>
        <button
          className="border-solid border-2 rounded-md px-3"
          onClick={nextPage}
        >
          Next
        </button>
      </div>
      <div className="mb-1 text-center">{pageFooter}</div>
    </div>
  );
}

export default App;
