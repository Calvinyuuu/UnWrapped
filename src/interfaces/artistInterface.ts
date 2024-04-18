interface ArtistData{
    genres: Genres[];
    href: string;
    id: string;
    images: Images[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

interface Genres{
    genres: string;
}
interface Images{
    url: string;
    height: number;
    width: number;
}
export type { ArtistData }