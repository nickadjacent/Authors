import React, { useState, useContext, useEffect, useRef } from 'react';
import { navigate } from '@reach/router';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import AppContext from '../AppContext';


const NewAuthor = ({ author }) => {
    const nameRef = useRef(null);
    const submitRef = useRef(null);
    const [name, setName] = useState(null);
    const [errors, setErrors] = useState(null);
    const { setContext } = useContext(AppContext);

    const onSubmit = event => {
        event.preventDefault();

        if (author && author !== undefined) {
            if (name !== undefined && name.length >= 5) {
                axios.put(`http://localhost:8000/api/authors/edit/${author._id}`, { name: name })
                    .then(res => navigate('/'))
                    .catch(err => setErrors(err.data));

                setContext(null);
            } else {
                setErrors(`'name' must always be at least 5 characters. :(`);
            }
        } else {
            if (name !== undefined) {
                if (name.length >= 5) {
                    axios.post('http://localhost:8000/api/authors/new', { name: name })
                        .then(res => navigate('/'))
                        .catch(err => setErrors(err.data));

                    setContext(null);
                } else {
                    setErrors(`'name' must always be at least 5 characters. :(`);
                }
            } else {
                setErrors(`'name' must always be at least 5 characters. :(`);
            }
        }
    }

    useEffect(() => {
        if (author && author !== undefined) {
            nameRef.current.value = author.name;
        }
    }, [author]);

    const nameFieldOnChange = event => {
        setName(event.target.value);
        setErrors((event.target.value.length < 1) ? `'name' must always be at least 5 characters. :(` : '');
    }

    return (
        <div>
            <h1>{(author && author !== undefined) ? 'Edit Author' : 'New Author'}</h1>
            <br />
            <Form onSubmit={onSubmit} className="m-5 p-5 bg-dark text-white rounded">
                <Form.Label className="m-2 h3 font-weight-normal">Name</Form.Label>
                <br />
                {errors ? <Form.Label className="text-danger">{errors}</Form.Label> : ''}
                <Form.Control ref={nameRef} onChange={event => nameFieldOnChange(event)} type="text" placeholder="Leslie Jones" className="m-3" />
                <Button variant="secondary" onClick={() => {
                    navigate('/');
                    setContext(null);
                    // eslint-disable-next-line
                }} variant="outline-secondary" className="my-4 mx-1">Cancel</Button>
                <Button ref={submitRef} variant="outline-success" type="submit" className="my-4 mx-1">{(author && author !== undefined) ? 'Update Author' : 'Add Author'}</Button>
            </Form>
        </div>
    );
}

export default NewAuthor;