import { AxiosError } from "axios";

export function extractErrorMessage(error: unknown): string {
    if (error instanceof AxiosError) {
        const data = error.response?.data;
        
        if (!data) return error.message;

        if (typeof data === "string") return data;

        if (typeof data === "object") {
            if ("message" in data && typeof data.message === "string") {
                return data.message;
            }

            if ("error" in data && typeof data.error === "string") {
                return data.error;
            }
        }
    }

    return "Something went wrong. Please try again.";
}