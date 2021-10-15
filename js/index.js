import {
    getTickets
} from './fetch.js';
import {
    sortAscendingPrice,
    sortAscendingDuration,
    filterTickets
} from './utils.js';
import {
    generateHTML,
    prepareToRender
} from './render.js';

const tabVariants = Object.freeze({
    'cheap': sortAscendingPrice,
    'fast': sortAscendingDuration
});
const filterOptionsModel = Object.freeze([true, 0, 1, 2, 3]);

let filterOptions;

const render = (parentNode, arrayOfObjects, flushParentNode = true) => {
    if (flushParentNode) parentNode.innerHTML = '';
    if (filterOptions.length === 0) {
        parentNode.innerHTML = '';
        parentNode.insertAdjacentHTML('beforeend', '<p class="warning-text">Выберите в фильтрах количество пересадок!!!</p>')
    }
    if (Array.isArray(arrayOfObjects)) {
        let list = [...arrayOfObjects];
        tabVariants[document.querySelector('.active-tab').id](list);
        list = filterTickets(list, filterOptions).slice(0, 5);
        list.forEach((ticket) => {
            parentNode.insertAdjacentHTML('beforeend', generateHTML(prepareToRender(ticket)));
        });
    }
}

async function initialize(event) {
    let ticketsInfo;
    const $options = [...document.getElementsByName('ticket-option')];
    const $tabs = document.querySelector('.tabs');
    const $tickets = document.getElementById('tickets');

    $options.forEach((option) => option.addEventListener('click', (e) => {
        filterOptions = filterOptionsModel.filter((option, index) => $options[index].checked);
        render($tickets, ticketsInfo);
    }));
    $tabs.addEventListener('click', (e) => {
        if (!e.target.className.includes('active-tab')) {
            document.querySelector('.active-tab').classList.remove('active-tab');
            e.target.classList.add('active-tab');
            render(tickets, ticketsInfo);
        }
    });

    ticketsInfo = await getTickets();
    filterOptions = filterOptionsModel.filter((option, index) => $options[index].checked);
    render($tickets, ticketsInfo);
}

document.addEventListener('DOMContentLoaded', initialize);