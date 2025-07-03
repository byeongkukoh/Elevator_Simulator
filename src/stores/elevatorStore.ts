import { create } from 'zustand';
import { Elevator } from '@/types/elevator';
import { Passenger } from '@/types/passenger';
import { LogEntry } from '@/types/log';
import { Statistics } from '@/types/statistics';

let passengerIdCounter = 1;
interface ElevatorStoreState {
    elevators: Elevator[];
    waitingList: Passenger[];
    log: LogEntry[];
    stats: Statistics;
    // 현재 적용 중인 건물 층수 / 엘리베이터 개수 설정
    settings: {
        floorCount: number;
        elevatorCount: number;
    };
    // 동작 관련 함수들
    setSettings: (settings: {elevatorCount: number; floorCount: number}) => void;
    resetSimulation: () => void;
    addWaitingPassenger: (person: Omit<Passenger, "id">) => void;
    updateElevator: (id: number, newData: Partial<Elevator>) => void;
    addLog: (entry: LogEntry) => void;
}

export const useElevatorStore = create<ElevatorStoreState>((set, get) => ({
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
    // 기본 설정 값
    settings: {
        floorCount: 10,
        elevatorCount: 2,
    },
    setSettings: (settings) =>
        set(() => ({
            settings: {...settings},
            // 엘리베이터 및 기타 상태도 함께 초기화
            elevators: Array.from({length: settings.elevatorCount}, (_, idx) => ({
                id: idx + 1,
                currentFloor: 1,
                status: "IDLE",
                targetFloor: [],
                passengers: [],
            })),
            waitingList: [],
            log: [],
            stats: {
                totalRequests: 0,
                averageWaitTime: 0,
                maxWaitTime: 0,
                averageMovmentTime: 0,
                maxMovementTime: 0,
            },
        })),
    resetSimulation: () => 
        set((state) => ({
            elevators: Array.from({length: state.settings.elevatorCount}, (_, idx) => ({
                id: idx + 1,
                currentFloor: 1,
                status: "IDLE",
                targetFloor: [],
                passengers: [],
            })),
            waitingList: [],
            log: [],
            stats: {
                totalRequests: 0,
                averageWaitTime: 0,
                maxWaitTime: 0,
                averageMovmentTime: 0,
                maxMovementTime: 0,
            },
        })),
    addWaitingPassenger: (person: Omit<Passenger, "id">) => 
        set((state) => {
            const newPassenger = {
                ...person,
                id: passengerIdCounter++,
            }

            return {
                waitingList: [...state.waitingList, newPassenger],
                stats: {
                    ...state.stats, 
                    totalRequests: state.stats.totalRequests + 1
                },
            };
        }),
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