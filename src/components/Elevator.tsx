import type { Elevator } from '@/types/elevator';

interface ElevatorProps {
    data: Elevator;
}

export default function Elevator({data}: ElevatorProps) {
    return (
        <div>
            <div>엘리베이터 {data.id}</div>
            <div>위치: {data.currentFloor} 층</div>
            <div>상테: {data.status}</div>
            <div>목표: {data.targetFloor.join(', ') || '-'}</div>
            <div>탑승: {data.passengers.length} 명</div>
        </div>
    )
}