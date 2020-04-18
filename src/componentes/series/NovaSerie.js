import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'


const NovaSerie = ({match}) => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)

    const [data, setData] = useState({})
    useEffect(() => {
        axios
        .get('/api/series' + match.params.id)
        .then(res => {
            setData(res.data)
        })
    }, [match.params.id])

    const onChange = evt => {
        setName(evt.target.value);
    }

    const save = () => {
        axios.post('/api/series', {
            name: name
        })
        .then(res => {
            setSuccess(true)
        })
    }
    if (success){
        return <Redirect to='series' />
    }

    return (
        <div className='container'>
            <h3>Nova Série</h3>
            <form>
            <pre>{JSON.stringify(data)}</pre>
            <div className='form-group'>
                <label htmlFor='name'>Nome</label>
                <input type='text' value={name} onChange={onChange} className='form-control' id='name' placeholder='Nome da Série' />
            </div>
            <button type='button' onClick={save} className='btn btn-outline-primary btn-sm'>Adicionar</button>
            </form>            
        </div>
    )
}

export default NovaSerie