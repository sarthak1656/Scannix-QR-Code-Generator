import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({
  message,
  type,
  isVisible,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }[type];

  const icon = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  }[type];

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 min-w-64`}
      >
        <span className="text-lg">{icon}</span>
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-auto text-white hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
