import {useEffect, useState} from "react";
import {useGlobalContext} from "../context/context";


export const useCommonSection = (slug: string) => {
    const { commonSections} = useGlobalContext()
    return [commonSections?.find(el => el.slug === slug)]
}
