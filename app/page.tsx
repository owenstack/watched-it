import { HeroPage } from "@/components/hero-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home",
};

export default function Page() {
	return (
		<>
			<HeroPage />
		</>
	);
}
