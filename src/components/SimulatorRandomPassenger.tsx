import { useEffect, useRef } from "react";
import { useElevatorStore } from "@/stores/elevatorStore";
import { getRandomFloors } from "@/utils/random";

export default function SimulatorRandomPassenger({isSimulating}: {isSimulating: boolean}) {
    const addWatingPassenger = useElevatorStore((state) => state.addWaitingPassenger);
    const floorCount = useElevatorStore((state) => state.settings.floorCount);
    const timeRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isSimulating) {
            timeRef.current = setInterval(() => {
                const {start, target} = getRandomFloors(floorCount);
                addWatingPassenger({
                    startFloor: start,
                    targetFloor: target,
                    requestTime: Date.now(),
                    assigned: false,
                })
            }, 3000); // 3초마다 승객 추가 (추후 랜덤 시간으로 확장 가능)
        }

        return () => {
            if (timeRef.current) clearInterval(timeRef.current);
        }
    }, [isSimulating, addWatingPassenger, floorCount]);

    return null;    // 랜더링 필요 없음
}