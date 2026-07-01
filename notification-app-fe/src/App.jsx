import { useEffect } from "react";
import { NotificationsPage } from "./pages/NotificationsPage";
import { getAuthToken } from "./api/notifications";

export default function App() {
  useEffect(() => {
    // Trigger auth logging on app mount
    getAuthToken();
  }, []);

  return <NotificationsPage />;
}