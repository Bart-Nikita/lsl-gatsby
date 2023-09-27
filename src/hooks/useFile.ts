import { useEffect, useState } from "react"
import { useGlobalContext } from "../context/context"

export const useFile = (name: string) => {
    const [url, setUrl] = useState<string>()
    const { files } = useGlobalContext()

    useEffect(() => {
        if (files) {
            //@ts-ignore
            setUrl(files?.find(item => item.name === name)?.publicURL)
        }
    }, [files])
    return [url]
}