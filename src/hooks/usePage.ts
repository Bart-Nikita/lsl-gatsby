import {useEffect, useState} from "react";
import {CommonSectionsNode, PagesNode} from "../types/data";
import {useGlobalContext} from "../context/context";

export const usePage = (slug: string) => {
    const [page, setPage] = useState<PagesNode>()
    const { data} = useGlobalContext()

    useEffect(() => {
        if (data) {
            const item = data.pages?.nodes?.find(el => el.slug === slug)
            item &&  setPage(item)
        }
    } , [data])
    return [page]
}
