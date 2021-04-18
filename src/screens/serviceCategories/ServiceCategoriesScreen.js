import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import { useQuery, gql, useMutation } from '@apollo/client';

const CATEGORIES = gql`
    query getAllCategories {
        categories {
            _id
            name
        }
    }
`;

const ADD_CATEGORY = gql`
    mutation AddCategory($name: String!) {
        createCategory(categoryInput: { name: $name }) {
            _id
            name
        }
    }
`;

const DELETE_CATEGORY = gql`
    mutation DeleteCategory($id: ID!) {
        deleteCategory(categoryId: $id) {
            _id
        }
    }
`;

const ServiceCategoriesComponent = () => {
    const initialState = {
        loading: false,
        error: null,
        categories: null
    };

    const [state, setState] = useState(initialState);

    const { loading, error, data } = useQuery(CATEGORIES);

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
            categories: data && data.categories
        });
    }, [data]);

    const [addCategory] = useMutation(ADD_CATEGORY);

    const onSubmit = (fieldData) => {
        try {
            addCategory({ variables: { name: fieldData.category } })
                .then((data) => {
                    setState({
                        categories: [...state.categories, { ...data.data.createCategory }]
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

    const [deleteCategory] = useMutation(DELETE_CATEGORY);

    const deleteItemCategory = (id, index) => {
        const categories = Object.assign([], state.categories);
        deleteCategory({ variables: { id: id } })
            .then((data) => {
                categories.splice(index, 1);
                setState({
                    ...state,
                    categories
                });
            })
            .catch((err) => console.log(err));
    };
    return (
        <div>
            <div className='container-fluid'>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Service Categories</h3>
                    <button onClick={handleShow} className='btn btn-primary'>
                        Add Category
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
                                            <th scope='col'>Category</th>
                                            <th scope='col'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.categories && state.categories.length != 0 ? (
                                            state.categories.map((category, index) => {
                                                return (
                                                    <tr key={category._id}>
                                                        <th scope='row'>{category.name}</th>

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
                                                                    deleteItemCategory(
                                                                        category._id,
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
                    <Modal.Title>Add Location</Modal.Title>
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

export default ServiceCategoriesComponent;
