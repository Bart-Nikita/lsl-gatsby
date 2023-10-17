import { useMutation } from "@apollo/client"
import { SEND_MAIL } from "../gql/mutations/sendMail"
import { useGlobalContext } from "../context/context"

export const useSendMail = () => {

    const [sendMail, { loading }] = useMutation(SEND_MAIL)
    const {  emails } = useGlobalContext()

    const start = (emailBody: string, subject: string, cb: () => void) => {

        
        send(0)

        function send(index: number) {
            if (emails[index]) {
                sendMail({
                    variables: {
                        subject: subject,
                        mailTo: emails[index].email?.trim(),
                        body: emailBody
                    }
                }).then((data) => {
                    if (data?.data?.sendEmail?.sent === true) {
                        // send(index + 1)
                    } 

                    send(index + 1)
                })
            } else {
                cb()
            }
        }
    }
  
    return {
        sendMail: start,
        loading
    }
}