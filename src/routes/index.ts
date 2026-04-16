import { Route } from "bluemountain-platfrom"
import { proposalRoutes } from "./proposalRoutes"
import { Express } from 'express'
export const registerAllRoutes = (app: Express): Route[] => {
    return [
        ...proposalRoutes(app)
    ]
}