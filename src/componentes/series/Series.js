import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link }  from 'react-router-dom'
const Series = () =>{
    const [data, setData ] = useState([])
    useEffect(() => {
        axios.get('/api/series/').then(res => {
                setData(res.data.data)
            })
    }, [])
  

const deleteSerie = id => {
    axios
        .delete('/api/series/' + id)
        .then(res => {
            const filtrado = data.filter(item => item.id !== id)
            setData(filtrado)
        })
}


  const renderizaLinha = record => {
      return (
        <tr key={record.id}>
            <th scope='row'>{record.id}</th>
            <td>{record.name}</td>
            <th><button className='btn btn-outline-danger mr-md-3 btn-sm' onClick={() => deleteSerie(record.id)}>Remover</button>
            
            <Link to={'/series/' + record.id} className='btn btn-outline-warning btn-sm' >Info</Link></th>
        </tr>
      )
    }

    if (data.length === 0) {
        return(
            <div>
                <h3>Séries</h3>
                <Link to='/novaserie' className='btn btn-outline-primary btn-sm'>Nova série</Link>
                
                <div className='alert alert-warning' role='alert'>
                Você não possui séries criadas.
                </div>
            </div>
        )
    }


    return (
        (
            <div className='container'>
                <h3>Séries</h3>
                <Link to='/novaserie' className='btn btn-outline-primary btn-sm'>Nova série</Link>
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


export default Series