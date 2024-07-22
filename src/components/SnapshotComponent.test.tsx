import { render } from "@testing-library/react"
import SnapshotComponent from "./SnapshotComponent"

it("スナップショットテスト", () => {
  const { container } = render(<SnapshotComponent text="react"/>);
  expect(container).toMatchSnapshot();
})