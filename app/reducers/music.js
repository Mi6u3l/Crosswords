import { RECEIVE_ALBUMS, RECEIVE_ARTISTS, SET_ALBUM, SET_ARTIST, RECEIVE_TRACKS } from "../actions/actionTypes";

export default function artists(state = {}, action) {
    switch(action.type) {
      case RECEIVE_ARTISTS: 
        return { 
          ...state, 
          artists: action.artists.data.slice(0,8)
        }
      case RECEIVE_ALBUMS: 
        return { 
          ...state, 
          albums: action.albums.data.slice(0,6)
        }
      case SET_ARTIST: 
        return { 
          ...state, 
          artist: action.artist, 
          artists: []
        }
      case SET_ALBUM: 
        return { 
          ...state, 
          album: action.album
        }
      case RECEIVE_TRACKS: 
        return { 
          ...state, 
          tracks: action.tracks.data.slice(0,6)
        }
      default:
        return state
    }
  }