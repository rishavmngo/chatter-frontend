import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function timeAgo(timestamp: string, long = true) {
    const now: Date = new Date();
    const date = new Date(timestamp);

    //@ts-ignore
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) {
        return seconds + " sec" + (long ? " ago" : "");
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return minutes + " min" + (long ? " ago" : "");
    } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        return hours + " hr" + (long ? " ago" : "");
    } else {
        // You can customize this part to return "X days ago" or "X months ago" as needed.
        const days = Math.floor(seconds / 86400);
        return days + " days" + (long ? " ago" : "");
    }
}
