import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MovieResponse } from "./types";

interface Store {
	favorites: MovieResponse[] | null;
	emptyFavorites: () => void;
	addToFavorites: (order: MovieResponse) => void;
	removeItem: (id: number) => void;
}

interface SidebarState {
	isOpen: boolean;
	toggle: () => void;
}

export const useSidebarState = create<SidebarState>((set) => ({
	isOpen: false,
	toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useFavoritesStore = create(
	persist<Store>(
		(set) => ({
			favorites: null,
			emptyFavorites: () => set({ favorites: null }),
			addToFavorites: (newOrder) =>
				set((state) => ({
					favorites: state.favorites
						? [...state.favorites, newOrder]
						: [newOrder],
				})),
			removeItem: (id) =>
				set((state) => ({
					favorites: state.favorites?.filter((item) => item.id !== Number(id)),
				})),
		}),
		{
			name: "favorites-storage",
		},
	),
);
