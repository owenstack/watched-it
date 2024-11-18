import { Navbar } from "@/components/navbar";
import {
	ReactQueryClientProvider,
	ThemeProvider,
} from "@/components/providers";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistMono = localFont({
	src: "../assets/fonts/GeistMonoVF.woff",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: {
		template: "%s | Watched it?",
		default: "Watched it?",
	},
	description:
		"Where you get movies recommendations on the latest and best movies",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ReactQueryClientProvider>
			<html lang="en" suppressHydrationWarning>
				<body className={`${geistMono.className} antialiased`}>
					<ThemeProvider
						attribute={"class"}
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<Navbar />
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ReactQueryClientProvider>
	);
}
