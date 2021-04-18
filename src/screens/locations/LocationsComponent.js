import React, { useEffect, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import cities from '../../data/cities/cities.json';

const LOCATIONS = gql`
    query getAllLocations {
        locations {
            _id
            name
        }
    }
`;

const ADD_LOCATION = gql`
    mutation addLocation($name: String!) {
        createLocation(locationInput: { name: $name }) {
            _id
            name
        }
    }
`;

const DELETE_LOCATION = gql`
    mutation DeleteLocation($id: ID!) {
        deleteLocation(locationId: $id) {
            _id
        }
    }
`;

const LocationsComponent = () => {
    const initialState = {
        loading: false,
        error: null,
        locations: null
    };

    const [state, setState] = useState(initialState);
    const { loading, error, data } = useQuery(LOCATIONS);

    const [addLocation] = useMutation(ADD_LOCATION);
    const [deleteLocation, { deleted_data }] = useMutation(DELETE_LOCATION);

    useEffect(() => {
        setState({
            loading,
            error,
            locations: data && data.locations
        });
    }, [data]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const onSubmit = (fieldData) => {
        try {
            addLocation({ variables: { name: fieldData.location } })
                .then((data) => {
                    console.log(data);
                    setState({
                        locations: [...state.locations, { ...data.data.createLocation }]
                    });
                    setShow(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    };
    const deleteItemLocation = (id, index) => {
        const locations = Object.assign([], state.locations);
        deleteLocation({ variables: { id: id } })
            .then((data) => {
                locations.splice(index, 1);
                setState({
                    ...state,
                    locations
                });
            })
            .catch((err) => console.log(err));
    };
    return (
        <div>
            <div className='container-fluid'>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Locations</h3>
                    <button onClick={handleShow} className='btn btn-primary'>
                        Add Location
                    </button>
                </div>
            </div>
            <div>
                {state.locations ? (
                    <div className='container-fluid pt-4'>
                        <div className='row'>
                            <div className='col-12'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Location</th>
                                            <th scope='col'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.locations.map((location, index) => {
                                            return (
                                                <tr key={location._id}>
                                                    <th scope='row'>{location.name}</th>

                                                    <td>
                                                        <button
                                                            type='button'
                                                            className='btn btn-primary mr-3'
                                                        >
                                                            <i className='far fa-eye'></i>
                                                            View
                                                        </button>
                                                        <button
                                                            type='button'
                                                            className='btn btn-success mr-3'
                                                        >
                                                            <i className='fas fa-edit'></i>
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                deleteItemLocation(
                                                                    location._id,
                                                                    index
                                                                )
                                                            }
                                                            type='button'
                                                            className='btn btn-danger mr-3'
                                                        >
                                                            <i className='far fa-trash-alt'></i>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='container-fluid'>
                        <div className='my-5 text-center'>
                            <Spinner animation='grow' variant='primary' />
                        </div>
                    </div>
                )}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Location</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group controlId='exampleForm.ControlSelect1'>
                                <Form.Label> Select City</Form.Label>
                                <Form.Control
                                    {...register('location', { required: true })}
                                    as='select'
                                >
                                    {cities.map((city) => (
                                        <option key={city.city} value={city.city}>
                                            {city.city}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Button variant='primary' type='submit'>
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                {/* {!state.loading ? (
                    <div className='container-fluid pt-4'>
                        <div className='row'>
                            <div className='col-12'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Location</th>
                                            <th scope='col'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.locations.map((location) => {
                                            return (
                                                <tr>
                                                    <th scope='row'>{location.name}</th>

                                                    <td>
                                                        <button
                                                            type='button'
                                                            className='btn btn-primary mr-3'
                                                        >
                                                            <i className='far fa-eye'></i>
                                                            View
                                                        </button>
                                                        <button
                                                            type='button'
                                                            className='btn btn-success mr-3'
                                                        >
                                                            <i className='fas fa-edit'></i>
                                                            Edit
                                                        </button>
                                                        <button
                                                            type='button'
                                                            className='btn btn-danger mr-3'
                                                        >
                                                            <i className='far fa-trash-alt'></i>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <span>loading</span>
                )} */}
            </div>
        </div>
    );
};

export default LocationsComponent;
