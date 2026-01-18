import {
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Button from "./Button";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass rounded-2xl p-6 max-w-md w-full shadow-soft">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-yellow-500/10 mb-4">
          <ExclamationTriangleIcon className="h-7 w-7 text-yellow-400" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-display font-semibold text-white text-center mb-2">
          {title}
        </h3>
        <p className="text-gray-400 text-center mb-6">{message}</p>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="ghost"
            fullWidth
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant="danger"
            fullWidth
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
