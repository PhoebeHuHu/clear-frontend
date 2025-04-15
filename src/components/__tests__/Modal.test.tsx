import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../Modal";

describe("Modal", () => {
  const contentText = "This is modal content";

  it("should not render when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()}>
        <div>modal content</div>
      </Modal>
    );

    expect(screen.queryByTestId("modal-overlay")).not.toBeInTheDocument();
  });

  it("should render when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>{contentText}</div>
      </Modal>
    );
    expect(screen.getByText(contentText)).toBeInTheDocument();
  });

  it("should call onClose when clicking overlay", () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>{contentText}</div>
      </Modal>
    );
    const overlay = screen.getByTestId("modal-overlay");
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  it("should not call onClose when clicking inside dialog", () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>{contentText}</div>
      </Modal>
    );
    const dialog = screen.getByText(contentText);
    fireEvent.click(dialog);
    expect(onClose).not.toHaveBeenCalled();
  });
});
