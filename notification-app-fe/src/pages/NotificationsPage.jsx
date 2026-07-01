import { useState } from "react";
import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";

import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";

export function NotificationsPage() {
  const theme = useTheme();
  
  const {
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
    handleCategoryChange
  } = useNotifications();

  return (
    <Box sx={{ maxWidth: 840, mx: "auto", px: 3, py: 5 }}>
      {/* Title Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Badge badgeContent={unreadCount} color="error" max={99}>
            <Box 
              sx={{
                p: 1, 
                borderRadius: "10px", 
                backgroundColor: "primary.light",
                color: "primary.main",
                display: "flex",
                alignItems: "center"
              }}
            >
              <NotificationsIcon sx={{ fontSize: 32 }} />
            </Box>
          </Badge>
          <Box>
            <Typography variant="h4" fontWeight={800} color="text.primary" sx={{ lineHeight: 1.1 }}>
              Campus Pulse
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Real-time updates, results, and events
            </Typography>
          </Box>
        </Stack>

        <Button
          variant="outlined"
          color="primary"
          startIcon={<DoneAllIcon />}
          onClick={markPageAsRead}
          disabled={loading || notifications.length === 0 || unreadCount === 0}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            px: 2.5
          }}
        >
          Mark Page as Read
        </Button>
      </Stack>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", border: "1px solid #e0e0e0" }}>
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ p: 1.5, borderRadius: "8px", backgroundColor: "#e3f2fd", color: "#1976d2" }}>
                <LibraryBooksIcon />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={700}>{total}</Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={500}>Total Notifications</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", border: "1px solid #e0e0e0" }}>
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ p: 1.5, borderRadius: "8px", backgroundColor: "#fbe9e7", color: "#d84315" }}>
                <MarkEmailUnreadIcon />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={700} color="#d84315">{unreadCount}</Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={500}>Unread Alerts</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", border: "1px solid #e0e0e0" }}>
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ p: 1.5, borderRadius: "8px", backgroundColor: "#efebe9", color: "#4e342e" }}>
                <TrendingUpIcon />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={700}>{category}</Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={500}>Active Filter</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs Section */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={tab}
          onChange={(_, val) => handleTabChange(val)}
          aria-label="Notification view tabs"
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 700,
              fontSize: "1rem",
              minWidth: "auto",
              px: 3
            }
          }}
        >
          <Tab value="all" label="All Alerts" />
          <Tab value="priority" label="Priority Inbox" />
        </Tabs>
      </Box>

      {/* Filter and Limit Controls */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={2}
        mb={3}
      >
        <NotificationFilter value={category} onChange={handleCategoryChange} />

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="limit-select-label">Show Limit</InputLabel>
          <Select
            labelId="limit-select-label"
            id="limit-select"
            value={limit}
            label="Show Limit"
            onChange={(e) => handleLimitChange(e.target.value)}
            sx={{ borderRadius: "8px" }}
          >
            <MenuItem value={5}>5 per page</MenuItem>
            <MenuItem value={10}>10 per page</MenuItem>
            <MenuItem value={15}>15 per page</MenuItem>
            <MenuItem value={20}>20 per page</MenuItem>
            <MenuItem value={30}>30 per page</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Loading State */}
      {loading && (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress size={40} thickness={4} />
        </Box>
      )}

      {/* Error State */}
      {!loading && error && (
        <Alert severity="error" sx={{ borderRadius: "8px", mb: 3 }}>
          Failed to load notifications: {error}
        </Alert>
      )}

      {/* Empty State */}
      {!loading && !error && notifications.length === 0 && (
        <Alert severity="info" sx={{ borderRadius: "8px", mb: 3 }}>
          {tab === "priority"
            ? "Your Priority Inbox is clean! No unread notifications found."
            : "No notifications match your current filter."}
        </Alert>
      )}

      {/* Notifications List */}
      {!loading && !error && notifications.length > 0 && (
        <Stack spacing={2}>
          {notifications.map((n) => (
            <NotificationCard
              key={n.id}
              notification={n}
              onToggleRead={toggleReadStatus}
            />
          ))}
        </Stack>
      )}

      {/* Pagination (Only for "All Alerts" tab) */}
      {!loading && !error && tab === "all" && totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={5}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, val) => handlePageChange(val)}
            color="primary"
            shape="rounded"
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                fontWeight: 600,
                borderRadius: "8px"
              }
            }}
          />
        </Box>
      )}
    </Box>
  );
}
