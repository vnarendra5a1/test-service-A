import { Platform } from "bluemountain-platfrom";

console.log('Initializing platform...', process.env.SERVICE_NAME);

export const platform = new Platform(
    process.env.SERVICE_NAME!,
);