import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function MovieSkeleton() {
	return (
		<Card className="overflow-hidden">
			<Skeleton className="w-full h-[300px]" />
			<CardHeader>
				<Skeleton className="h-6 w-3/4" />
				<Skeleton className="h-20 w-full mt-2" />
			</CardHeader>
			<CardContent>
				<div className="flex justify-between items-center">
					<Skeleton className="h-4 w-12" />
					<Skeleton className="h-4 w-20" />
				</div>
			</CardContent>
		</Card>
	);
}
