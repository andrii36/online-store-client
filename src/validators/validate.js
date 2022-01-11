export const required = (value) => {
    if(value.length === 0){
        return 'Field is required'
    }
}