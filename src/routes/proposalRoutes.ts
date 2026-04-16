import { Route } from "bluemountain-platfrom";
import SubmitProposal from "./submitPrposal";
import { Express } from 'express'

export const proposalRoutes = (app: Express): Route[] => {

    app.get('/proposal', (req, res) => {
        const policyNo = req.query.policyNo as string
        getProposalDetails({
            policyNo
        }).then((response) => {
            res.status(200).send(JSON.stringify(response))
        }).catch((err) => {
            res.status(500).send(JSON.stringify({ "error": 'Failed to process the message.' }))
        })
    })

    const getProposalDetails = async (payload: { policyNo: string }) => {
        const submitProposal = new SubmitProposal()
        return await submitProposal.getDetails(payload)
    }

    return [
        {
            method: 'get',
            path: '/proposal',
            handle: getProposalDetails,
            operation: "getProposalDetails"
        }
    ] as Route[]

}