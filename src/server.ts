import express, { Express, NextFunction, RequestHandler } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import { logger, tracingMiddleware } from 'bluemountain-platfrom';
dotenv.config();
logger.info('Loading config is completed.')
import { platform } from "./platform";
import SubmitProposal from './routes/submitPrposal';
import { registerAllRoutes } from './routes';



const app: Express = express();
const port = process.env.SERVER_PORT;
const environment = process.env.ENV

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(tracingMiddleware)
const submitProposal = new SubmitProposal()
const routes = registerAllRoutes(app)

platform.init(routes).then(() => {
    app.listen(port, async () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}, pointing to ${environment}`);
    })
    app.post("/proposal/submit", submitProposal.submit.bind(submitProposal))
}).catch((err: any) => {
    logger.error('Failed to load platform ', err)
})

