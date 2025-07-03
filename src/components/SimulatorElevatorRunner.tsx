import { use, useEffect, useRef } from "react";
import { useElevatorStore } from "@/stores/elevatorStore";

export function SimulatorElevatorRunner( {isSimulating}: {isSimulating: boolean} ) {
    const updateElevators = useElevatorStore((state) => state.updateElevator);
    const loadElevator = useElevatorStore((state) => state.loadElevator);
    const set = useElevatorStore;   // store 함수 호출용
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isSimulating) {
            timerRef.current = setInterval(() => {
                // 항상 최신 엘리베이터 상태 읽기
                const elevators = useElevatorStore.getState().elevators;
                console.log("Elevator Runner: ", elevators); // DEBUGGING

                elevators.forEach((elevator) => {
                    if (elevator.targetFloor.length === 0) {
                        // 목표 없음: IDLE
                        updateElevators(elevator.id, { status: "IDLE"});
                        return;
                    }

                    if (elevator.currentFloor === elevator.targetFloor[0]) {
                        loadElevator(elevator.id);
                    }

                    // 목표층과 다르면 이동
                    if (elevator.currentFloor !== elevator.targetFloor[0]) {
                        const direction = elevator.currentFloor < elevator.targetFloor[0] ? 1 : -1;
                        updateElevators(elevator.id, {
                            currentFloor: elevator.currentFloor + direction,
                            status: "MOVING",
                        });
                    } else {
                        // 목표층 도착: LOADING
                        updateElevators(elevator.id, { status: "LOADING"})
                    }
                });
            }, 1000); // 1초마다 실행
        }
        
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isSimulating, updateElevators, updateElevators]);

    return null;
}