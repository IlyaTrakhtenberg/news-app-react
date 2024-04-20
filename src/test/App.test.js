import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import wrapped from "./wrap";
import App from "../App";
import store from "../data/store";
const resize = (w) => {
  const resizeEvent = document.createEvent("Event");
  resizeEvent.initEvent("resize", true, true);
  global.window.innerWidth = w;
  global.window.dispatchEvent(resizeEvent);
};
describe(App, () => {
  it("indicates if the device is mobile portrait", () => {
    render(wrapped(<App />));
    act(() => resize(768));
    expect(store.getState().isMobile).toBe(false);
    act(() => resize(767));
    expect(store.getState().isMobile).toBe(true);
  });
});
