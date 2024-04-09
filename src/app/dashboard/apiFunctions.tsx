import { ArtistData } from "@/interfaces/artistInterface";
import { ResponseData } from "@/interfaces/songInterface";

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
    console.log(error);
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
      console.log(error);
    }
  }
  return {} as ResponseData;
}

export async function getTotalGenres(access_token: string, time_range: string): Promise<Map<string, number>> {
  if (access_token) {
    try {
      const response = await fetch("/api/artists", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token, time_range }),
      });
      const artistData = (await response.json()) as ArtistData;
      return tallyGenres(artistData);
    } catch (error) {
      console.log(error);
    }
  }
  //returns an empty map if the access token is not valid
  return new Map<string, number>();
}

export function tallyGenres(data: ArtistData): Map<string, number> {
  let genreCounts = new Map<string, number>();

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
    return genreCounts;
  }
  return genreCounts;
}
