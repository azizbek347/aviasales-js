const getPicOfAVS = (code) => `http://pics.avs.io/99/36/${code}.png`;
const sortAscendingPrice = (arr) => arr.sort((a, b) => a['price'] - b['price']);
const sortAscendingDuration = (arr) => arr.sort((a, b) => a.segments.reduce((acc, cur) => acc += cur.duration, 0) - b.segments.reduce((acc, cur) => acc += cur.duration, 0));
const formatToHoursMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60).toString().padStart(2, '0');
    minutes = (minutes % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
const formatToBeginEnd = (dateString, duration) => {
    const day = new Date(dateString);
    const hoursBegin = new Date(dateString).getHours().toString().padStart(2, '0');
    const minutesBegin = new Date(dateString).getMinutes().toString().padStart(2, '0');
    day.setMinutes(day.getMinutes() + duration);
    const hoursEnd = day.getHours().toString().padStart(2, '0');
    const minutesEnd = day.getMinutes().toString().padStart(2, '0');
    return `${hoursBegin}:${minutesBegin} - ${hoursEnd}:${minutesEnd}`;
}
const filterTickets = (arrayOfTickets, filterOptions) => arrayOfTickets.filter(ticket => {
    let result = true;
    if (!filterOptions.includes(true)) {
        result = result && ticket.segments.reduce((acc, el) => acc || filterOptions.includes(el.stops.length), false);
    }
    return result;
});

export {
    sortAscendingPrice,
    sortAscendingDuration,
    formatToHoursMinutes,
    formatToBeginEnd,
    getPicOfAVS,
    filterTickets
}
export default getPicOfAVS;