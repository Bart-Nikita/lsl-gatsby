import {useEffect, useState} from "react";
import {sortDate} from "./useSortDate";
import {useGlobalContext} from "../context/context";

export const useTrainings = () => {
    const {trainings} = useGlobalContext()
    return [trainings]
}