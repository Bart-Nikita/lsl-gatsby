import {useEffect, useState} from "react";

export const useSortNav = (arg: Queries.WpMenuItem[] | undefined | null) => {
    const [arr, setArr] = useState<Queries.WpMenuItem[]>([])
    useEffect(() => {
        if(arg) {setArr(arg.sort((a,b) => a?.order > b?.order ? 1 : -1))}
    }, [arg])
    return [arr]
}
