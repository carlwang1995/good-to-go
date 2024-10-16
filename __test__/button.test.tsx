import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/components/Button";

describe("測試Button是否正常", () => {
  test("測試渲染結果與 Snapshot 一致", () => {
    let { container } = render(<Button title="測試" type="confirm" />);
    expect(container).toMatchSnapshot();
  });
  test("當按下按鈕時，確定 mockFunc 會被呼叫", async () => {
    const mockFunc = jest.fn(); // 宣告一個模擬用的函式

    render(
      // 將 Button 渲染出來，因為之後才可以被抓得到
      <Button title="測試" type="confirm" onSmash={mockFunc} />,
    );

    const testButton = screen.getByText("測試");
    await userEvent.click(testButton); // 模擬使用者的點擊行為
    expect(mockFunc).toBeCalledTimes(1);
  });
});
