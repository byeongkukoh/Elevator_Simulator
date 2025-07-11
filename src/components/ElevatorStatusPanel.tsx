import { useElevatorStore } from "@/stores/elevatorStore"

export default function ElevatorStatusPanel() {
    const elevators = useElevatorStore((state) => state.elevators)
    const waitingList = useElevatorStore((state) => state.waitingList)

    return (
        <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {elevators.map((elevator) => (
                <div key={elevator.id}
                    className="bg-white rounded-xl shadow pd-4 flex flex-col gap-2">
                    <div className="font-bold text-lg text-blue-600">
                        {elevator.id}호 엘리베이터
                    </div>

                    <div>현재 위치: <span>{elevator.currentFloor}</span></div>

                    <div>상 태: <span>{elevator.status}</span></div>

                    <div>
                        다음 목표 층: {" "}
                        {elevator.targetFloor.length > 0
                            ? elevator.targetFloor[0] + "층"
                            : <span>없음</span>}
                    </div>

                    <div>
                        탑승 승객: {" "}
                        {elevator.passengers.length === 0 ? (
                            <span>없음</span>
                        ) : (
                            <ul className="pl-2">
                                {elevator.passengers.map((passengerId) => {
                                    const passenger = waitingList.find(p => p.id === passengerId);
                                    // 하차 승객은 이미 대기자 목록에 없을 수 있으니 예외처리
                                    return (
                                        <li key={passengerId} className="text-sm">
                                            - ID: {passengerId}
                                            {passenger && (
                                                <>
                                                    {" | 출발: "}{passenger.startFloor}층{" → "}
                                                    <span className="text-blue-600">목표: {passenger.targetFloor}층</span>
                                                </>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}