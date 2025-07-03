import type { Passenger } from '../types/passenger';
import type { Elevator } from '../types/elevator';

/**
 * IDLE 우선, 없으면 가장 가까운 엘리베이터를 배정
 * @param elevators   엘리베이터 배열
 * @param passenger   대기자 객체
 * @returns           배정할 엘리베이터(없으면 null)
 */

export function selectElevatorForPassenger(
    elevators: Elevator[],
    passenger: Passenger
): Elevator | null {
    // IDLE 상태의 엘리베이터 중에서 가장 가까운 것 찾기
    const idleElevators = elevators.filter(elevator => elevator.status === 'IDLE');
    let selectedElevator: Elevator | null = null;

    if (idleElevators.length > 0) {
        selectedElevator = idleElevators.reduce((prev, curr) => 
            Math.abs(curr.currentFloor - passenger.startFloor) <
            Math.abs(prev.currentFloor - passenger.startFloor) ? curr : prev);
    } else if (elevators.length > 0) {
        // IDLE 엘리베이터가 없으면 전체 중에서 가장 가까운 것
        selectedElevator = elevators.reduce((prev, curr) =>
            Math.abs(curr.currentFloor - passenger.startFloor) <
            Math.abs(prev.currentFloor - passenger.startFloor) ? curr : prev);
    }

    return selectedElevator;
}