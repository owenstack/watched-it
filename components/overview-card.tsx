"use client";

import { blurDataURL } from "@/lib/constants";
import type { Movie } from "@/lib/types";
import { Star, StarHalf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";

export function MovieCard({ movie }: { movie: Movie }) {
	const rating = movie.vote_average;
	const fullStars = Math.floor(rating / 2);
	const hasHalfStar = rating % 2 >= 0.5;

	return (
		<Card className="overflow-hidden">
			<Link href={`/movie/${movie.id}`}>
				<Image
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={movie.title}
					width={500}
					height={350}
					className="w-full h-auto hover:scale-105 duration-200"
					loading="lazy"
					quality={100}
					placeholder="blur"
					blurDataURL={blurDataURL(500, 350)}
				/>
			</Link>
			<CardHeader>
				<CardTitle>
					<Link className="hover:underline" href={`/movie/${movie.id}`}>
						{movie.title}
					</Link>
				</CardTitle>
				<CardDescription>{movie.overview}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex justify-between items-center">
					<span className="text-sm text-muted-foreground">
						{new Date(movie.release_date).getFullYear()}
					</span>
					<span className="flex items-center gap-0.5 text-primary">
						{Array.from({ length: fullStars }).map((_, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: index used for iteration
							<Star key={i} size={16} fill="currentColor" />
						))}
						{hasHalfStar && <StarHalf size={16} fill="currentColor" />}
						<span className="ml-1 text-sm">{rating?.toFixed(1)}</span>
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
