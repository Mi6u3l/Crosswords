import axios, { AxiosResponse } from "axios";
const apiHostname = "https://api.deezer.com";
const searchApiUrl = `${apiHostname}/search/artist?q=`;
const artistApiUrl = `${apiHostname}/artist`;
const albumApiUrl = `${apiHostname}/album`;

export interface Artist {
  id: number;
  name: string;
}

export interface Album {
  id: number;
  title: string;
  release_date: string;
}

export interface Track {
  id: number;
  title: string;
  duration: string;
}

export const getArtists = async (
  artistName: string
): Promise<AxiosResponse<Artist[]>> => {
  const responseFromAPI = await axios.get(`${searchApiUrl}${artistName}`);
  return responseFromAPI.data;
};

export const getAlbums = async (
  artistId: number
): Promise<AxiosResponse<Album[]>> => {
  const responseFromAPI = await axios.get(`${artistApiUrl}/${artistId}/albums`);
  return responseFromAPI.data;
};

export const getTracks = async (
  albumId: number
): Promise<AxiosResponse<Track[]>> => {
  const responseFromAPI = await axios.get(`${albumApiUrl}/${albumId}/tracks`);
  return responseFromAPI.data;
};
