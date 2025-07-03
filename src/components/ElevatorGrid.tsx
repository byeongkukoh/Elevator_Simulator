import type { Elevator } from "@/types/elevator"
import type { Passenger } from "@/types/passenger"

import ElevatorIcon from "./ElevatorIcon";
import WaitingPassengers from "./WaitingPassengers";

interface ElevatorGridProps {
    elevators: Elevator[];
    waitingList: Passenger[];
    floorCount: number;
}

export default function ElevatorGrid({ elevators, waitingList, floorCount }: ElevatorGridProps) {
    // 1층부터 10층까지 내림차순 배열
    const floors = Array.from({ length: floorCount}, (_, index) => floorCount - index)

    return(
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white p-4">
            <table className="min-w-[500px] border-collapse text-center">
                <thead>
                    <tr className="bg-blue-50 border-b">
                        <th className="py-2 px-3">층수</th>
                        {elevators.map((elevator) => (
                            <th key={elevator.id} className="py-2 px-3">{elevator.id}호 E/V</th>
                        ))}
                        <th className="py-2 px-3">대기자 (목표 증)</th>
                    </tr>
                </thead>

                <tbody>
                    {floors.map((floor) => (
                        <tr key={floor} className="border-b hover:bg-blue-50 transition">
                            <td className="py-2 px-3 font-semibold text-blue-500">{floor}층</td>
                            {elevators.map((elevator) => (
                                <td key={elevator.id} className="py-2 px-3">
                                    {elevator.currentFloor === floor && (
                                        <ElevatorIcon elevatorId={elevator.id} status={elevator.status} />
                                    )}
                                </td>
                            ))}
                            <td className="py-2 px-3">
                                <WaitingPassengers
                                    passengers={waitingList.filter(person => person.startFloor === floor)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}