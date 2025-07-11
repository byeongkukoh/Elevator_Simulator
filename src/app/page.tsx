'use client';

import { useState } from 'react';

import SimulatorControls from '@/components/SimulatorControls';
import ElevatorGrid from '@/components/ElevatorGrid';
import SimulatorRandomPassenger from '@/components/SimulatorRandomPassenger';
import { SimulatorElevatorRunner } from '@/components/SimulatorElevatorRunner';

import { useElevatorStore } from '@/stores/elevatorStore';
import ElevatorStatusPanel from '@/components/ElevatorStatusPanel';

export default function Home() {
  const [isSimulating, setIsSimulating] = useState(false); // 시뮬레이션 시작 여부

  const { elevators, waitingList, settings } = useElevatorStore();
  const floorCount = settings.floorCount; // 현재 설정된 층수

  return (
    <main className='min-h-screen flex flex-col items-center bg-gray-50 py-10'>
      <h1 className='text-4xl font-bold text-blue-900 mb-6'>Elevator Simulator</h1>

      {/* 시뮬레이터 컨트롤(세팅) 파트*/}
      <SimulatorControls
        isSimulating={isSimulating}
        setIsSimulating={setIsSimulating}
      />

      {/* 랜덤 승객 생성 */}
      <SimulatorRandomPassenger isSimulating={isSimulating} />

      {/* 엘리베이터 시뮬레이터 이동 */}
      <SimulatorElevatorRunner isSimulating={isSimulating} />

      {/* 시뮬레이터 */}
      <ElevatorGrid
        elevators={elevators}
        waitingList={waitingList}
        floorCount={floorCount}
      />

      {/* 엘리베이터 상태 패널 */}
      <ElevatorStatusPanel />
    </main>
  )
}