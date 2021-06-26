

export class API{
    static updateMovie(mov, body, token){
        return fetch(`http://localhost:8000/api/movies/${mov.id}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
            body: JSON.stringify( body )
          }).then( resp => resp.json())
    }

    static createMovie(body, token){
      return fetch(`http://localhost:8000/api/movies/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
          body: JSON.stringify( body )
        }).then( resp => resp.json())
  }

  static deleteMovie(id, token){
    return fetch(`http://localhost:8000/api/movies/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      })
}

static loginUser(body){
  return fetch(`http://localhost:8000/auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( body )
    }).then( resp => resp.json())
}

static registerUser(body){
  return fetch(`http://localhost:8000/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( body )
    }).then( resp => resp.json())
}

}