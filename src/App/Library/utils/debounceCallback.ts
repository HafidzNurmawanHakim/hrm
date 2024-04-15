import { useEffect, useState } from "react"

export const useDebounceCallback = (input: string, limit?: number, callback = () => {}) => {
    useEffect(() => {
        const initial = setTimeout(() => {
           callback()
        }, limit || 2000)
        return () => clearTimeout(initial)
    }, [input])
}

export const useDebounceInput = (input: string, limit?: number) => {
    const [output, setOutput] = useState('')
    useEffect(() => {
        const initial = setTimeout(() => {
           setOutput(input)
        }, limit || 2000)
        return () => clearTimeout(initial)
    }, [input])
    return output
}


  