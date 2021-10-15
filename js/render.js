import {
    formatToBeginEnd,
    formatToHoursMinutes,
    getPicOfAVS
} from './utils.js';

const prepareToRender = (obj) => ({
    ...obj,
    segments: [{
            ...obj.segments[0],
            time: formatToBeginEnd(obj.segments[0].date, obj.segments[0].duration),
            duration: formatToHoursMinutes(obj.segments[0].duration),
        },
        {
            ...obj.segments[1],
            time: formatToBeginEnd(obj.segments[1].date, obj.segments[1].duration),
            duration: formatToHoursMinutes(obj.segments[1].duration),
        }
    ]
});

const generateHTML = (obj) => `
<li class="tickets__el ticket">
    <div class="ticket__header">
        <h2 class="ticket__price">${obj.price} P</h2>
        <img src=${getPicOfAVS(obj.carrier)} alt="" class="ticket__carrier-logo" />
    </div>
    <div class="ticket__segment segment">
        <div class="segment__part">
            <p>${obj.segments[0].origin} - ${obj.segments[0].destination}</p>
            <p>${obj.segments[0].time}</p>
        </div>
        <div class="segment__part">
            <p>В пути</p>
            <p>${obj.segments[0].duration}</p>
        </div>
        <div class="segment__part">
            <p>${obj.segments[0].stops.length > 0 ? obj.segments[0].stops.length: ''} ${obj.segments[0].stops.length === 0 ? 'Без пересадок' : obj.segments[0].stops.length > 1 ? 'пересадки' : 'пересадка'}</p>
            <p>${obj.segments[0].stops.join(", ")}</p>
        </div>
    </div>
    <div class="ticket__segment segment">
        <div class="segment__part">
            <p>${obj.segments[1].origin} - ${obj.segments[1].destination}</p>
            <p>${obj.segments[1].time}</p>
        </div>
        <div class="segment__part">
            <p>В пути</p>
            <p>${obj.segments[1].duration}</p>
        </div>
        <div class="segment__part">
            <p>${obj.segments[1].stops.length > 0 ? obj.segments[1].stops.length : ''} ${obj.segments[1].stops.length === 0 ? 'Без пересадок' : obj.segments[1].stops.length > 1 ? 'пересадки' : 'пересадка'}</p>
            <p>${obj.segments[1].stops.join(", ")}</p>
        </div>
    </div>
</li>
`;

export default generateHTML;
export {
    generateHTML,
    prepareToRender
};