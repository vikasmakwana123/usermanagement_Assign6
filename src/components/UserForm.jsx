import React, { useState } from "react";

export default function UserForm({ form, setForm, isEditing, onSubmit, onCancel }) {
  const [formError, setFormError] = useState("");

  function validateForm() {
    if (!form.name.trim() || !form.email.trim() || !form.username.trim()) {
      setFormError("All fields are required.");
      return false;
    }

    setFormError("");
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(form);
  }

  return (
    <div
      style={{
        backgroundColor: "#1c1c1c",
        color: "white",
        border: "1px solid #424242ff",
        padding: 20,
        borderRadius: 8,
        marginBottom: 20,
      }}
    >
      <h2 style={{marginBottom:'20px'}}>{isEditing ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <div>
          <label style={{ display: "block", marginBottom: 4 }}>Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Full name"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: 4 }}>Email</label>
          <input
            value={form.email}
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="name@example.com"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: 4 }}>Username</label>
          <input
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="username"
            style={inputStyle}
          />
        </div>
        {formError && <div style={{ color: "red" }}>{formError}</div>}
        <div style={{ display: "flex", gap: 10 }}>
          <button type="submit" style={submitBtn}>
            {isEditing ? "Update" : "Add"}
          </button>
          {isEditing && (
            <button type="button" onClick={onCancel} style={cancelBtn}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "80%",
  height:'40px',
  padding: "8px 10px",
  borderRadius: "4px",
  border: "1px solid gray",
  backgroundColor: "#2c2c2c",
  color: "white",
};

const submitBtn = {
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "4px",
  cursor: "pointer",
};

const cancelBtn = {
  backgroundColor: "#6c757d",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "4px",
  cursor: "pointer",
};
