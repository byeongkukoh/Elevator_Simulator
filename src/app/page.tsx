'use client';

import Elevator from '@/components/Elevator';
import WaitingList from '@/components/WaitingList';
import { useElevatorStore } from '@/stores/elevatorStore';

export default function Home() {
  const {elevators, waitingList} = useElevatorStore();

  return (
    <main>
      <h1>Elevator Simulator</h1>
      <div>
        <WaitingList waitingList={waitingList} />
      </div>
      
      <div>
        {elevators.map((elevator) => (
          <Elevator key={elevator.id} data={elevator} />
        ))}
      </div>
    </main>
  )
}