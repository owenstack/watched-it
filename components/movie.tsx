"use client";

import { env } from "@/lib/env";
import type { MovieResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Details } from "./detail-card";
import { ErrorComponent } from "./error";

const fetchMovieDetails = async (id: string): Promise<MovieResponse> => {
	const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
		headers: {
			Authorization: `Bearer ${env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
			"Content-Type": "application/json",
		},
	});
	if (!response.ok) {
		throw new Error("Failed to fetch movie details");
	}
	return response.json();
};

export function MovieDetails({ id }: { id: string }) {
	const {
		data: movie,
		error,
		isLoading,
	} = useQuery<MovieResponse>({
		queryKey: ["movie", id],
		queryFn: () => fetchMovieDetails(id),
	});

	if (isLoading) return <div className="text-center p-8">Loading...</div>;
	if (error) return <ErrorComponent error={error} />;
	if (!movie)
		return <div className="text-center p-8">No movie data available</div>;

	return <Details movie={movie} />;
}
