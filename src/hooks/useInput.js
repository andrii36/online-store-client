import { useEffect, useState } from "react"

export const useInput = (value) => {
    const [fieldValue, setFieldValue] = useState(value)
    //const validation = useValidation(fieldValue, validations)
    const onChange = (e) => {
        setFieldValue(e.target.value)
    }

    return {fieldValue,
    onChange}
}

const useValidation = (value, validations) => {
    const [isEmpty, setIsEmpty] = useState(true)

    useEffect(() => {
        for (const key in validations) {
            switch(key){
                case 'required': 
                    value ? setIsEmpty(false) : setIsEmpty(true)
                    break
            }
        }
    }, [value])

    return {isEmpty}
}