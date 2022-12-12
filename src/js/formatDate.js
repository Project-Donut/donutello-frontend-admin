/**
 * 
 * @param {Date} date 
 * @returns 
 */
export const formatDate = (date) => {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    const year = date.getFullYear();
    const month = zeroPad(date.getMonth() + 1, 2);
    const day = zeroPad(date.getDate(), 2);
    const localDate = `${day}/${month}/${year}`;
    const minutes = zeroPad(Math.floor(date.getMinutes() / 5) * 5, 2);
    const hours = zeroPad(date.getHours(), 2);
    const localTime = `${hours}:${minutes}`;
    return `${localDate} ${localTime}`;
}

export const zeroPad = (num, places) => String(num).padStart(places, '0');