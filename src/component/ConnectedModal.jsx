import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(17, 17, 17, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  background: #222;
  color: white;
  padding: 30px 40px;
  border-radius: 12px;
  border: 1px solid white;
  text-align: center;
  font-family: 'Pretendard', sans-serif;
`;

function ConnectionModal({ visible }) {
  if (!visible) return null;

  return (
    <ModalBackground>
      <ModalBox>
        <h2>⚠️ 차량과 연결이 끊어졌습니다</h2>
        <p>기기를 다시 확인해주세요.</p>
      </ModalBox>
    </ModalBackground>
  );
}

export default ConnectionModal;
