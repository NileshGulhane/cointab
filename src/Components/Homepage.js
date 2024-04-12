import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


function Homepage() {
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(usersData => {
                setUsers(usersData);
            })
            .catch(error => console.error('Error fetching users:', error));
    };

    const [userAdded, setUserAdded] = useState(false);

    const addToDatabase = () => {
        if (!userAdded) {
            setUserAdded(true);
        }
    };

    return (
        <div className="App">
            <h3 className='Headline'>Cointab SE-ASSIGNMENT</h3>
            <div className="vertical-center" style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                <div>
                    <Button onClick={fetchUsers} variant="primary">All Users</Button>
                </div>
                <div style={{ marginLeft: '20px' }}>
                    {!userAdded && (
                        <Button onClick={addToDatabase} variant="info">Add</Button>
                    )}
                    {userAdded && (
                        <Link to="/Postpage">
                            <Button variant="success">Open</Button>
                        </Link>
                    )}
                </div>
            </div>

            <div class="table-container">
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Website</th>
                            <th>City</th>
                            <th>Company</th>
                        </tr>
                    </thead>
                    <tbody>

                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.website}</td>
                                <td>{user.address.city}</td>
                                <td>{user.company.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Homepage;
