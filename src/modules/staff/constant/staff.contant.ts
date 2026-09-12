export const StaffStatus = {
  KEYS: {
    1: { text: "Active", color: "success" },
    2: { text: "Inactive", color: "default" },
    3: { text: "Suspended", color: "error" },
  },
  VALUES: { Active: 1, Inactive: 2, Suspended: 3 },
} as const;
