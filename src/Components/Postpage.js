import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Button from 'react-bootstrap/Button';

const UserPosts = () => {
  const [userId, setUserId] = useState(1);
  const [userPosts, setUserPosts] = useState([]);
  const [userData, setUserData] = useState({});
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
      setUserData(userResponse.data);
      const postsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      setUserPosts(postsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(userPosts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Posts');
    XLSX.writeFile(workbook, `user_${userId}_posts.xlsx`);
  };

  const handleBulkAddClick = () => {
    setShowDownloadButton(true);
  };

  return (
    <div>
      <div style={{ display: "flex", marginBottom: '10px' }}>
        <h4 style={{ marginRight: '20px' }}>{`User ${userId} Data`}</h4>
        <Button onClick={() => setUserId(1)} variant="outline-primary" style={{ marginRight: '20px' }}>User 1</Button>
        <Button onClick={() => setUserId(2)} variant="outline-danger" style={{ marginRight: '20px' }}>User 2</Button>
      </div>
      <div style={{ display: "flex", marginBottom: '10px' }}>
        <Button variant="primary" style={{ marginRight: '20px' }} onClick={handleBulkAddClick}>Bulk Add</Button>
        {showDownloadButton && <Button onClick={downloadExcel} variant="success">Download in Excel</Button>}
      </div>
      <div>
        <table className="user-posts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {userPosts.map(post => (
              <tr key={post.id}>
                <td>{userData.name}</td>
                <td>{userData.company && userData.company.name}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserPosts;
