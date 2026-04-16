import { WorkFlow } from "bluemountain-platfrom";
import { platform } from "../platform";

class SubmitProposal {
    #proposalDetails: Map<string, any>

    constructor() {
        this.#proposalDetails = new Map()
        this.#proposalDetails.set('C123456789', {
            policyNo: 'C123456789',
            createdAt: Date.now(),
        })
    }
    @WorkFlow()
    async submit(payload: any) {
        console.log("Submit ", payload);
        const {
            state, request, wfId
        } = payload
        const {
            proposalNo,
            proposalDetails,
            status
        } = request
        if (status === 'SUBMIT') {
            this.#proposalDetails.set(proposalNo, proposalDetails)
            await platform.forward(
                {
                    operation: "onProposalSubmitted",
                    mode: "KAFKA",
                    payload: {
                        proposalNo,
                        proposalDetails,
                        proposalStatus: "Initial Submission.",
                        submissionStatus: "Pending for approval",
                        wfId,
                    },
                    source: "serviceA",
                    target: "serviceB",
                    additionalInfo: {},
                    user: {},
                    correlationId: ''
                }
            )
            return {
                response: { message: "Success" },
                state: {
                    ...state,
                    proposalNo,
                    proposalDetails,
                    proposalStatus: "Initial Submission.",
                    submissionStatus: "Pending for approval"
                },
                status: "IN_PROGRESS"
            }
        } else if (status === 'APPROVED') {
            return {
                response: { message: "Success" },
                state: {
                    ...state,
                    proposalNo,
                    proposalDetails,
                    proposalStatus: "Approved.",
                    submissionStatus: "Approved, Moved to Next STEP."
                },
                status: "COMPLETED"
            }
        } else {
            throw new Error('Unknown status')
        }
    }

    async getDetails(
        payload: { policyNo: string }
    ) {
        const {
            policyNo
        } = payload
        if (this.#proposalDetails.has(policyNo))
            return this.#proposalDetails.get(policyNo)
        throw new Error('Proposal details not present.')
    }
}



export default SubmitProposal
