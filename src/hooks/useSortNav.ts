import {useEffect, useState} from "react";
import {MenuItemsNode} from "../types/data";

export const useSortNav = (arg: MenuItemsNode[] | undefined) => {
    const [arr, setArr] = useState<MenuItemsNode[]>([])
    useEffect(() => {
        if(arg) {setArr(arg.sort((a,b) => a.order > b.order ? 1 : -1))}
    }, [arg])
    return [arr]
}
