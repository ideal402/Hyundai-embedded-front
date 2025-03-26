import React from 'react'
import * as S from "./CardStatus.style"
import Button from './Button'; 

const CarStatus = ({status, isAnomaly2}) => {
  return (
    <>
    <S.DviceContainer>
        <S.DeviceTitle>Welcome</S.DeviceTitle>
        <S.AnimationContainer>
          <img src="/assets/gauge.gif" alt='계기판 에니메이션'/>
        </S.AnimationContainer>
        <S.DeviceSpecs>
          {status ? (
            <S.StatusGrid>
              <S.StatusItem>
                <S.StatusLabel> 문</S.StatusLabel>
                <S.StatusValue isOn={status.isCarDoorOpen}>
                  {status.isCarDoorOpen ? "열림" : "닫힘"}
                </S.StatusValue>
              </S.StatusItem>

              <S.StatusItem>
                <S.StatusLabel> 선루프</S.StatusLabel>
                <S.StatusValue isOn={status.isSunroofOpen}>
                  {status.isSunroofOpen ? "열림" : "닫힘"}
                </S.StatusValue>
              </S.StatusItem>

              <S.StatusItem>
                <S.StatusLabel> 상태</S.StatusLabel>
                <S.StatusValue isOn={isAnomaly2}>
                  {isAnomaly2 ? "정상" : "이상"}
                </S.StatusValue>
              </S.StatusItem>

              <S.StatusItem>
                <S.StatusLabel> 에어컨</S.StatusLabel>
                <S.StatusValue isOn={status.isACActive}>
                  {status.isACActive ? "켜짐" : "꺼짐"}
                </S.StatusValue>
              </S.StatusItem>
            </S.StatusGrid>
          ) : (
            <S.StatusLoading>차량 상태를 불러오는 중...</S.StatusLoading>
          )}
        </S.DeviceSpecs>
    </S.DviceContainer>
    <S.ButtonContainer>
      {status ? (
        <>
        <S.ButtonRowTop>
          <Button fontsize = "2rem" command="toggle_drive" label={status.isDriving ? "정지":"출발"} />
        </S.ButtonRowTop>
        <S.ButtonRowBottom>
          <Button command="toggle_door" label={status.isCarDoorOpen ? "문닫기" : "문열기"} />
          <Button command="toggle_sunroof" label={status.isSunroofOpen ? "선루프 닫기":"선루프 열기" }/>
          <Button command="toggle_ac" label={status.isACActive ? "에어컨 끄기":"에어컨 켜기"} />
        </S.ButtonRowBottom>
        </>
      ) : null}
    </S.ButtonContainer>
    </>
  )
}

export default CarStatus