import {useState}  from 'react'

const useForm = () => {
    const [state, setState] = useState({})

    const handleChange = e => {
        if(e.target.name !== "profilePicture"){
            setState({...state, [e.target.name]: e.target.value })
        } else {
            setState({...state, [e.target.name]: e.target.files[0]})
        }
        console.log(state)
    }

    const onSubmit = () => {
        setState({})
    }

    return [state, handleChange, onSubmit]
}

export default useForm