import {useEffect, useState} from "react";
import {AllBlogNode, CommonSectionsNode, PagesNode} from "../types/data";
import {useGlobalContext} from "../context/context";

export const usePost = (slug: string) => {
    const [page, setPost] = useState<AllBlogNode>()
    const { data} = useGlobalContext()

    useEffect(() => {
        if (data) {
            const item = data.allBlog?.nodes?.find(el => el.slug === slug)
            item &&  setPost(item)
        }
    } , [data])
    return [page]
}
