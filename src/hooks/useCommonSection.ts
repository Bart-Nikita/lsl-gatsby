import {useEffect, useState} from "react";
import {useGlobalContext} from "../context/context";
import {CommonSectionsNode} from "../types/data";


export const useCommonSection = (slug: string) => {
    const [section, setSection] = useState<CommonSectionsNode>()
    const { data} = useGlobalContext()

    useEffect(() => {
        if (data) {
            const item = data.commonSections?.nodes?.find(el => el.slug === slug)
            item &&  setSection(item)
        }
    } , [data])
    return [section]
}
