import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { Spinner, Modal, Button } from 'react-bootstrap';

const UsersComponent = () => {
    const initialState = {
        loading: false,
        error: null,
        users: null,
        viewUser: null
    };

    const [state, setState] = useState(initialState);

    const USERS = gql`
        {
            getAllUsers {
                _id
                username
                email
                type
            }
        }
    `;

    const { loading, error, data } = useQuery(USERS);
    console.log(loading, error, data);

    const [viewUser, setViewUser] = useState(false);

    const handleShow = (user) => {
        if (state.viewUser && state.viewUser._id === user._id) {
            setViewUser(true);
        } else {
            setState({ ...state, viewUser: user });
            setViewUser(true);
        }
    };

    const handleClose = () => {
        setViewUser(false);
    };

    useEffect(() => {
        setState({
            ...state,
            loading,
            error,
            users: data && data.getAllUsers
        });
    }, [data]);

    return (
        <div>
            <div className='container-fluid'>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Users</h3>
                    {/* <button onClick={handleShow} className='btn btn-primary'>
                        Add Category
                    </button> */}
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
                                            <th scope='col'>username</th>
                                            <th scope='col'>email</th>
                                            <th scope='col'>type</th>
                                            <th scope='col'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.users && state.users.length != 0 ? (
                                            state.users.map((user, index) => {
                                                return (
                                                    <tr key={user._id}>
                                                        <th scope='row'>{user.username}</th>
                                                        <th scope='row'>{user.email}</th>
                                                        <th scope='row'>{user.type}</th>

                                                        <td>
                                                            <button
                                                                onClick={() => handleShow(user)}
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
                                                                Suspend
                                                            </button>
                                                        </td>
                                                        <UserViewModal
                                                            user={state.viewUser}
                                                            handleClose={handleClose}
                                                            viewUser={viewUser}
                                                        />
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
        </div>
    );
};

export default UsersComponent;

const UserViewModal = ({ handleClose, viewUser, user, item }) => {
    if (user) {
        return (
            <Modal show={viewUser} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{user.username}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>User ID: {user._id}</li>
                        <li>Username: {user.username}</li>
                        <li>User Type: {user.type}</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    return (
        <Modal show={viewUser} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>User not found</Modal.Title>
            </Modal.Header>

            <Modal.Footer>
                <Button onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};
