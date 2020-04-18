import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link }  from 'react-router-dom'
const Generos = () =>{
    const [data, setData ] = useState([])
    useEffect(() => {
        axios.get('/api/genres').then(res => {
                setData(res.data.data)
            })
    }, [])
  

const deleteGenero = id => {
    axios
        .delete('/api/genres/' + id)
        .then(res => {
            const filtrado = data.filter(item => item.id !== id)
            setData(filtrado)
        })
}

/*console.log(data);*/

  const renderizaLinha = record => {
      return (
        <tr key={record.id}>
            <th scope='row'>{record.id}</th>
            <td>{record.name}</td>
            <th><button className='btn btn-outline-danger mr-md-3 btn-sm' onClick={() => deleteGenero(record.id)}>Remover</button>
            
            <Link to={'/generos/' + record.id} className='btn btn-outline-warning btn-sm' >Editar</Link></th>
        </tr>
      )
  }

if (data.length === 0) {
    return(
        <div className='container'>
            <h1>Genêros</h1>
            <Link to='/generos/novo'><i class="far fa-plus-square"></i></Link>
            <div className='alert alert-warning' role='alert'>
            Você não possui gêneros criados.
             </div>
        </div>
    )
}


  return (
    (
        <div className='container'>
            <h3>Gêneros</h3>
            <Link to='/novogenero' className='btn btn-outline-primary btn-sm'>Novo gênero</Link>
            <table className='table table-striped table-responsive-sm'>
                <thead className='thead-gray'>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Nome</th>
                        <th scope='col'>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderizaLinha)}
                </tbody>
            </table>

        </div>
       
    )
  )
}


export default Generos