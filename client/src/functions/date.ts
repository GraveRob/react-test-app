export function getFormattedDate (date: Date) {
    return (date.getDate() + '.' + date.getMonth()
     + '.' + date.getFullYear() + ', ' + date.getHours()
     + ':' + date.getMinutes() + ', ' + date.getSeconds() + 's');
}