import { useState, useEffect, useCallback } from "react";
import { fetchNotifications } from "../api/notifications";
import { getTopNNotifications } from "../utils/MinHeap";
import { logger } from "logging-middleware";

export function useNotifications(initialTab = "all") {
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [tab, setTab] = useState(initialTab); // "all" or "priority"
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [category, setCategory] = useState("All");

  const [viewedIds, setViewedIds] = useState(() => {
    try {
      const saved = localStorage.getItem("viewed_notification_ids");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const updateViewedIds = useCallback((newIds) => {
    setViewedIds(newIds);
    try {
      localStorage.setItem("viewed_notification_ids", JSON.stringify(newIds));
    } catch (err) {
      // Silent catch
    }
  }, []);

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (tab === "priority") {
        const data = await fetchNotifications({
          page: 1,
          limit: 100,
          category
        });

        const fetchedNotifications = data.notifications ?? [];
        
        const unreadOnly = fetchedNotifications.filter(
          (n) => !viewedIds.includes(n.id)
        );

        const topN = getTopNNotifications(unreadOnly, limit);

        const enriched = topN.map((n) => ({ ...n, unread: true }));

        setNotifications(enriched);
        setTotal(enriched.length);
      } else {
        const data = await fetchNotifications({
          page,
          limit,
          category
        });

        const fetchedNotifications = data.notifications ?? [];
        const enriched = fetchedNotifications.map((n) => ({
          ...n,
          unread: !viewedIds.includes(n.id)
        }));

        setNotifications(enriched);
        setTotal(data.total ?? 0);
      }
    } catch (err) {
      setError(err.message || "Failed to load notifications");
      setNotifications([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [tab, page, limit, category, viewedIds]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const toggleReadStatus = useCallback((id) => {
    let nextIds;
    const isCurrentlyRead = viewedIds.includes(id);
    if (isCurrentlyRead) {
      nextIds = viewedIds.filter((x) => x !== id);
    } else {
      nextIds = [...viewedIds, id];
    }
    updateViewedIds(nextIds);
    
    logger.info("component", "Toggled notification read status", { id, read: !isCurrentlyRead });
  }, [viewedIds, updateViewedIds]);

  const markPageAsRead = useCallback(() => {
    const unreadIdsInView = notifications
      .filter((n) => !viewedIds.includes(n.id))
      .map((n) => n.id);

    if (unreadIdsInView.length > 0) {
      const nextIds = [...viewedIds, ...unreadIdsInView];
      updateViewedIds(nextIds);
    }

    logger.info("component", "Marked page as read", { count: unreadIdsInView.length });
  }, [notifications, viewedIds, updateViewedIds]);

  const handleTabChange = useCallback((newTab) => {
    setTab(newTab);
    setPage(1);
    logger.info("page", `User navigated to ${newTab === "priority" ? "Priority Inbox" : "All Alerts"} view`);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    logger.info("component", "Changed page number", { page: newPage });
  }, []);

  const handleLimitChange = useCallback((newLimit) => {
    setLimit(newLimit);
    setPage(1);
    logger.info("component", "Changed page limit", { limit: newLimit });
  }, []);

  const handleCategoryChange = useCallback((newCategory) => {
    setCategory(newCategory);
    setPage(1);
    logger.info("component", "Changed category filter", { category: newCategory });
  }, []);

  const totalPages = tab === "priority" ? 1 : Math.ceil(total / limit);

  // Global unread count in current view
  const unreadCount = notifications.filter((n) => n.unread).length;

  return {
    notifications,
    total,
    totalPages,
    loading,
    error,
    tab,
    page,
    limit,
    category,
    unreadCount,
    toggleReadStatus,
    markPageAsRead,
    handleTabChange,
    handlePageChange,
    handleLimitChange,
    handleCategoryChange,
    refresh: loadNotifications
  };
}
