import { useMutation } from "@apollo/client"
import { SEND_MAIL } from "../gql/mutations/sendMail"

export const useSendMailArr = () => {
    const [sendMail1, { loading: loading1 }] = useMutation(SEND_MAIL)
    const [sendMail2, { loading: loading2 }] = useMutation(SEND_MAIL)
    const [sendMail3, { loading: loading3 }] = useMutation(SEND_MAIL)
    const [sendMail4, { loading: loading4 }] = useMutation(SEND_MAIL)
    const [sendMail5, { loading: loading5 }] = useMutation(SEND_MAIL)

    return { sendMailArr: [sendMail1, sendMail2, sendMail3, sendMail4, sendMail5], loadings: [loading1, loading2, loading3, loading4, loading5] }
}