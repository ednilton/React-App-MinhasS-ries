import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'
 
const EditarSerie = ({ match }) => {
    const [form, setForm] = useState({
        name: ''
    }) // trocou -> name e setName 
    const [success, setSuccess] = useState(false)
    const [mode, setMode] = useState('INFO')
    const [genres, setGenres] = useState([])
    const [genreId, setGenreId] = useState('')

    const [data, setData] = useState({})
    useEffect(() => {
        axios
        .get('/api/series/' + match.params.id)
        .then(res => {
            setData(res.data)
            setForm(res.data)
        })
    }, [match.params.id])

    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
            setGenres(res.data.data)
            const genres = res.data.data
            const encontrado = genres.find(value => data.genre === value.name)
            if (encontrado){
                setGenreId(encontrado.id)
            }
        })
    },[data])


// custom header
    const masterHeader = {
        height: '50vh',
        minHeight: '400px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const onChangeGenre = evt => {
        setGenreId(evt.target.value);
    }


    const onChange = field => evt => {
       setForm({
          ...form,
          [field]: evt.target.value
       })
    }

    const seleciona = value => () =>{
        setForm({
            ...form,
            status:value
        })
    }


    const save = () => {
        axios
        .put('/api/series/' + match.params.id,{
        ...form,
        genre_id: genreId
        })
        .then(res => {
            setSuccess(true)
        })
    }
    if (success){
        return <Redirect to='/series' />
    }

    return (
        <div>
            <header style={masterHeader}>
            <div  className='h-100 container'>
                <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
                    <div className='row h-100 align-items-center'>
                        <div className='col-3'>
                            <img alt={data.name}  className='img-fluid img-thumbnail' src={data.poster}  />
                        </div>
                        <div className='col-8'>
                            <h1 className='font-weight-light text-white'>{data.name}</h1>
                            <div className='lead text-white'>
                                {data.status === 'ASSISTIDO' && <Badge color='success'>Assitido</Badge>}
                                {data.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para assitir</Badge> }
                                Gênero: {data.genre}
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
            </header>
            <div className='container'>
                <button onClick={() => setMode('EDIT')} className='btn btn-outline-primary btn-sm'>Editar Série</button>
            </div>

            {
                mode === 'EDIT' &&
                <div className='container'>
                    <h3>Info Série</h3>
                    <button onClick={() => setMode('INFO')} className='btn btn-outline-danger btn-sm'>Cancelar edição</button>

                    <form>
                        <div className='form-group'>
                            <label htmlFor='name'>Nome</label>
                            <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' placeholder='Nome da Série' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='name'>Comentários</label>
                            <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='name' placeholder='Adicione um comentário' />
                        </div>

                        <div>
                            <label htmlFor='name'>Gênero</label>
                                <select className='formControl btn btn-outline-primary btn-sm' onChange={onChangeGenre} value={genreId} >
                                   { genres.map(genre => <option key={genre.id} value={genre.id} >{genre.name}</option>) }
                                </select> 
                            <br />

                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='status' id='assistir'  value='ASSISTIDO'  onClick={seleciona('ASSISTIDO')} />
                            <label className='form-check-label' for='assistido'>
                                Assistido
                            </label>
                        </div>

                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='status' id='paraAssistir' value='PARA_ASSISTIR'   onClick={seleciona('PARA_ASSISTIR')} />
                            <label className='form-check-label' for='paraAssistir'>
                                Para Assistir
                            </label>
                        </div>
                            <button type='button' onClick={save} className='btn btn-outline-primary btn-sm'>Salvar</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default EditarSerie