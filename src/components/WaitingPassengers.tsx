import type { Passenger } from "@/types/passenger";

interface WaitingPassengersProps {
    passengers: Passenger[];
}

export default function WaitingPassengers({ passengers }: WaitingPassengersProps) {
    if (passengers.length === 0) return null;

    return (
        <div>
            {passengers.map((passenger) => (
                <div key={passenger.id} title={`요청시간: ${passenger.requestTime}`}>
                    🎫 {passenger.targetFloor} 층
                </div>
            ))}
        </div>
    )
}