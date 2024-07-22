import axios from "axios";
import { UserSearch } from "./UserSearch";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";

jest.mock("axios");
const axiosMock = jest.mocked(axios);

const user = userEvent.setup();

describe("UserSearch", () => {
  it("入力フォームに入力した値でAPIリクエストが発生する", async() => {
    const userInfo = {
      id: 1,
      name: "Taro"
    };
    const res = {data: userInfo};
    axiosMock.get.mockResolvedValue(res);
    render(<UserSearch />);

    const input = screen.getByRole("textbox");
    await user.type(input, userInfo.name);
    const button = screen.getByRole("button");
    await user.click(button);
    expect(axiosMock.get).toHaveBeenCalledWith(`/api/users?query=${userInfo.name}`)
  });
  it("ーザー情報が正しく画面に表示される", async() => {
    const userInfo = {
      id: 1,
      name: "Taro"
    };
    const res = {data: userInfo};
    axiosMock.get.mockResolvedValue(res);
    render(<UserSearch />);

    const input = screen.getByRole("textbox");
    await user.type(input, userInfo.name);
    const button = screen.getByRole("button");
    await user.click(button);
    waitFor(() => {
      expect(screen.getByText(userInfo.name)).toBeInTheDocument();
    });
  });
});