import React from "react";
import { ArtistSearch } from "../components/ArtistSearch";
import configureStore from "redux-mock-store";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

test("Renders correctly", () => {
  const initialState = { music: { artists: [] } };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  const { getByPlaceholderText } = render(
    <Provider store={store}>
      <ArtistSearch />
    </Provider>
  );
  expect(getByPlaceholderText("Search here")).not.toBeNull();
});
