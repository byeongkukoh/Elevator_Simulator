import type {Passenger} from '@/types/passenger';

interface WaitingListProps {
    waitingList: Passenger[];
}

export default function WaitingList({waitingList}: WaitingListProps) {
    return (
        <div>
            <div>대기 인원 목록</div>
            <ul>
                {waitingList.map((person) => (
                    <li key={person.id}>
                        {person.startFloor}층 ➡️ {person.targetFloor}층
                    </li>
                ))}
            </ul>
        </div>
    )
}