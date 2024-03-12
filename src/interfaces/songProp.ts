interface ResponseData {
    items: Item[];
}
interface Item {
    album: Album;
    artists: Artist[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    uri: string;
}
interface Album {
    album_type: string;
    artists: Artist[];
    images: Image[];
    name: string;
    uri: string;
}
interface Image {
    height: number;
    url: string;
    width: number;
}
interface Artist {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}
export type { ResponseData, Item };