import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme
} from "@mui/material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import EventIcon from "@mui/icons-material/Event";

const categoryConfig = {
  placement: {
    color: "#d81b60", // Premium Pink/Crimson
    lightColor: "#fce4ec",
    icon: <WorkIcon fontSize="small" sx={{ color: "#d81b60" }} />
  },
  result: {
    color: "#1e88e5", // Bright Blue
    lightColor: "#e3f2fd",
    icon: <SchoolIcon fontSize="small" sx={{ color: "#1e88e5" }} />
  },
  event: {
    color: "#43a047", // Warm Green
    lightColor: "#e8f5e9",
    icon: <EventIcon fontSize="small" sx={{ color: "#43a047" }} />
  }
};

export function NotificationCard({ notification, onToggleRead }) {
  const theme = useTheme();
  const cat = notification.category?.toLowerCase() || "event";
  const config = categoryConfig[cat] || categoryConfig.event;
  const isUnread = notification.unread;

  const dateStr = new Date(notification.timestamp).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: "12px",
        borderLeft: `5px solid ${config.color}`,
        border: isUnread ? `1.5px solid ${theme.palette.primary.main}` : "1px solid #e0e0e0",
        borderLeftWidth: "5px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: isUnread 
          ? `0 0 15px rgba(25, 118, 210, 0.15)` 
          : "0 2px 4px rgba(0,0,0,0.02)",
        backgroundColor: isUnread ? "rgba(25, 118, 210, 0.01)" : "#ffffff",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: isUnread
            ? `0 8px 24px rgba(25, 118, 210, 0.25)`
            : "0 8px 16px rgba(0,0,0,0.06)",
          borderColor: isUnread ? theme.palette.primary.main : "#b0b0b0",
        },
        ...(isUnread && {
          animation: "unreadGlow 3s infinite alternate",
          "@keyframes unreadGlow": {
            "0%": {
              boxShadow: "0 0 4px rgba(25, 118, 210, 0.1)"
            },
            "100%": {
              boxShadow: "0 0 16px rgba(25, 118, 210, 0.25)"
            }
          }
        })
      }}
    >
      <CardContent sx={{ py: 2, px: 2.5, "&:last-child": { pb: 2 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
              <Chip
                icon={config.icon}
                label={notification.category}
                size="small"
                sx={{
                  backgroundColor: config.lightColor,
                  color: config.color,
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  borderRadius: "6px",
                  "& .MuiChip-icon": { marginLeft: "4px" }
                }}
              />
              {notification.priorityScore && (
                <Chip
                  label={`Score: ${notification.priorityScore}`}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "0.7rem",
                    height: "20px",
                    color: "text.secondary",
                    borderColor: "#e0e0e0"
                  }}
                />
              )}
              {isUnread && (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: theme.palette.primary.main,
                    display: "inline-block",
                    animation: "pulseDot 1.5s infinite",
                    "@keyframes pulseDot": {
                      "0%": { transform: "scale(0.8)", opacity: 0.5 },
                      "50%": { transform: "scale(1.2)", opacity: 1 },
                      "100%": { transform: "scale(0.8)", opacity: 0.5 }
                    }
                  }}
                />
              )}
            </Stack>

            <Typography
              variant="subtitle1"
              fontWeight={isUnread ? 700 : 600}
              color={isUnread ? "text.primary" : "text.secondary"}
              gutterBottom
              sx={{ lineHeight: 1.3 }}
            >
              {notification.title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 1.5,
                lineHeight: 1.4,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden"
              }}
            >
              {notification.message}
            </Typography>

            <Typography variant="caption" color="text.disabled" fontWeight={500}>
              {dateStr}
            </Typography>
          </Box>

          <Tooltip title={isUnread ? "Mark as Read" : "Mark as Unread"}>
            <IconButton
              size="small"
              onClick={() => onToggleRead(notification.id)}
              sx={{
                color: isUnread ? theme.palette.primary.main : "action.disabled",
                backgroundColor: isUnread ? "rgba(25, 118, 210, 0.05)" : "transparent",
                "&:hover": {
                  backgroundColor: isUnread 
                    ? "rgba(25, 118, 210, 0.1)" 
                    : "rgba(0,0,0,0.04)"
                }
              }}
            >
              {isUnread ? <MarkEmailUnreadIcon fontSize="small" /> : <MarkEmailReadIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Stack>
      </CardContent>
    </Card>
  );
}
