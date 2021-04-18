import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import { useQuery, gql, useMutation } from '@apollo/client';

const SERVICES = gql`
    query getAllServices {
        services {
            _id
            title
            category {
                _id
                name
            }
            description
            price
            date
            creator {
                username
                email
            }
        }
    }
`;

// const ADD_CATEGORY = gql`
//     mutation AddCategory($name: String!) {
//         createCategory(categoryInput: { name: $name }) {
//             _id
//             name
//         }
//     }
// `;

// const DELETE_CATEGORY = gql`
//     mutation DeleteCategory($id: ID!) {
//         deleteCategory(categoryId: $id) {
//             _id
//         }
//     }
// `;

const ServicesComponent = () => {
    const initialState = {
        loading: false,
        error: null,
        services: null
    };

    const [state, setState] = useState(initialState);

    const { loading, error, data } = useQuery(SERVICES);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        setState({
            loading,
            error,
            services: data && data.services
        });
    }, [data]);

    // const [addService] = useMutation(ADD_CATEGORY);

    const onSubmit = (fieldData) => {
        console.log(fieldData);
        // try {
        //     addCategory({ variables: { name: fieldData.category } })
        //         .then((data) => {
        //             setState({
        //                 services: [...state.services, { ...data.data.createCategory }]
        //             });
        //             setShow(false);
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         });
        // } catch (err) {
        //     console.log(err);
        // }
    };

    // const [deleteCategory] = useMutation(DELETE_CATEGORY);

    // const deleteItemCategory = (id, index) => {
    //     const services = Object.assign([], state.services);
    //     deleteCategory({ variables: { id: id } })
    //         .then((data) => {
    //             services.splice(index, 1);
    //             setState({
    //                 ...state,
    //                 services
    //             });
    //         })
    //         .catch((err) => console.log(err));
    // };
    return (
        <div>
            <div className='container-fluid'>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Services</h3>
                    <button onClick={handleShow} className='btn btn-primary'>
                        Add Service
                    </button>
                </div>
            </div>
            {!state.loading ? (
                <div>
                    <div className='container-fluid pt-4'>
                        <div className='row'>
                            <div className='col-12'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Title</th>
                                            <th scope='col'>Category</th>
                                            <th scope='col'>Price</th>
                                            <th scope='col'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.services && state.services.length != 0 ? (
                                            state.services.map((service, index) => {
                                                return (
                                                    <tr key={service._id}>
                                                        <td scope='row'>{service.title}</td>
                                                        <td scope='row'>{service.category.name}</td>
                                                        <td scope='row'>Rs.{service.price}</td>

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
                                                                // onClick={() =>
                                                                //     deleteItemCategory(
                                                                //         category._id,
                                                                //         index
                                                                //     )
                                                                // }
                                                                type='button'
                                                                className='btn btn-danger mr-3'
                                                            >
                                                                <i className='far fa-trash-alt'></i>
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td>No Data</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
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
                    <Modal.Title>Add Service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId='exampleForm.ControlSelect1'>
                            <Form.Label> Add Category </Form.Label>
                            <Form.Control {...register('category', { required: true })} />
                        </Form.Group>

                        <Button variant='primary' type='submit'>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ServicesComponent;
