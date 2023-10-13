import { useState } from "react"

export const useMock = () => {
    const [isMockVisible, setIsMOckVisible] = useState(false)

    const goMock = () => {
        setIsMOckVisible(true)
        setTimeout(() => {setIsMOckVisible(false)}, 5000)
    }

    return {goMock, isMockVisible }
}