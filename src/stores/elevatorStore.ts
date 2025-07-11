import { create } from 'zustand';

import { Elevator } from '@/types/elevator';
import { ElevatorStatus } from '@/types/elevator';
import { Passenger } from '@/types/passenger';
import { LogEntry } from '@/types/log';
import { Statistics } from '@/types/statistics';

import { selectElevatorForPassenger } from '@/utils/assignElevator';

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
    assignElevatorToPassenger: (passengerId: number) => void;
    addWaitingPassenger: (person: Omit<Passenger, "id">) => void;
    updateElevator: (id: number, newData: Partial<Elevator>) => void;
    addLog: (entry: LogEntry) => void;
    loadElevator: (elevatorId: number) => void;
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
    assignElevatorToPassenger: (passengerId: number) =>
        set((state) => {
            // 아직 배정되지 않은 해당 대기자만 찾기
            const passenger = state.waitingList.find(person => person.id === passengerId && !person.assigned);

            if (!passenger) return state;

            const selectedElevator = selectElevatorForPassenger(state.elevators, passenger);
            if (!selectedElevator) return state;

            // 해당 엘리베이터의 targetFloors에 출발층, 목표층 추가
            const updatedElevators = state.elevators.map((elevator) => {
                if (elevator.id === selectedElevator.id) {
                    return {
                        ...elevator,
                        targetFloor: [
                            ...elevator.targetFloor,
                            passenger.startFloor,
                            passenger.targetFloor,
                        ]
                    };
                }

                return elevator;
            })

            // 대기자 assigned 처리
            const updatedWaitingList = state.waitingList.map((person) => {
                if (person.id === passengerId) {
                    return {
                        ...person,
                        assigned: true,
                        assignedElevatorId: selectedElevator.id,
                    };
                }

                return person;
            })

            // 로그 기록
            const newLog: LogEntry = {
                timestamp: Date.now(),
                elevatorId: selectedElevator.id,
                action: "ASSIGN",
                details: `엘리베이터 ${selectedElevator.id}가 대기자 ${passenger.id} (${passenger.startFloor} ➡️ ${passenger.targetFloor}) 배정`,
            }

            return {
            elevators: updatedElevators,
            waitingList: updatedWaitingList,
            log: [...state.log, newLog],
        };
        }),
    addWaitingPassenger: (person: Omit<Passenger, "id">) => {
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
        });
        // 대기자 추가된 후 바로 배정 함수 호출
        get().assignElevatorToPassenger(passengerIdCounter - 1);
    },
    updateElevator: (id, newData) =>
        set((state) => ({
            elevators: state.elevators.map((elevator) =>
            elevator.id === id ? {...elevator, ...newData} : elevator)
        })),
    addLog: (entry) => 
        set((state) => ({
            log: [...state.log, entry],
        })),
    loadElevator: (elevatorId: number) => set((state) => {
        const elevator = state.elevators.find(elevator => elevator.id === elevatorId);
        if (!elevator) return state;

        const currentFloor = elevator.currentFloor;

        // 하차
        let updatePassengers = elevator.passengers.filter(passengerId => {
            const passenger = state.waitingList.find(person => person.id === passengerId);

            if (!passenger) return true; // 대기자 목록에 없으면 하차

            if (passenger.targetFloor === elevator.currentFloor) {
                return false;
            }
            return true;
        })

        // 탑승
        const boardingPassengers = state.waitingList.filter(
            passenger => 
                !elevator.passengers.includes(passenger.id) &&
                passenger.assignedElevatorId === elevatorId &&
                passenger.startFloor === currentFloor && 
                passenger.assigned
        ).map(passenger => passenger.id);

        updatePassengers = [...updatePassengers, ...boardingPassengers];

        const updatedWaitingList = state.waitingList.filter(
            passenger => !boardingPassengers.includes(passenger.id)
        );

        // targetFloor 제거
        const updatedTargetFloor = elevator.targetFloor.slice(1);

        // 상태 변경
        const status: ElevatorStatus = updatedTargetFloor.length === 0 ? "IDLE" : "MOVING";

        // 엘리베이터/대기자 상태 갱신
        const updatedElevators = state.elevators.map((elevator) =>
            elevator.id === elevatorId ? {
                ...elevator,
                passengers: updatePassengers,
                targetFloor: updatedTargetFloor,
                status: status,
            } : elevator
        );

        return { 
            elevators: updatedElevators, 
            waitingList: updatedWaitingList 
        };
    })
}));