export type ElevatorStatus = "IDLE" | "MOVING" | "LOADING";

export interface Elevator {
    id: number;
    currentFloor: number;
    status: ElevatorStatus;
    targetFloor: number[];
    passengers: number[];   // 탑승객 ID 목록
}