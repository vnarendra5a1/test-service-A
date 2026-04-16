import { Platform } from "bluemountain-platfrom";

export const platform = new Platform(
    {
        clientId: process.env.CLIENT_ID!,
        brokers: process.env.KAFKA_BROKERS!.split(","),
    },
    process.env.SERVICE_NAME!,
);