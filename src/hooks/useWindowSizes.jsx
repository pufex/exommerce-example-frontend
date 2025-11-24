import { useEffect, useState } from "react"

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({ 
        width: window.outerWidth,
        height: window.outerHeight, 
    })

    useEffect(() => {
        const getWindowSize = (e) => {
            const width = e.target.outerWidth
            const height = e.target.innerWidth
            setWindowSize({width, height})
        }

        window.addEventListener("resize", getWindowSize)

        return () => window.removeEventListener("resize", getWindowSize)
    }, [])

    return windowSize
}