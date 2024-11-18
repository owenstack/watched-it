"use client";

import { env } from "@/lib/env";
import type { TMDBResponse } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2, TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ErrorComponent } from "./error";
import { MovieSkeleton } from "./loader";
import { MovieCard } from "./overview-card";
import { Button } from "./ui/button";

const fetchMovies = async ({
	pageParam = 1,
	query,
}: {
	pageParam?: number;
	query?: string;
}): Promise<TMDBResponse> => {
	const endpoint = query
		? `https://api.themoviedb.org/3/search/movie?query=${query}&page=${pageParam}`
		: `https://api.themoviedb.org/3/movie/popular?page=${pageParam}`;

	const response = await fetch(endpoint, {
		headers: {
			Authorization: `Bearer ${env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
			"Content-Type": "application/json",
		},
	});

	const data: TMDBResponse = await response.json();
	return data;
};

export function Movies({ query }: { query?: string }) {
	const { ref, inView } = useInView();

	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
	} = useInfiniteQuery({
		queryKey: ["movies", query],
		queryFn: ({ pageParam }) => fetchMovies({ pageParam, query }),
		getNextPageParam: (lastPage: TMDBResponse) =>
			lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
		initialPageParam: 1,
	});

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage, hasNextPage]);

	return (
		<div className="container mx-auto px-4 py-8">
			{query && (
				<h1 className="text-xl py-1">
					Search results for{" "}
					<span className="text-primary font-semibold">"{query}"</span>
				</h1>
			)}
			{isFetching && !data ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{Array.from({ length: 6 }).map((_, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: index used for iteration
						<MovieSkeleton key={i} />
					))}
				</div>
			) : status === "error" ? (
				<ErrorComponent error={error} />
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{data?.pages?.map((page) =>
							page.results.map((movie) => (
								<MovieCard key={movie.id} movie={movie} />
							)),
						)}
					</div>
					<div ref={ref} className="flex justify-center mt-12">
						{isFetchingNextPage ? (
							<span className="flex items-center gap-2 text-muted-foreground">
								<Loader2 className="w-5 h-5 animate-spin" />
								Loading more movies...
							</span>
						) : hasNextPage ? (
							<Button
								onClick={() => fetchNextPage()}
								disabled={isFetchingNextPage}
								size="lg"
								className="min-w-[150px]"
							>
								Load More
							</Button>
						) : (
							<p className="text-muted-foreground">No more movies to load</p>
						)}
					</div>
				</>
			)}
		</div>
	);
}
