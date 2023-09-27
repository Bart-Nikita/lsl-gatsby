import {useEffect, useState} from "react";
import {AllBlogNode} from "../types/data";
import {useGlobalContext} from "../context/context";

export const usePosts = (excludeSlug?: string) => {
    const {data} = useGlobalContext()
    const [posts, setPosts] = useState<AllBlogNode[]>()
    useEffect(() => {
        if (data) {
            if (excludeSlug) {
                setPosts(data.allBlog.nodes.filter(item => item.slug !== excludeSlug))
                return
            }
            setPosts(data.allBlog.nodes)

        }
    }, [data]);
    return [ posts]
}