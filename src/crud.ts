import { readFileSync, writeFileSync } from "fs";

type Movie = {
	title: string;
	release_year: number;
};

function convertTitleToUrlFormat(value: string) {
	return value.toLowerCase().replaceAll(" ", "-");
}

export function fetchOneMovie(title: string): Movie {
	const raw = readFileSync("./src/db.json").toString();
	const movies: Movie[] = JSON.parse(raw);

	let movie = movies.filter((movie) => convertTitleToUrlFormat(movie.title) === title)[0];

	if (movie === null) {
		throw new ReferenceError(`No movie found with title "${title}`);
	}

	return movie;
}

export function fetchAllMovies(): Movie[] {
	const raw = readFileSync("./src/db.json").toString();
	const movies: Movie[] = JSON.parse(raw);

	if (movies.length === 0) {
		throw new Error("No movies found");
	}

	return movies;
}

export function createMovie(newMovie: Movie): void {
	let raw = readFileSync("./src/db.json").toString();
	const movies: Movie[] = JSON.parse(raw);

	const movie = movies.find((movie) => movie.title === newMovie.title);
	if (movie) {
		throw new ReferenceError(`A movie with the title "${newMovie.title}" already exists`);
	}

	movies.push(newMovie);
	raw = JSON.stringify(movies);
	writeFileSync("./src/db.json", raw);
}

export function updateMovie(title: string, newMovie: Movie): void {
	let raw = readFileSync("./src/db.json").toString();
	const movies: Movie[] = JSON.parse(raw);

	let movie = movies.filter((movie) => convertTitleToUrlFormat(movie.title) === title)[0];

	if (!movie) throw new ReferenceError(`A movie with title "${title}" was not found`);

	for (let key of Object.keys(movie)) {
		movie[key] = newMovie[key];
	}

	raw = JSON.stringify(movies);
	writeFileSync("./src/db.json", raw);
}

export function deleteMovie(title: string): void {
	let raw = readFileSync("./src/db.json").toString();
	const movies: Movie[] = JSON.parse(raw);

	let index = movies.findIndex((movie) => convertTitleToUrlFormat(movie.title) === title);

	if (index < 0) throw new ReferenceError(`A movie with title "${title}" was not found`);

	movies.splice(index, index + 1);

	raw = JSON.stringify(movies);
	writeFileSync("./src/db.json", raw);
}
