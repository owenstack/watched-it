"use client";

import { env } from "@/lib/env";
import type { TMDBResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ErrorComponent } from "./error";
import { HeroCarousel } from "./hero-carousel";
import { Button } from "./ui/button";

const fetchMovieDetails = async (): Promise<TMDBResponse> => {
	const response = await fetch(
		"https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
		{
			headers: {
				Authorization: `Bearer ${env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
				"Content-Type": "application/json",
			},
		},
	);
	if (!response.ok) {
		throw new Error("Failed to fetch movie details");
	}
	return response.json();
};

export function HeroPage() {
	const { data, error, isLoading } = useQuery<TMDBResponse>({
		queryKey: ["movie"],
		queryFn: () => fetchMovieDetails(),
	});
	const router = useRouter();

	if (isLoading)
		return (
			<div className="flex justify-center items-center min-h-[50vh] text-lg font-medium animate-pulse">
				Loading...
			</div>
		);
	if (error) return <ErrorComponent error={error} />;
	const movies = data?.results;
	return (
		<div className="relative bg-gradient-to-b from-background to-secondary/10">
			{movies && <HeroCarousel movie={movies.slice(0, 5)} />}
			<div className="lg:absolute lg:inset-0 flex flex-col items-center justify-center gap-6 py-12 px-4 max-w-2xl mx-auto text-center z-10">
				<h1 className="font-bold text-4xl md:text-5xl lg:text-6xl">
					Have you{" "}
					<span className="italic text-pretty bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
						Watched it?
					</span>
				</h1>
				<p className="text-lg md:text-xl text-muted-foreground">
					Check out the hottest movies and their gists
				</p>
				<Button
					onClick={() => router.push("/search")}
					className="px-8 py-6 text-lg font-semibold hover:scale-105 transition-transform"
				>
					Search Movies
				</Button>
			</div>
		</div>
	);
}
