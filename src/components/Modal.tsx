"use client";
import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export const Modal = ({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<Props>) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50">
        <div className="relative left-[35%] top-[10%] z-10 bg-white rounded-lg shadow-lg p-8 pb-4 min-w-[320px] max-w-[400px]">
          <button
            className="absolute top-2 right-5 text-2xl text-gray-400 hover:text-black"
            onClick={onClose}
            aria-label="Закрыть"
          >
            &times;
          </button>
          {children}
        </div>
      </div>
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black bg-opacity-50"
      ></div>
    </div>,
    document.body
  );
};
