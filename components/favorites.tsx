"use client";

import { useFavoritesStore, useSidebarState } from "@/lib/store";
import { Delete, Heart, Popcorn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";

export function Favorites() {
	const { favorites, emptyFavorites, removeItem } = useFavoritesStore();
	const { isOpen, toggle } = useSidebarState();

	return (
		<Sheet open={isOpen} onOpenChange={toggle}>
			<SheetTrigger asChild>
				<Button size="icon" variant="outline" className="relative">
					<Heart className="text-primary w-5 h-5" />
					{favorites && favorites.length > 0 && (
						<span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
							{favorites?.length}
						</span>
					)}
				</Button>
			</SheetTrigger>
			<SheetContent className="w-full sm:max-w-md flex flex-col">
				<SheetHeader className="mb-6">
					<SheetTitle className="text-2xl font-bold">Your favorites</SheetTitle>
				</SheetHeader>
				{favorites && favorites.length > 0 ? (
					<div className="flex flex-col h-full">
						<ScrollArea className="flex-grow mb-6">
							<div className="space-y-4">
								{favorites.map((movie) => (
									<Card key={movie.id} className="flex items-center p-4">
										<div className="flex-shrink-0 mr-4">
											<Image
												src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
												alt={movie.title}
												width={80}
												height={120}
												className="rounded-md object-cover"
											/>
										</div>
										<div className="flex-grow min-w-0">
											<CardTitle className="text-lg truncate">
												{movie.title}
											</CardTitle>
											<CardDescription className="text-sm mt-1 line-clamp-2">
												{movie.tagline}
											</CardDescription>
										</div>
										<div className="flex items-center ml-4">
											<Button
												size="icon"
												variant="destructive"
												onClick={() => removeItem(movie.id)}
												className="h-8 w-8"
											>
												<Delete className="w-4 h-4" />
											</Button>
										</div>
									</Card>
								))}
							</div>
						</ScrollArea>
						<Button
							size="lg"
							variant="destructive"
							onClick={() => emptyFavorites()}
							className="w-full space-y-4"
						>
							Empty favorites
						</Button>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center h-full gap-6 px-4 text-center">
						<Popcorn className="w-16 h-16 text-muted-foreground" />
						<SheetDescription className="text-xl">
							Your favorites list is empty
						</SheetDescription>
						<Button
							size="lg"
							className="w-full max-w-xs"
							onClick={() => toggle()}
						>
							<Link href="/search">Continue scrolling</Link>
						</Button>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
}
