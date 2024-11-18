import { Movies } from "@/components/movies";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Watched It?",
	description: "IMDb but free",
};

export default async function Page({
	searchParams,
}: { searchParams: Promise<{ q?: string }> }) {
	const query = (await (await searchParams).q) || "";
	return (
		<main className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-semibold mb-8 text-center">
				Popular movies
			</h1>
			<Movies query={query} />
		</main>
	);
}
