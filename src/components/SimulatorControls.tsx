'use client';

import { useState } from "react";
import { useElevatorStore } from "@/stores/elevatorStore";

const elevatorOptions = [1, 2, 3, 4, 5];
const floorOptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

export default function SimulatorControls() {
    const { settings, setSettings, resetSimulation } = useElevatorStore();

    // 드롭다운 선택 값을 로컬 state로 보관 -> 적용시 store에 반영
    const [selectedElevators, setSeletedElevators] = useState(settings.elevatorCount);
    const [selectedFloors, setSelectedFloors] = useState(settings.floorCount);
    const [isSimulating, setIsSimulating] = useState(false);

    // 적용 버튼 클릭 시 store의 settings 업데이트
    const handleApplySettings = () => {
        setSettings({
            elevatorCount: selectedElevators,
            floorCount: selectedFloors
        })
    };

    // 시뮬레이터 시작/정지
    const handleSimulate = () => {
        if (isSimulating) {
            resetSimulation();
        }

        setIsSimulating(!isSimulating);
    };

    return (
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3 py-4">
            {/* 엘리베이터 수 드롭다운 메뉴 */}
            <label className="flex items-center gap-2 font-medium">
                엘리베이터
                <select
                    className="border rounded p-1 mx-2"
                    value={selectedElevators}
                    onChange={(e) => setSeletedElevators(Number(e.target.value))}
                >
                    {elevatorOptions.map((cnt) => (
                        <option key={cnt} value={cnt}>{cnt}대</option>
                    ))}
                </select>
            </label>

            {/* 건물 층 수 드롭다운 메뉴 */}
            <label className="flex items-center gap-2 font-medium">
                건물
                <select
                    className="border rounded p-1 mx-2"
                    value={selectedFloors}
                    onChange={(e) => setSelectedFloors(Number(e.target.value))}
                >
                    {floorOptions.map((cnt) => (
                        <option key={cnt} value={cnt}>{cnt}층</option>
                    ))}
                </select>
            </label>

            {/* 설정 적용 버튼 */}
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" 
                onClick={handleApplySettings}
            >
                적용
            </button>

            {/* 시뮬레이터 시작/정지 버튼 */}
            <button
                className={`px-4 py-2 rounded ${isSimulating ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white transition`}
                onClick={handleSimulate}
            >
                {isSimulating ? "정지" : "시작"}
            </button>
        </div>
    );
}