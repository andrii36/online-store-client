import { useState } from "react"

export const useInput = (value) => {
    const [fieldValue, setFieldValue] = useState(value)
    const onChange = (e) => {
        setFieldValue(e.target.value)
    }

    return {fieldValue,
    onChange}
}