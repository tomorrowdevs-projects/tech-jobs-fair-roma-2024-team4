import React, { useEffect } from 'react';

interface NotificationProviderProps {
    children: React.ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    useEffect(() => {
        if ("Notification" in window) {
            Notification.requestPermission()
                .then(permission => {
                    if (permission !== "granted") {
                        console.warn("Permesso per le notifiche non concesso.");
                    }
                })
                .catch(console.error);
        }
    }, []);

    return <>{children}</>;
};

export default NotificationProvider;
