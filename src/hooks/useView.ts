import {useEffect, useState} from "react";

export const useView = () => {
    const [isTopInView, setIsTopInView] = useState(false)
    const [isBottomInView, setIsBottomInView] = useState(false)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        setIsInView(!!isBottomInView || !!isTopInView)

    }, [isBottomInView, isTopInView]);

    return {setIsTopInView, setIsBottomInView, isInView}

}