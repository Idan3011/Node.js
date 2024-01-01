import STATUS_CODE from '../constants/statusCodes.js'
import { readMoviesFromFile, writeMoviesToFile } from "../models/movieModel.js"
import {v4 as uuidv4} from 'uuid'


export const getAllMovies = async(req, res, next) =>{
    try {
        const movies = readMoviesFromFile()
        res.send(movies)
    } catch (error) {
        next(error)
    }
}

export const getMovieById = async (req, res, next) =>{
    try {
       const movies =readMoviesFromFile();
        const movie = movies.find(m => m.id === req.params.id )
        if(!movie){
            res.status(STATUS_CODE.NOT_FOUND)
            throw new Error('Movie was not found');
        }
        res.send(movie)
    } catch (error) {
        next(error)
    }
}

export const createMovie = async(req, res, next) => {
    try {
        const {Title, Year, Rated, Released, Runtime, Genre, Director, Poster } = req.body;
        if(!Title || !Year || !Rated || !Released || !Runtime || !Genre || !Director || !Poster){
            res.status(STATUS_CODE.BAD_REQUEST);
            throw new Error(
                'all fileds (Title, Year, Rated, Released, Runtime, Genre, Director, Poster) ar required'
            )
        } 
        const movies = readMoviesFromFile();
        if(movies.some((m)=>m.Title === Title)){
            res.status(STATUS_CODE.CONFLICT);
            throw new Error('A movie with the sane title already exsits')
        }
        const newMovie = {id: uuidv4(), Title, Year, Rated, Released, Runtime, Genre, Director, Poster}
        movies.push(newMovie);
        writeMoviesToFile(movies)
        res.status(STATUS_CODE.CREATED).send(newMovie)
    } catch (error) {
        res.status(STATUS_CODE.BAD_REQUEST)
        next(error)
    }
}

export const updatedMovie = async (req, res, next) =>{
    try {
        const {Title, Year, Rated, Released, Runtime, Genre, Director, Poster } = req.body;
        if(!Title || !Year || !Rated || !Released || !Runtime || !Genre || !Director || !Poster){
            res.status(STATUS_CODE.BAD_REQUEST);
            throw new Error(
                'all fileds (Title, Year, Rated, Released, Runtime, Genre, Director, Poster) ar required'
            )
        }
        const movies = readMoviesFromFile();
        const index = movies.findIndex((movie)=> movie.id === req.params.id)
        if(index === -1){
            res.status(STATUS_CODE.NOT_FOUND)
            throw new Error('Movie was not Found')
        }
        const lastIndex = movies.findLastIndex(movie => movie.Title === Title)
        if(lastIndex != -1 && lastIndex !=  index ){
            res.status(STATUS_CODE.BAD_REQUEST);
            throw new Error('Cannot edit movie, movie with such title already exist!')
        }

        const updatedMovie = {...movies[index], Title, Year, Rated, Released, Runtime, Genre, Director, Poster}

        movies[index] = updatedMovie
        writeMoviesToFile(movies)
        res.send(updatedMovie)
    } catch (error) {
        next(error)
    }
}

export const deleteMovie = async (req, res, next) =>{
    try {
        const movies = readMoviesFromFile()
        const newMovieList = movies.filter(movie => movie.id != req.params.id)
        if(newMovieList.length === movies.length){
            res.status(STATUS_CODE.NOT_FOUND)
            throw new Error('Movie was not found.')
        }

        writeMoviesToFile(newMovieList);
        res.status(STATUS_CODE.OK).send(`Movie with the id of ${req.params.id} was deleted!`)
    } catch (error) {
        next(error)
    }
}

export const getMovieByTitle = async (req, res, next) =>{
    try {
        const movies = readMoviesFromFile();
        const movie = movies.find((m)=> m.Title.toLowerCase() === req.params.title.toLowerCase());
        
        if(!movie){
            res.status(STATUS_CODE.NOT_FOUND)
            throw new Error('Movie was not found.')
        }
        res.send(movie)
    } catch (error) {
        next(error)
    }
}