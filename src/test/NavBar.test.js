import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import NavBar from "../components/navbar/NavBar";
import NavLinkSaved from "../components/navbar/NavLinkSaved";
import store, { mobile, notMobile, setStateTest } from "../data/store";
import wrapped from "./wrap";
const changeEvent = document.createEvent("Event");
changeEvent.initEvent("change", true, true);
describe(NavBar, () => {
  it("endpoint and category corresponds to UI if not mobile", () => {
    const { getByTestId, getAllByRole } = render(wrapped(<NavBar />));
    act(() => store.dispatch(notMobile()));
    const [allNews, saved] = ["everything", "saved"].map((id) =>
      getByTestId(id)
    );
    const categories = getAllByRole("button");
    expect(store.getState().category).toBe("general");
    fireEvent.click(allNews);
    expect(allNews).toHaveClass("active");
    fireEvent.click(saved);
    expect(saved).toHaveClass("active");
    categories.forEach((button) => {
      fireEvent.click(button);
      expect(store.getState().category).toBe(button.textContent.toLowerCase());
    });
  });
  it("endpoint and category corresponds to UI if mobile", () => {
    const { getByTestId, getAllByRole, getByRole } = render(
      wrapped(<NavBar />)
    );
    act(() => store.dispatch(mobile()));
    const [allNews, saved] = ["everything", "saved"].map((id) =>
      getByTestId(id)
    );
    const select = getByRole("combobox");
    const categories = getAllByRole("option");
    fireEvent.click(allNews);
    expect(allNews).toHaveClass("active");
    fireEvent.click(saved);
    expect(saved).toHaveClass("active");
    categories.forEach((option) => {
      act(() => {
        select.value = option.value;
        select.dispatchEvent(changeEvent);
      });
      expect(store.getState().category).toBe(option.value);
    });
  });
  it("displays saved articles icon correctly", () => {
    const { queryByTestId } = render(wrapped(<NavLinkSaved />));
    const indicator = () => queryByTestId("num-indicator");
    act(() => store.dispatch(setStateTest(null)));
    expect(indicator()).toBe(null);
    act(() => store.dispatch(setStateTest([])));
    expect(indicator()).toBe(null);
    act(() => store.dispatch(setStateTest(Array(5))));
    expect(indicator().textContent).toBe("5");
    act(() => store.dispatch(setStateTest(Array(100))));
    expect(indicator().textContent).toBe("99+");
  });
});
