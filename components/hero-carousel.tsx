import type { Movie } from "@/lib/types";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

export function HeroCarousel({ movie }: { movie: Movie[] }) {
	return (
		<div className="relative w-full h-[50vh] mb-8">
			<Carousel
				opts={{
					loop: true,
				}}
				plugins={[Autoplay({ delay: 2000, stopOnInteraction: true })]}
				className="w-full h-full"
			>
				<CarouselContent className="h-full">
					{movie.map((m) => (
						<CarouselItem key={m.id} className="relative w-full h-full">
							<Link
								href={`/movie/${m.id}`}
								className="block w-full h-full relative"
								style={{ aspectRatio: "16/9" }}
							>
								<Image
									src={`https://image.tmdb.org/t/p/original${m.poster_path}`}
									alt={m.title}
									fill
									sizes="100vw"
									className="object-cover"
									priority
									loading="eager"
								/>
								<div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent">
									<h2 className="text-4xl font-bold text-white mb-2">
										{m.title}
									</h2>
									<Badge>
										<Star fill="currentColor" size={20} />
										<span className="text-lg">{m.vote_average.toFixed(1)}</span>
									</Badge>
								</div>
							</Link>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	);
}
