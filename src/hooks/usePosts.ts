import {useEffect, useState} from "react";
import {useGlobalContext} from "../context/context";

export const usePosts = (excludeSlug?: string) => {
    const {posts} = useGlobalContext()
    const [postsFiltered, setPostsFiltered] = useState<Queries.WpBlog[]>()
    useEffect(() => {
        if (posts) {
            if (excludeSlug) {
                //console.log(excludeSlug)
                //console.log(posts.find(item => item.slug === excludeSlug))
                setPostsFiltered(posts.filter(item => item.slug !== excludeSlug))
                return
            }
            setPostsFiltered(posts)
        }
    }, [posts]);
    return [ postsFiltered]
}