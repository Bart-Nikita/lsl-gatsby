import {useEffect, useState} from "react";

export const useResize = () => {

    const [width, setWidth] = useState(0)
    useEffect(() => {
        window.addEventListener('resize' ,() => {
            setWidth(window.innerWidth)
        })
    }, []);

    return [width]
}