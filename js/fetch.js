const searchIdURL = 'https://front-test.beta.aviasales.ru/search';
const getId = async () => fetch(searchIdURL);
const fetchTicketsURL = (searchID) => `https://front-test.beta.aviasales.ru/tickets?searchId=${searchID}`;
const fetchTickets = async (id) => {
    const req = await fetch(fetchTicketsURL(id));
    if (req.status !== 500) {
        const res = await req.json();
        const {
            tickets,
            stop
        } = res;
        return !stop ? [...tickets, ...await fetchTickets(id)] : tickets
    } else {
        return await fetchTickets(id);
    }
};

const getTickets = async () => {
    const reqID = await getId();
    const resID = await reqID.json();
    const {
        searchId
    } = resID;
    return await fetchTickets(searchId);
}

export default getTickets;
export {
    getTickets
};