import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkEspStatus } from "../api/esp";

function ProtectedRoute({ children }) {
  const [isAllowed, setIsAllowed] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function verify() {
      const connected = await checkEspStatus();
      if (!connected) {
        navigate("/"); // 연결 안 됨 → 인트로로 리디렉트
      } else {
        setIsAllowed(true);
      }
    }
    verify();
  }, [navigate]);

  if (isAllowed === null) {
    return <div style={{ color: "white", padding: "2rem" }}>접속 상태 확인 중...</div>;
  }

  return children;
}

export default ProtectedRoute;
