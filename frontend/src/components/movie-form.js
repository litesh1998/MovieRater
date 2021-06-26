import React, { useState, useEffect } from 'react'
import {API} from '../api-service'
import {useCookies} from 'react-cookie'

function MovieForm(props){


    
    const [title, setTitle]= useState('')
    const [desc, setDesc] = useState('')

    const isDisabled = desc.length ===0 || title.length ===0
    useEffect(() => {
        setTitle(props.movie.title);
        setDesc(props.movie.description);
    }, [props.movie])

    const [token] = useCookies(['mr-token']);

    const updateClicked = () => {
        
        API.updateMovie(props.movie, {"title": title, "description": desc},token['mr-token']).then(resp => props.updatedMovie(resp))
    }
    const createClicked = () => {
        
        API.createMovie({"title": title, "description": desc}, token['mr-token']).then(resp => props.newMovieCreated(resp)).catch(error => console.log(error))
    }
    return(
        <React.Fragment>
            { props.movie ?(
                <div>
                <label htmlFor="title">Title</label><br></br>
                <input id="title" type="text" placeholder="title" value={title}
                onChange={evt => setTitle(evt.target.value)} />
                <br></br>
                <label htmlFor="description">Description</label><br></br>
                <textarea id="description" type="Text" placeholder="Description" value={desc}
                onChange={evt => setDesc(evt.target.value)}
                ></textarea><br></br>{
                    props.movie.id ?
                    <button  onClick={updateClicked} disabled={isDisabled}>update</button>:
                    <button  onClick={createClicked} disabled={isDisabled}>Create</button>

                }
               
            </div>
            )
            :null}
        </React.Fragment>
    )
}

export default MovieForm;