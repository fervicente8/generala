"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle } from "lucide-react";
import clsx from "clsx";

type AlertType = "success" | "error";

interface AlertData {
  type: AlertType;
  message: string;
}

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
}

interface ConfirmState extends ConfirmOptions {
  resolve: (value: boolean) => void;
}

interface AlertContextType {
  showAlert: (alert: AlertData) => void;
  showConfirm: (options: ConfirmOptions) => Promise<boolean>;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<AlertData | null>(null);
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null);

  const showAlert = useCallback((alert: AlertData) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }, []);

  const showConfirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setConfirmState({
        ...options,
        resolve: (value) => {
          setConfirmState(null);
          resolve(value);
        },
      });
    });
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, showConfirm }}>
      {children}
      <AnimatePresence>
        {alert && (
          <motion.div
            key="alert"
            initial={{ y: 24, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={clsx(
              "fixed left-1/2 -translate-x-1/2 px-6 py-4 rounded-2xl shadow-xl text-white flex items-center gap-3 z-50",
              "bottom-6 alert-bottom max-w-[calc(100vw-2rem)]",
              alert.type === "success" ? "bg-green-500" : "bg-red-500"
            )}
          >
            {alert.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">{alert.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmState && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => confirmState.resolve(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="w-full max-w-sm rounded-2xl border-2 border-amber-200/80 bg-[#F5F5F5] shadow-xl p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-poppins font-bold text-lg text-[#1A1A1A] mb-2">
                {confirmState.title ?? "Confirmar"}
              </h3>
              <p className="text-sm text-[#555] mb-5">{confirmState.message}</p>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => confirmState.resolve(false)}
                  className="px-4 py-2 rounded-xl font-poppins font-semibold text-sm text-[#555] hover:bg-gray-200 transition"
                >
                  {confirmState.cancelLabel ?? "Cancelar"}
                </button>
                <button
                  type="button"
                  onClick={() => confirmState.resolve(true)}
                  className={clsx(
                    "px-4 py-2 rounded-xl font-poppins font-semibold text-sm text-white transition",
                    confirmState.danger
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-[#2E4A3D] hover:bg-[#2E4A3D]/90"
                  )}
                >
                  {confirmState.confirmLabel ?? "Aceptar"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
