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

interface AlertContextType {
  showAlert: (alert: AlertData) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<AlertData | null>(null);

  const showAlert = useCallback((alert: AlertData) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AnimatePresence>
        {alert && (
          <motion.div
            key='alert'
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
              <CheckCircle className='w-5 h-5' />
            ) : (
              <AlertCircle className='w-5 h-5' />
            )}
            <span className='text-sm font-medium'>{alert.message}</span>
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
