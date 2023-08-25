declare var process : {
  env: {
    AUTH_SERVICE_PROTOCOL: string;
    BOOKING_SERVICE_PROTOCOL: string;
    RATING_SERVICE_PROTOCOL: string;
    STORAGE_STUB_SERVICE_PROTOCOL: string;
    USER_SERVICE_PROTOCOL: string;
    VEHICLE_SERVICE_PROTOCOL: string;

    AUTH_SERVICE_HOSTNAME: string;
    BOOKING_SERVICE_HOSTNAME: string;
    RATING_SERVICE_HOSTNAME: string;
    STORAGE_STUB_SERVICE_HOSTNAME: string;
    USER_SERVICE_HOSTNAME: string;
    VEHICLE_SERVICE_HOSTNAME: string;

    AUTH_SERVICE_PORT: number | undefined;
    BOOKING_SERVICE_PORT: number | undefined;
    RATING_SERVICE_PORT: number | undefined;
    STORAGE_STUB_SERVICE_PORT: number | undefined;
    USER_SERVICE_PORT: number | undefined;
    VEHICLE_SERVICE_PORT: number | undefined;

    AUTH_SERVICE_CONTEXT: string | undefined;
    BOOKING_SERVICE_CONTEXT: string | undefined;
    RATING_SERVICE_CONTEXT: string | undefined;
    STORAGE_STUB_SERVICE_CONTEXT: string | undefined;
    USER_SERVICE_CONTEXT: string | undefined;
    VEHICLE_SERVICE_CONTEXT: string | undefined;

    FRONTEND_APP_PROTOCOL: string;
    FRONTEND_APP_HOSTNAME: string;
    FRONTEND_APP_PORT: number | undefined;
    FRONTEND_APP_CONTEXT: string | undefined;
  }
}