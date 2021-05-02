import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlbum, getTracksFromAPI } from "../actions/music";

export const AlbumsList = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [artistName, setArtistName] = useState("");
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.music.album && isSearching) {
      dispatch(getTracksFromAPI(state.music.album.id));
      setIsSearching(false);
    }

    if (state.music.artist) {
      setArtistName(state.music.artist.name);
    }
  }, [state]);

  const onSelectAlbum = (album) => {
    setIsSearching(true);
    dispatch(setAlbum(album));
  };

  return (
    <section className="albums__list">
      {state.music.albums ? (
        <>
          <p className="albums__list-header">
            Search results for: "{artistName}"
          </p>
          <p className="albums__list-title">Albums</p>
          <ul>
            {state.music.albums.map((album) => {
              return (
                <li key={album.id} onClick={() => onSelectAlbum(album)}>
                  <img src={album.cover_medium} alt={album.title} />
                  {album.title}
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </section>
  );
};
