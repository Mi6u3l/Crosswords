import axios from "axios";
const apiHostname = "https://api.deezer.com";
const searchApiUrl = `${apiHostname}/search/artist?q=`;
const artistApiUrl = `${apiHostname}/artist`;
const albumApiUrl = `${apiHostname}/album`;

export const getArtists = async (artistName) => {
  const responseFromAPI = await axios.get(`${searchApiUrl}${artistName}`);
  return responseFromAPI.data;
};

export const getAlbums = async (artistId) => {
  const responseFromAPI = await axios.get(`${artistApiUrl}/${artistId}/albums`);
  return responseFromAPI.data;
};

export const getTracks = async (albumId) => {
  const responseFromAPI = await axios.get(`${albumApiUrl}/${albumId}/tracks`);
  return responseFromAPI.data;
};
