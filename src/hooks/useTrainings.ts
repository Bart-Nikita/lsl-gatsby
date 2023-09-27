import {useEffect, useState} from "react";
import {TrainingsNode} from "../types/data";
import {sortDate} from "./useSortDate";
import {useGlobalContext} from "../context/context";

export const useTrainings = () => {
    const [trainings, setTrainings] = useState<TrainingsNode[]>()
    const {data} = useGlobalContext()

    useEffect(() => {
        if (data) {
            setTrainings(data?.trainings?.nodes.sort((a,b) => Number(a.date) - Number(b.date)))
        }
    }, [data])
    return [trainings]
}