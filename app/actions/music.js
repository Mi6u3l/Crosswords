import {
  RECEIVE_ARTISTS,
  RECEIVE_ALBUMS,
  SET_ARTIST,
  SET_ALBUM,
  RECEIVE_TRACKS,
} from "./actionTypes";
import { getArtists, getAlbums, getTracks } from "../utils/api";

export const receiveArtists = (artists) => {
  return {
    type: RECEIVE_ARTISTS,
    artists,
  };
}

export const receiveAlbums = (albums) => {
  return {
    type: RECEIVE_ALBUMS,
    albums,
  };
}

export const receiveTracks = (tracks) => {
  return {
    type: RECEIVE_TRACKS,
    tracks,
  };
}

export const setArtist = (artist) => {
  return {
    type: SET_ARTIST,
    artist,
  };
}

export const setAlbum = (album) => {
  return {
    type: SET_ALBUM,
    album,
  };
}

export const getAlbumsFromAPI = (artistId) => {
  return async (dispatch) => {
    const response = await getAlbums(artistId);
    dispatch(receiveAlbums(response));
  };
}

export const getArtistsFromAPI = (artistName) => {
  return async (dispatch) => {
    const response = await getArtists(artistName);
    dispatch(receiveArtists(response));
  };
}

export const getTracksFromAPI = (albumId) => {
  return async (dispatch) => {
    const response = await getTracks(albumId);
    dispatch(receiveTracks(response));
  };
}