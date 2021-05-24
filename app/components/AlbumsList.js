import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlbum, getTracksFromAPI } from "../actions/music";

export const AlbumsList = () => {
  const music = useSelector((state) => state.music);
  const dispatch = useDispatch();

  useEffect(() => {
    if (music.album && music.album.id) {
      dispatch(getTracksFromAPI(music.album.id));
    }
  }, [music.album]);

  const onSelectAlbum = (album) => {
    dispatch(setAlbum(album));
  };

  return (
    <section className="albums__list">
      {music.albums.length ? (
        <>
          <p className="albums__list-header">
            Search results for: "{music.artist && music.artist.name}"
          </p>
          <p className="albums__list-title">Albums</p>
          <ul>
            {music.albums.map((album) => {
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
