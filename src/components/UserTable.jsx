import React from "react";

const UserTable = ({ users, loading, error, onEdit, onDelete }) => {
  if (loading) return <div style={{ color: "white", fontSize: "20px" }}>Loading users...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <table
      style={{
        width: "100%",
        marginTop: 20,
        borderCollapse: "collapse",
        backgroundColor: "#1e1e1e",
        color: "white",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <thead style={{ backgroundColor: "#333" }}>
        <tr>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>Email</th>
          <th style={thStyle}>Username</th>
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((u) => (
            <tr key={u.id} style={rowStyle}>
              <td style={tdStyle}>{u.name}</td>
              <td style={tdStyle}>{u.email}</td>
              <td style={tdStyle}>{u.username}</td>
              <td style={tdStyle}>
                <button style={editBtn} onClick={() => onEdit(u)}>
                  Edit
                </button>
                <button style={deleteBtn} onClick={() => onDelete(u.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{ ...tdStyle, textAlign: "center" }}>
              No users available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

// Styles
const thStyle = {
  padding: "12px",
  textAlign: "left",
  border: "1px solid #444",
  backgroundColor: "#2a2a2a",
};

const tdStyle = {
  padding: "12px",
  border: "1px solid #444",
};

const rowStyle = {
  backgroundColor: "#1e1e1e",
};

const editBtn = {
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: "8px",
};

const deleteBtn = {
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer",
};

export default UserTable;
