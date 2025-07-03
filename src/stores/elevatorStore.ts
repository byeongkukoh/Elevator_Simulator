import {create} from 'zustand';
import { Elevator } from '@/types/elevator';
import { Passenger } from '@/types/passenger';
import { LogEntry } from '@/types/log';
import { Statistics } from '@/types/statistics';

interface ElevatorStoreState {
    elevators: Elevator[];
    waitingList: Passenger[];
    log: LogEntry[];
    stats: Statistics;
    addWaitingPassenger: (person: Passenger) => void;
    updateElevator: (id: number, newData: Partial<Elevator>) => void;
    addLog: (entry: LogEntry) => void;
}

export const useElevatorStore = create<ElevatorStoreState>((set) => ({
    elevators: [
        {id: 1, currentFloor: 0, status: "IDLE", targetFloor: [], passengers: []},
        {id: 2, currentFloor: 0, status: "IDLE", targetFloor: [], passengers: []},
    ],
    waitingList: [],
    log: [],
    stats: {
        totalRequests: 0,
        averageWaitTime: 0,
        maxWaitTime: 0,
        averageMovmentTime: 0,
        maxMovementTime: 0,
    },
    addWaitingPassenger: (person) => 
        set((state) => ({
            waitingList: [...state.waitingList, person],
            stats: {...state.stats, totalRequests: state.stats.totalRequests + 1},
        })),
    updateElevator: (id, newData) =>
        set((state) => ({
            elevators: state.elevators.map((elevator) =>
            elevator.id === id ? {...elevator, ...newData} : elevator)
        })),
    addLog: (entry) => 
        set((state) => ({
            log: [...state.log, entry],
        }))
}));