'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchData, addData, updateData, deleteData } from '../features/dataSlice';
import '../styles.css';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.data);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateData({ id: editingId, title, body }));
      setEditingId(null);
    } else {
      dispatch(addData({ title, body }));
    }
    setTitle('');
    setBody('');
  };

  const handleEdit = (post: { id: number; title: string; body: string }) => {
    setTitle(post.title);
    setBody(post.body);
    setEditingId(post.id);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteData(id));
  };

  return (
    <div className="container">
      <h1>CRUD App with Redux Toolkit</h1>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Post</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <ul className="list">
        {data.map((post) => (
          <li key={post.id} className="list-item">
            <strong>{post.title}</strong> - {post.body}
            <button onClick={() => handleEdit(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id!)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
