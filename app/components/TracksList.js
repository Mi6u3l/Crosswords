import React from "react";
import { useSelector } from "react-redux";

export const TracksList = () => {
  const state = useSelector((state) => state);

  const calculateDuration = (time) => {
    const minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    return `${minutes}:${seconds}`;
  };

  return (
    <section className="tracks__list">
      {state.music.tracks && state.music.tracks.length ? (
        <>
          <div className="tracks__album-info">
            <img
              src={state.music.album.cover_medium}
              alt={state.music.album.title}
            />
            <p>{state.music.album.title}</p>
          </div>
          <table cellSpacing="0" cellPadding="0">
            <thead>
              <tr>
                <th></th>
                <th>#</th>
                <th>Title</th>
                <th>Artist</th>
                <th>Time</th>
                <th>Released</th>
              </tr>
            </thead>
            <tbody>
              {state.music.tracks.map((track, index) => {
                return (
                  <tr key={track.id}>
                    <td className="tracks__album-placeholder"></td>
                    <td>{index + 1}</td>
                    <td className="tracks__title">{track.title}</td>
                    <td>{track.artist.name}</td>
                    <td>{calculateDuration(track.duration)}</td>
                    <td>
                      {new Date(state.music.album.release_date).getFullYear()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : null}
    </section>
  );
};
