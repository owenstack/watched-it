import { useToast } from "@/hooks/use-toast";
import { blurDataURL } from "@/lib/constants";
import { env } from "@/lib/env";
import { useFavoritesStore } from "@/lib/store";
import type { CastResponse, MovieResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Baby, Heart, Loader2, Share2, VenetianMask } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ErrorComponent } from "./error";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const fetchCast = async (id: number): Promise<CastResponse> => {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${id}/credits`,
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

export function Details({ movie }: { movie: MovieResponse }) {
	const { addToFavorites } = useFavoritesStore();
	const { toast } = useToast();
	const [view, setView] = useState<"overall" | "cast">("overall");
	const handleShare = async () => {
		try {
			if (window !== undefined) {
				await navigator.share({
					title: movie.title,
					text: `I am recommending this ${movie.title} from Watched it?`,
					url: window.location.href,
				});
			}
		} catch (error) {
			console.error("Error sharing:", error);
			try {
				await navigator.clipboard.writeText(window.location.href);
				toast({
					title: "Sharing failed",
					description:
						"Could not share. The URL has been copied to your clipboard",
					variant: "destructive",
				});
			} catch (clipboardError) {
				console.error("Error copying to clipboard:", clipboardError);
				toast({
					title: "Sharing failed",
					description: "Could not share or copy URL to clipboard",
					variant: "destructive",
				});
			}
		}
	};
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="relative w-full h-[500px] rounded-lg overflow-hidden">
				<Image
					src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
					alt={movie.title}
					fill
					style={{ objectFit: "cover" }}
					loading="eager"
					placeholder="blur"
					blurDataURL={blurDataURL(750, 500)}
					quality={100}
					className="brightness-50"
				/>
				<div className="absolute top-4 left-4 flex items-center gap-4">
					<Button size="icon" onClick={() => addToFavorites(movie)}>
						<Heart />
					</Button>
					<Button size={"icon"} onClick={handleShare} variant={"secondary"}>
						<Share2 />
					</Button>
				</div>
				<div className="absolute bottom-0 left-0 right-0 p-6 flex items-end gap-6">
					<div className="relative w-[200px] h-[300px] rounded-lg overflow-hidden shrink-0">
						<Image
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt={movie.title}
							fill
							style={{ objectFit: "cover" }}
							loading="eager"
							placeholder="blur"
							blurDataURL={blurDataURL(350, 500)}
							quality={100}
						/>
					</div>
					<div className="flex flex-col gap-4">
						<h1 className="text-4xl font-bold text-white">{movie.title}</h1>
						<div className="flex gap-2">
							{movie.genres.map((g) => (
								<Badge variant={"secondary"} key={g.id}>
									{g.name}
								</Badge>
							))}
						</div>
						<div className="flex items-center gap-2">
							{movie.adult === false ? (
								<Baby className="text-white w-6 h-6" />
							) : (
								<VenetianMask className="text-white w-6 h-6" />
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="mt-8 flex items-center gap-8">
				<div className="flex items-baseline gap-2">
					<p
						className={`font-bold text-3xl ${movie.vote_average > 8 ? "text-primary" : "text-secondary-foreground"}`}
					>
						{movie.vote_average.toFixed(1)}
					</p>
					<span className="text-muted-foreground">/ 10</span>
				</div>
				<div className="flex items-baseline gap-2">
					<p className="text-2xl font-semibold">{movie.runtime}</p>
					<span className="text-muted-foreground">min</span>
				</div>
				{movie.tagline && (
					<div className="flex-1">
						<p className="text-xl italic text-muted-foreground">
							"{movie.tagline}"
						</p>
					</div>
				)}
			</div>
			<div className="mt-8">
				<div className="border-b mb-6">
					<div className="flex items-center gap-4">
						<Button
							size={"lg"}
							onClick={() => setView("overall")}
							variant={view === "overall" ? "secondary" : "ghost"}
						>
							Overall
						</Button>
						<Button
							size={"lg"}
							onClick={() => setView("cast")}
							variant={view === "cast" ? "secondary" : "ghost"}
						>
							Cast
						</Button>
					</div>
				</div>
				<div className="mt-6">
					{view === "overall" ? (
						<div className="space-y-8">
							<div>
								<h2 className="text-2xl font-semibold mb-4">Synopsis</h2>
								<p className="text-lg leading-relaxed">{movie.overview}</p>
							</div>
							<div>
								<h2 className="text-2xl font-semibold mb-4">Details</h2>
								<ul className="space-y-2 text-lg">
									<li>
										<span className="text-muted-foreground">Status:</span>{" "}
										{movie.status}
									</li>
									<li>
										<span className="text-muted-foreground">Release date:</span>{" "}
										{new Date(movie.release_date).toLocaleDateString()}
									</li>
									<li>
										<span className="text-muted-foreground">
											Spoken language:
										</span>{" "}
										{movie.spoken_languages[0].english_name}
									</li>
								</ul>
							</div>
						</div>
					) : (
						<Cast id={movie.id} />
					)}
				</div>
			</div>
		</div>
	);
}

function Cast({ id }: { id: number }) {
	const { data, error, isLoading } = useQuery<CastResponse>({
		queryKey: ["cast"],
		queryFn: () => fetchCast(id),
	});
	if (isLoading)
		return (
			<div className="flex items-center justify-center py-12">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
			</div>
		);
	if (error) return <ErrorComponent error={error} />;
	const cast = data?.cast;
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{cast?.map((p) => (
				<div
					key={p.id}
					className="flex items-center gap-4 p-4 rounded-lg border"
				>
					<Avatar className="h-16 w-16">
						<AvatarImage
							src={`https://image.tmdb.org/t/p/w500${p.profile_path}`}
						/>
						<AvatarFallback className="text-lg">
							{p.name.charAt(0)}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<h2 className="font-semibold text-lg">{p.original_name}</h2>
						<p className="text-muted-foreground">as {p.character}</p>
					</div>
				</div>
			))}
		</div>
	);
}
