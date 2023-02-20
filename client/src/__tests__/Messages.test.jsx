import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Messages from "../components/Messages";

const MOCK_MESSAGE = {
  id: 10,
  type: "outgoing",
  content: "test message",
};

vi.mock("../components/MessageThreadList", () => ({
  default: vi.fn((props) => (
    <ul>
      {props.threads.map((thread) => (
        <li
          key={thread.id}
          data-testid="threadListItem"
          onClick={() => props.onSelect(thread.id)}
        >
          {thread.messages[thread.messages.length - 1].content}
        </li>
      ))}
    </ul>
  )),
}));

vi.mock("../components/MessageThread", () => ({
  default: vi.fn((props) => (
    <>
      <ul data-testid="activeThread">
        {props.messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
      <button onClick={() => props.onSendMessage(MOCK_MESSAGE)}>Send</button>
    </>
  )),
}));

describe("Messages", () => {
  it("should add the new message to the active thread when a message is sent", () => {
    render(<Messages />);
    const sendButton = screen.getByText("Send");
    fireEvent.click(sendButton);

    const activeThread = screen.getByTestId("activeThread");
    expect(activeThread.textContent).toContain(MOCK_MESSAGE.content);
  });

  it("should show the selected thread's messages when a thread is selected", () => {
    render(<Messages />);

    const threadListItems = screen.getAllByTestId("threadListItem");
    const selectedThreadListItem = threadListItems[1];
    const messageFromSelectedThread = selectedThreadListItem.textContent;
    fireEvent.click(selectedThreadListItem);

    const activeThread = screen.getByTestId("activeThread");
    expect(activeThread.textContent).toContain(messageFromSelectedThread);
  });
});