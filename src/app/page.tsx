'use client';

import Elevator from '@/components/Elevator';
import WaitingList from '@/components/WaitingList';
import ElevatorGrid from '@/components/ElevatorGrid';
import { useElevatorStore } from '@/stores/elevatorStore';

export default function Home() {
  const {elevators, waitingList} = useElevatorStore();
  const floorCount = 10; // 예시로 10층 건물 (추후 설정에서 동적으로 변경 예정)

  return (
    <main className='min-h-screen flex flex-col items-center bg-gray-50 py-10'>
      <h1 className='text-4xl font-bold text-blue-900 mb-8'>Elevator Simulator</h1>

      {/* 시뮬레이터 GUI 파트 */}
      <ElevatorGrid
        elevators={elevators}
        waitingList={waitingList}
        floorCount={floorCount} 
      />
      {/* 추후 상황판에서 재사용 예정 */}
      {/* <div>
        <WaitingList waitingList={waitingList} />
      </div>
      
      <div>
        {elevators.map((elevator) => (
          <Elevator key={elevator.id} data={elevator} />
        ))}
      </div> */}
    </main>
  )
}