import { React, useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import SearchIcon from "./search.svg"

const App = () => {
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const API = 'https://www.omdbapi.com/?apikey=35e0d2a6';
    const  searchMovies = async (title) => {
        const response = await fetch(`${API}&&s=${title}`)
        const data = await response.json()
        setMovies(data.Search) 
    }

    useEffect(() => {
        searchMovies('Batman')
    }, [])

    return (
        <>
            <div className="app">
                <h1>MovieLand</h1>
                <div className="search">
                    <input 
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                    <img 
                        src={SearchIcon} 
                        onClick={() => searchMovies(searchTerm)}
                        alt="" 
                    />
                </div>
                {movies?.length > 0 ? 
                (
                    <div className="container">
                        {movies.map(movie => (
                            <MovieCard
                                key={movie.imdbID}
                                movie={movie}
                            />
                        ))}
                    </div>
                ):
                (
                    <div className="empty">
                        <h2>No Movies Found</h2>
                    </div>
                )
            }
            </div>
        </>
    )
}

export default App;