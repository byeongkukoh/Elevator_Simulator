export function getRandomFloors(floorCount: number) {
    let start = Math.floor(Math.random() * floorCount) + 1;
    let target = start;

    while (target === start) {
        target = Math.floor(Math.random() * floorCount) + 1
    }

    return { start, target };
}