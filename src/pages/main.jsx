import React from "react";
import {
  MonitorContainer,
  DeviceSection,
  DeviceImage,
  DeviceTitle,
  DeviceSpecs,
  SystemStatusSection,
} from "./main.style";
import StatusCard from "../component/StatusCard";
import CarStatus from "../component/CarStatus";
function Monitor() {
  return (
    <MonitorContainer>
      <DeviceSection>
        <CarStatus />
      </DeviceSection>
      <SystemStatusSection>
        <StatusCard name='temperature'/>
        <StatusCard name='humidity'/>
        <StatusCard name='illuminance'/>
        <StatusCard name='motorSpeed'/>
      </SystemStatusSection>
    </MonitorContainer>
  );
}

export default Monitor;
