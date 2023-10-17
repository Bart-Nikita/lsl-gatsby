import {gql} from "@apollo/client";
import {v4} from "uuid";

type sendMailProps = {
    email: string,
    subject: string,
    body: string
}

export const SEND_MAIL =  gql`
        mutation SendMail($subject: String!, $mailTo: String, $body: String! )  {
            sendEmail(
                input: {
                    subject: $subject
                    body: $body
                    to: $mailTo
                    clientMutationId: "${v4()}"
                }
            ) {
                origin
                sent
                message
            }
        }
    `

