import { useNavigate, useLocation } from "react-router-dom";
import { FaLock, FaArrowLeft } from "react-icons/fa";

export default function Unauthorized() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const expired = params.get("expired") === "1";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          background: "white",
          padding: 32,
          borderRadius: 12,
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
          textAlign: "center",
          maxWidth: 400,
        }}
      >
        <FaLock size={40} style={{ color: "#ef4444", marginBottom: 16 }} />
        <h2 style={{ margin: "0 0 12px", color: "#1e293b", fontSize: 24 }}>
          Access Denied
        </h2>
        <p style={{ margin: "0 0 24px", color: "#64748b", fontSize: 16 }}>
          You don't have permission to access this page. Please contact your
          administrator if you think this is a mistake.
        </p>
        <button
          onClick={() => {
            if (expired) {
              // navigate to home and open login modal (guards expect this state)
              navigate("/", {
                replace: true,
                state: { forceLoginModal: true },
              });
              return;
            }
            navigate(-1);
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#018994",
            color: "white",
            border: 0,
            padding: "10px 16px",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          <FaArrowLeft /> {expired ? "Sign in" : "Go Back"}
        </button>
      </div>
    </div>
  );
}
