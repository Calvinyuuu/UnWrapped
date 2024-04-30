"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ResponseData } from "../../interfaces/songInterface";
import { getAccessCode, getSongData, getTotalGenres } from "../../functions/apiFunctions";
const Card = dynamic(() => import("../../components/Card"), { ssr: true });

//function to handle the POST request to trade for the access token and to display the information traded with the access token
const Page: React.FC = () => {
  const router = useRouter();
  //get the state and code from the URL
  const searchParams = useSearchParams();
  const state: string = searchParams.get("state") as string;
  const code: string = searchParams.get("code") as string;

  if (typeof window !== "undefined") {
    // Access window object here
    window.history.pushState({}, "", "/dashboard");
  }

  // Define state to hold the data
  const [songDataShort, setSongDataShort] = useState<ResponseData>({ items: [] });
  const [songDataMedium, setSongDataMedium] = useState<ResponseData>({ items: [] });
  const [songDataLong, setSongDataLong] = useState<ResponseData>({ items: [] });

  const [genreDataShort, setGenreDataShort] = useState<Map<string, number>>(new Map<string, number>());
  const [genreDataMedium, setGenreDataMedium] = useState<Map<string, number>>(new Map<string, number>());
  const [genreDataLong, setGenreDataLong] = useState<Map<string, number>>(new Map<string, number>());

  useEffect(() => {
    // window.history.pushState({}, "", "/dashboard");
    const getData = async () => {
      let access_token = await getAccessCode(state, code);
      const songsShort = await getSongData(access_token, "short_term");
      const songsMedium = await getSongData(access_token, "medium_term");
      const songsLong = await getSongData(access_token, "long_term");
      setSongDataShort(songsShort!);
      setSongDataMedium(songsMedium!);
      setSongDataLong(songsLong!);
      const genresShort = await getTotalGenres(access_token, "short_term");
      const genresMedium = await getTotalGenres(access_token, "medium_term");
      const genresLong = await getTotalGenres(access_token, "long_term");
      setGenreDataShort(genresShort!);
      setGenreDataMedium(genresMedium!);
      setGenreDataLong(genresLong!);
    };
    //if the state is not 'error=access_denied' then getToken using state and code
    if (state !== "error=access_denied") {
      getData();
    } else {
      router.push("/");
    }
  }, []);
  return (
    <>
      <Card {...songDataShort} dataRange="Last Month" genreData={genreDataShort} />
      <Card {...songDataMedium} dataRange="Last Six Months" genreData={genreDataMedium} />
      <Card {...songDataLong} dataRange="Last Few Years" genreData={genreDataLong} />
    </>
  );
};

export default Page;
