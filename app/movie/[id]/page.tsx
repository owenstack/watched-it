import { MovieDetails } from "@/components/movie";
import { env } from "@/lib/env";
import type { MovieResponse } from "@/lib/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
	params,
}: { params: Promise<{ id?: string }> }): Promise<Metadata> {
	const { id } = await params;
	if (!id) return {};
	try {
		const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
			headers: {
				Authorization: `Bearer ${env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			return {};
		}
		const data: MovieResponse = await response.json();
		return {
			title: data.title,
			description: data.tagline,
			openGraph: {
				images: [`https://image.tmdb.org/t/p/w500${data.poster_path}`],
			},
			category: `${data.genres.join(",")}`,
			classification: "Movie",
		};
	} catch (error) {
		return {};
	}
}

export default async function Page({
	params,
}: { params: Promise<{ id?: string }> }) {
	const { id } = await params;
	if (!id) {
		notFound();
	}
	return <MovieDetails id={id} />;
}
