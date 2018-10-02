function getTimeDiffFromString(age) {
    const now = Date.now();
    const timearray = age.split(' ');
    if (timearray.length < 3 || timearray[1] === 0) {
        return now;
    }
    let timediff = 0;
    const value = timearray[0];
    let counter = 1;
    switch (timearray[1]) {
        case 'minute':
        case 'minutes':
            counter = 60;
            break;
        case 'hour':
        case 'hours':
            counter = 60 * 60;
            break;
        case 'day':
        case 'days':
            counter = 60 * 60 * 24;
            break;
        case 'week':
        case 'weeks':
            counter = 60 * 60 * 24 * 7;
            break;
        case 'month':
        case 'months':
            counter = 60 * 60 * 24 * 30;
            break;
        case 'year':
        case 'years':
            counter = 60 * 60 * 24 * 365;
    }
    timediff = value * counter * 1000; // to milliseconds
    return now - timediff;
}

module.exports = getTimeDiffFromString;