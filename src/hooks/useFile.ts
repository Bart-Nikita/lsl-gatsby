import { useEffect, useState } from "react"
import { useGlobalContext } from "../context/context"

export const useFile = (name: string) => {
    const { files } = useGlobalContext()

    return [files?.find(item => item.name === name)?.publicURL]
}