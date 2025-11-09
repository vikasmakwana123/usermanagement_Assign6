import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";

const App = () => {
  const API_BASE = "https://jsonplaceholder.typicode.com/users";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", username: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(API_BASE);
      setUsers(res.data);
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(formData) {
    try {
      if (isEditing && editingId != null) {
        const res = await axios.put(`${API_BASE}/${editingId}`, formData);
        setUsers((prev) =>
          prev.map((u) => (u.id === editingId ? res.data : u))
        );
        resetForm();
      } else {
        const res = await axios.post(API_BASE, formData);
        setUsers((prev) => [res.data, ...prev]);
        resetForm();
      }
    } catch (err) {
      setError("Failed to submit. Please try again.");
    }
  }

  function handleEdit(user) {
    setIsEditing(true);
    setEditingId(user.id);
    setForm({
      name: user.name || "",
      email: user.email || "",
      username: user.username || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    const ok = window.confirm("Are you sure you want to delete this user?");
    if (!ok) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setError("Failed to delete user. Please try again.");
    }
  }

  function resetForm() {
    setForm({ name: "", email: "", username: "" });
    setIsEditing(false);
    setEditingId(null);
  }

  return (
    <div style={{sisplay:'flex',flexDirection:'column',alignItems:'center',padding:'20px',minHeight:'100vh',boxSizing:'border-box'}}>
      <h1 style={{color:'whitesmoke',marginBottom:'30px',marginTop:'10px',marginLeft:'1vw'}}>User Management Dashboard</h1>
      <UserForm
        form={form}
        setForm={setForm}
        isEditing={isEditing}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />
      <UserTable
        users={users}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
