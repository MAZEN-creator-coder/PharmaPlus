import React from "react";

export default function ProductsLoginRequired({ onOpenLogin }) {
  return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h2 style={{ fontSize: 28, marginBottom: 16 }}>You need to login to view products</h2>
      <button
        style={{ padding: "12px 32px", fontSize: 18, background: "#018994", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}
        onClick={onOpenLogin}
      >
        Login
      </button>
    </div>
  );
}
