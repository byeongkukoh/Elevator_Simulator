interface ElevatorIconProps {
    elevatorId: number;
    status: string;
}

export default function ElevatorIcon({ elevatorId, status }: ElevatorIconProps) {
    const statusColor = 
        status === 'IDLE' ? 'bg-blue-400' :
        status === 'MOVING' ? 'bg-yellow-400' :
        status === 'LOADING' ? 'bg-green-400' :
        'bg-gray-300'; // 기본 색상

    return (
        <div className={`flex items-center justify-center mx-auto rounded w-6 h-6 text-white font-bold shadow ${statusColor} `}>
            {elevatorId}
        </div>
    )
}