interface ElevatorIconProps {
    elevatorId: number;
    status: string;
}

export default function ElevatorIcon({ elevatorId, status }: ElevatorIconProps) {
    const statusColors = 
        status === 'IDLE' ? 'bg-blue-400' :
        status === 'MOVING' ? 'bg-yello-400' :
        status === 'LOADING' ? 'bg-green-400' :
        'bg-gray-300'; // 기본 색상

    return (
        <div>
            {elevatorId}
        </div>
    )
}