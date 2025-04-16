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
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={clsx(
              "fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-4 rounded-2xl shadow-xl text-white flex items-center gap-3 z-50",
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
