export interface Passenger {
    id: number;
    startFloor: number;
    targetFloor: number;
    requestTime: number;
    assigned: boolean;
    assignedElevatorId?: number;
}
