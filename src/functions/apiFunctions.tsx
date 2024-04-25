import { GenreData } from "@/interfaces/genreInterface";
import { ResponseData } from "@/interfaces/songInterface";
import { ArtistData } from "@/interfaces/artistInterface";

export function tallyArtist(data: ResponseData): Map<string, number> {
  const artistCounts = new Map<string, number>();

  if (data.items) {
    data.items.forEach((item) => {
      item.artists.forEach((artist) => {
        if (artistCounts.has(artist.name)) {
          artistCounts.set(artist.name, artistCounts.get(artist.name)! + 1);
        } else {
          artistCounts.set(artist.name, 1);
        }
      });
    });
  }
  return artistCounts;
}

export function tallyGenres(data: GenreData): Map<string, number> {
  const genreCounts = new Map<string, number>();

  if (data.items) {
    data.items.forEach((item) => {
      item.genres.forEach((genre) => {
        if (genreCounts.has(genre)) {
          genreCounts.set(genre, genreCounts.get(genre)! + 1);
        } else {
          genreCounts.set(genre, 1);
        }
      });
    });
  }
  return genreCounts;
}

export async function getAccessCode(state: string, code: string): Promise<string> {
  //create the body of the request
  const data = { state: state, code: code };
  try {
    const response = await fetch("/api/auth/token", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (responseData.token) {
      return responseData.token;
    }
  } catch (error) {
    console.error(error);
  }
  return "";
}

export async function getSongData(access_token: string, time_range: string): Promise<ResponseData> {
  if (access_token) {
    try {
      const response = await fetch("/api/data", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token, time_range }),
      });
      const responseData = (await response.json()) as ResponseData;
      if (responseData) {
        return responseData;
      }
    } catch (error) {
      console.error(error);
    }
  }
  return {} as ResponseData;
}

export async function getTotalGenres(access_token: string, time_range: string): Promise<Map<string, number>> {
  if (access_token) {
    try {
      const response = await fetch("/api/data/genres", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token, time_range }),
      });
      const genreData = (await response.json()) as GenreData;
      return tallyGenres(genreData);
    } catch (error) {
      console.error(error);
    }
  }
  //returns an empty map if the access token is not valid
  return new Map<string, number>();
}

export async function getArtistInfo(access_token: string, href: string): Promise<ArtistData | null> {
  if (access_token && href) {
    try {
      const response = await fetch("api/data/artist", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token, href }),
      });
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      const artistData = (await response.json()) as ArtistData;
      return artistData;
    } catch (error) {
      console.error(error);
    }
  }
  return null;
}

export async function getToken(): Promise<string> {
  try {
    const response = await fetch("/api/auth/token", {
      method: "GET",
      mode: "no-cors",
    });
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error(error);
  }
  return "";
}
