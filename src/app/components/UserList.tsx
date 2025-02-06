'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchUsers, addUser, deleteUser } from '../features/userSlice';
import '../styles.css';

export default function UserList() {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleAddUser = () => {
        const newUser = { name: 'John Doe', email: 'john@example.com' };
        dispatch(addUser(newUser));
    };

    const handleDeleteUser = (id: number) => {
        dispatch(deleteUser(id));
    };

    return (
        <div className="user-container">
            <h2>Users</h2>
            <button onClick={handleAddUser}>Add User</button>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <ul className="list">
                {users.map((user) => (
                    <li key={user.id} className="list-item">
                        {user.name} - {user.email}
                        <button onClick={() => handleDeleteUser(user.id!)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
