import { Express, Request, Response } from "express";
import { fetchOneMovie, fetchAllMovies, createMovie, updateMovie, deleteMovie } from "./crud";

type Movie = {
	title: string;
	release_year: number;
};

function create(req: Request, res: Response) {
	try {
		const newMovie: Movie = req.body;
		createMovie(newMovie);

		res.status(201);
		res.json(newMovie);
	} catch (err: any) {
		res.status(400);
		res.json({ error: err.message });
	}
}

function one(req: Request, res: Response) {
	try {
		const movie = fetchOneMovie(req.params.title);

		res.status(200);
		res.json(movie);
	} catch (err: any) {
		res.status(404);
		res.json({ error: err.message });
	}
}

function all(_req: Request, res: Response) {
	try {
		const movies = fetchAllMovies();

		res.status(200);
		res.json(movies);
	} catch (err: any) {
		res.status(404);
		res.json({ error: err.message });
	}
}

function update(req: Request, res: Response) {
	try {
		const updatedMovie: Movie = req.body;
		updateMovie(req.params.title, updatedMovie);
		res.status(200);
		res.json(updatedMovie);
	} catch (err: any) {
		if (err instanceof ReferenceError) {
			res.status(404);
			res.json({ error: err.message });
		} else {
			res.status(400);
			res.json({ error: "something went wrong" });
		}
	}
}

function remove(req: Request, res: Response) {
	try {
		deleteMovie(req.params.title);
		res.status(200);
		res.json({ success: `deleted "${req.params.title}"` });
	} catch (err: any) {
		res.status(404);
		res.json({ error: err.message });
	}
}

export async function router(app: Express) {
	app.get("/movies/:title", one);
	app.get("/movies", all);
	app.post("/movies", create);
	app.put("/movies/:title", update);
	app.delete("/movies/:title", remove);
}
