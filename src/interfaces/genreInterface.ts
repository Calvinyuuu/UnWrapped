interface GenreData {
    items: Item[];
}

interface Item {
    external_url: string;
    genres: string[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export type { GenreData };