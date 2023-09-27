import React, { ReactElement, ReactNode } from 'react'
import { globalState, GlobalContext } from '../../context/context'

type GlobalContextLayProps = {
    children: ReactNode | ReactElement
}

export function GlobalContextLay({ children }: GlobalContextLayProps) {
    const state = globalState()

    return (
        <GlobalContext.Provider value={state}>
            {children}
        </GlobalContext.Provider>
    )
}


