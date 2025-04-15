export const ErrorMessages = {
  EDI: {
    GENERATE_FAILED: "Failed to generate EDI",
    DECODE_FAILED: "Failed to decode EDI",
    NO_CARGO_ITEMS: "Please add at least one cargo item",
    NO_EDI_CONTENT: "Please enter EDI content",
  },
  API: {
    NETWORK_ERROR: "Network error occurred",
    REQUEST_FAILED: "Request failed",
  },
  VALIDATION: {
    REQUIRED_FIELD: (field: string) => `${field} is required`,
    INVALID_FORMAT: (field: string) => `Invalid ${field} format`,
  },
} as const;
