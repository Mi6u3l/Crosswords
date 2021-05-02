import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ArtistSearch } from "./components/ArtistSearch";
import { AlbumsList } from "./components/AlbumsList";
import { TracksList } from "./components/TracksList";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

class App extends React.Component {
  render() {
    return (
      <main className="search">
        <ArtistSearch />
        <AlbumsList />
        <TracksList />
      </main>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
