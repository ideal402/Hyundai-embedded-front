import React, {useState, useEffect} from 'react'
import api from '../api';
import * as S from "./CardStatus.style"


const CarStatus = () => {
  return (
    <>
    <S.DviceContainer>
        <S.DeviceImage src="https://via.placeholder.com/300x200" alt="Device" />
        <S.DeviceTitle>ROG Zephyrus G14</S.DeviceTitle>
        <S.DeviceSpecs>
          AMD Ryzen 9 5900HS with Radeon Graphics <br />
          NVIDIA GeForce RTX 3060 Laptop GPU
        </S.DeviceSpecs>
    </S.DviceContainer>
    <S.ButtonContainer>
        
    </S.ButtonContainer>
    </>
  )
}

export default CarStatus