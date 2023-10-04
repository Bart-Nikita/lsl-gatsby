import { useState, useEffect } from "react"

export const useStaticFile = (name: string, arr?: Queries.File[]) => {
    const [url, setUrl] = useState<string>()

    useEffect(() => {

            if (arr) {
                //@ts-ignore
                setUrl(arr?.find(item => item.name === name)?.publicURL)
            }
       
        
    }, [arr])
    return [url]
}