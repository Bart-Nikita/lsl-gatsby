import {useGlobalContext} from "../context/context";
import {useQuery} from "@apollo/client";
import {DATA} from "../gql/queries/getData";
import {useEffect} from "react";

export const useWholeData = () => {
    const {
        setData,
        setIsLoading
    } = useGlobalContext()

    const {data} = useQuery(DATA, {fetchPolicy: 'no-cache'})
    useEffect(() => {
        if (data) {
            setData(data)
            setIsLoading(false)
        }
    },[data])
}
