import React, { useState, useContext, useEffect } from 'react'
import { navigate } from '@reach/router';
import axios from 'axios';
import AppContext from '../AppContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table } from 'react-bootstrap';


const Authors = () => {
    const { setContext } = useContext(AppContext);
    const [authors, setAuthors] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/authors')
            .then(results => setAuthors(results.data.sort((author1, author2) => author1.name.localeCompare(author2.name))))
            .catch(errors => console.log(errors));
    });

    const onDelete = (event, id) => {
        axios.delete(`http://localhost:8000/api/authors/${id}`)
            .then(results => console.log(results))
            .catch(errors => console.log(errors));
    }


    const editOnClick = (event, author) => {
        setContext(author);
        navigate('/new');
    }

    return (
        <div>
            <h1>Favorite Authors</h1>
            <Button onClick={() => navigate('/new')} variant="outline-primary" className="mt-2 mb-5">Add Author</Button>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr><th>Author</th><th>Actions</th></tr>
                </thead>
                <tbody>
                    {authors ? authors.map((author, index) => (
                        <tr key={index}>
                            <td className="align-middle m-0">{author.name}</td>
                            <td className="m-0">
                                <Button onClick={event => editOnClick(event, author)} variant="outline-warning" className="m-0 mx-1">Edit</Button>
                                <Button onClick={event => onDelete(event, author._id)} variant="outline-danger" className="m-0 mx-1">Delete</Button>
                            </td>
                        </tr>
                    )) : ''}
                </tbody>
            </Table>
        </div>
    );
}

export default Authors;