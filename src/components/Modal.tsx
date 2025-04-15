"use client";
import styled from "styled-components";
import { ReactNode } from "react";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: #6b6b6b97;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dialog = styled.div`
  background: #333;
  padding: 2rem;
  border-radius: 12px;
  min-width: 400px;
  max-width: 90%;
  color: white;
`;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose} data-testid="modal-overlay">
      <Dialog onClick={(e) => e.stopPropagation()}>{children}</Dialog>
    </Overlay>
  );
}
