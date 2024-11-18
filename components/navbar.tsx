import Link from "next/link";
import { Favorites } from "./favorites";
import { SearchInput } from "./search";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 items-center gap-2">
				<Link
					className="ml-4 flex items-center space-x-2 italic font-semibold text-xl"
					href={"/"}
				>
					Watched it?
				</Link>
				<div className="flex flex-1 items-center justify-end space-x-2">
					<div className="w-full flex-1 md:w-auto md:flex-none">
						<SearchInput className="w-full md:w-[300px] max-w-md" />
					</div>
					<nav className="flex items-center space-x-2">
						<Favorites />
						<ThemeToggle />
					</nav>
				</div>
			</div>
		</header>
	);
}
