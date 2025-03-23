import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./intro.style";
import LoadingModal from "../component/LoadingModal";
import { WebSocketContext } from "../context/WebSocketContext"; // ✅ 추가

function Intro() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { connected: espConnected } = useContext(WebSocketContext); // ✅ 연결 상태만 사용

  const handleEnter = () => {
    setLoading(true);
  };

  useEffect(() => {
    if (loading && espConnected) {
      navigate("/main");
    }
  }, [espConnected, loading, navigate]);

  return (
    <S.IntroContainer>
      <S.Overlay />
      <S.IntroContent>
        <S.IntroMainTitle>MOVILINK</S.IntroMainTitle>
        <S.IntroSubtitle>Smart Control Hub </S.IntroSubtitle>
        <S.EnterButton onClick={handleEnter} disabled={loading}>
          {loading ? "기기 확인 중..." : "시작하기"}
        </S.EnterButton>
      </S.IntroContent>

      <LoadingModal visible={loading && !espConnected} />
    </S.IntroContainer>
  );
}

export default Intro;
