import {gql} from "@apollo/client";
import {v4} from "uuid";

type sendMailProps = {
    email: string,
    subject: string,
    body: string
}

export const SEND_MAIL =  gql`
        mutation SendMail($subject: String!, $mailTo: String!, $body: String! )  {
            sendEmail(
                input: {
                    to: $mailTo
                    subject: $subject
                    body: $body
                    clientMutationId: "${v4()}"
                }
            ) {
                origin
                sent
                message
            }
        }
    `

