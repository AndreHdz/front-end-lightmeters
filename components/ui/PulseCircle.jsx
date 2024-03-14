
const PulseCircle = ({green, red, yellow}) => {

    let colorClass = "";
    if (green) {
        colorClass = "bg-green-500";
    } else if (red) {
        colorClass = "bg-red-500";
    } else if (yellow) {
        colorClass = "bg-yellow-500";
    }

    return (
    <span className="relative flex h-3 w-3">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorClass}`}></span>
        <span className={`relative inline-flex rounded-full h-3 w-3 ${colorClass}`}></span>
    </span>
  )
}

export default PulseCircle