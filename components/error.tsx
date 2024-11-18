import { TriangleAlert } from "lucide-react";

export function ErrorComponent({ error }: { error: Error | null }) {
	return (
		<div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
			<TriangleAlert className="text-destructive w-12 h-12" />
			<h2 className="text-2xl font-semibold text-secondary">
				An error occurred
			</h2>
			<p className="text-sm text-muted-foreground">Error: {error?.message}</p>
		</div>
	);
}
