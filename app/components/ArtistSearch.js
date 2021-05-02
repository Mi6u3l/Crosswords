import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getArtistsFromAPI,
  getAlbumsFromAPI,
  setArtist,
} from "../actions/music";
import { useDebounce } from "../hooks/useDebounce";

export const ArtistSearch = () => {
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.music.artists && state.music.artists.length > 0) {
      setFilteredArtists(state.music.artists);
      setIsSearching(false);
    }

    if (state.music.artist && isSearching) {
      setSearchTerm(state.music.artist.name);
      dispatch(getAlbumsFromAPI(state.music.artist.id));
      setIsSearching(false);
    }
  }, [state]);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setFilteredArtists([]);
    } else if (debouncedSearchTerm && isSearching) {
      dispatch(getArtistsFromAPI(debouncedSearchTerm));
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);

  const onChange = (e) => {
    dispatch(setArtist(null));
    setIsSearching(true);
    setSearchTerm(e.target.value);
  };

  const onSelectArtist = (artist) => {
    setIsSearching(true);
    dispatch(setArtist(artist));
    setFilteredArtists([]);
    setSearchTerm(artist.name);
  };

  return (
    <section className="search__artist">
      <input
        type="text"
        onChange={onChange}
        value={searchTerm}
        placeholder="Search here"
      />
      <button className="search__button">Search</button>
      {filteredArtists.length ? (
        <div className="artist__results">
          <p>Search results</p>
          <ul>
            {filteredArtists.map((artist) => {
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
