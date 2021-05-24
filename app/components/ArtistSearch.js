import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getArtistsFromAPI,
  getAlbumsFromAPI,
  setArtist,
  receiveArtists,
} from "../actions/music";

import { useDebounce } from "../hooks/useDebounce";

export const ArtistSearch = () => {
  const searchInput = useRef("");
  const debouncedSearchTerm = useDebounce(searchInput.current.value, 300);
  const music = useSelector((state) => state.music);

  const dispatch = useDispatch();

  useEffect(() => {
    if (music.artist && music.artist.id) {
      dispatch(getAlbumsFromAPI(music.artist.id));
    }
  }, [music.artist]);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      dispatch(receiveArtists([]));
    } else if (debouncedSearchTerm) {
      dispatch(getArtistsFromAPI(debouncedSearchTerm));
    }
  }, [debouncedSearchTerm]);

  const onChange = () => {
    dispatch(setArtist(null));
  };

  const onSelectArtist = (artist) => {
    dispatch(setArtist(artist));
  };

  if (music.status === "error") {
    return <h2>Error occurred</h2>;
  }

  return (
    <section className="search__artist">
      <input
        type="text"
        ref={searchInput}
        onChange={onChange}
        placeholder="Search here"
      />
      <button className="search__button">Search</button>

      {music.artists.length ? (
        <div className="artist__results">
          <p>Search results</p>
          <ul>
            {music.artists.map((artist) => {
              return (
                <li key={artist.id} onClick={() => onSelectArtist(artist)}>
                  {artist.name}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </section>
  );
};
