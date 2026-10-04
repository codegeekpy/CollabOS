function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Create Project</h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="mt-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;