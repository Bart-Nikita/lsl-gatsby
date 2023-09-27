import {useEffect, useState} from "react";
import {useGlobalContext} from "../context/context";


export const useCommonSection = (slug: string) => {
    const [section, setSection] = useState<Queries.WpCommonSection>()
    const { commonSections} = useGlobalContext()

    useEffect(() => {
        if (commonSections) {
            const item = commonSections.find(el => el.slug === slug)
            item &&  setSection(item)
        }
    } , [commonSections])
    return [section]
}
