import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useState} from "react";

export type useInputStateType = {
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    error: string | undefined | null
    setError: Dispatch<SetStateAction<string | undefined | null>>
}

export const useInputState = (): useInputStateType => {

    const [value, setValue] = useState<string>()
    const [error, setError] = useState<string>()


    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value.trim())
    }

    return {
        value: value || '',
        onChange,
        error,
        setError
    }
}