import { createContext, useContext, useState, useCallback, useRef } from "react";

const ToastContext = createContext();

export function useToast() {
    return useContext(ToastContext);
}

let toastIdCounter = 0;

export function ToastProvider({ children }) {

    const [toasts, setToasts] = useState([]);
    const timersRef = useRef({});

    const removeToast = useCallback((id) => {
        setToasts(prev =>
            prev.map(t => t.id === id ? { ...t, removing: true } : t)
        );
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 300);
    }, []);

    const addToast = useCallback((type, message, title) => {

        const id = ++toastIdCounter;

        const titles = {
            success: "Thành công",
            error: "Lỗi",
            warning: "Cảnh báo",
            info: "Thông báo",
        };

        setToasts(prev => [...prev, {
            id,
            type,
            message,
            title: title || titles[type] || "Thông báo",
            removing: false,
        }]);

        timersRef.current[id] = setTimeout(() => {
            removeToast(id);
            delete timersRef.current[id];
        }, 4000);

        return id;

    }, [removeToast]);

    const toast = useCallback({
        success: (msg, title) => addToast("success", msg, title),
        error: (msg, title) => addToast("error", msg, title),
        warning: (msg, title) => addToast("warning", msg, title),
        info: (msg, title) => addToast("info", msg, title),
    }, [addToast]);

    // Rebuild the toast object when addToast changes
    const toastApi = {
        success: (msg, title) => addToast("success", msg, title),
        error: (msg, title) => addToast("error", msg, title),
        warning: (msg, title) => addToast("warning", msg, title),
        info: (msg, title) => addToast("info", msg, title),
    };

    const icons = {
        success: "✓",
        error: "✕",
        warning: "!",
        info: "i",
    };

    return (
        <ToastContext.Provider value={toastApi}>
            {children}
            <div className="toast-container">
                {toasts.map(t => (
                    <div
                        key={t.id}
                        className={`toast-item toast-${t.type} ${t.removing ? "removing" : ""}`}
                    >
                        <div className="toast-body">
                            <div className="toast-icon">
                                {icons[t.type]}
                            </div>
                            <div className="toast-content">
                                <div className="toast-title">{t.title}</div>
                                <div className="toast-message">{t.message}</div>
                            </div>
                            <button
                                className="toast-close"
                                onClick={() => removeToast(t.id)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="toast-progress">
                            <div className="toast-progress-bar" />
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );

}
