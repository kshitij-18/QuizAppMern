import {useState}  from 'react'

const useForm = () => {
    const [state, setState] = useState({})

    const handleChange = e => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const onSubmit = () => {
        setState({})
    }

    return [state, handleChange, onSubmit]
}

export default useForm