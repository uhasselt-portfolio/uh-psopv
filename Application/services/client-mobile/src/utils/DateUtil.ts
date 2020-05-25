import {DateTime, Zone} from "luxon";

export function formatDate(data: string){
    return (data.slice(5, 10))

}

export function  formatTime(data:string){
    return (data.slice(11, 16))
}

/**
 * Convert from UTC to local (Europe/Brussels)
 */
export function convertTimeZone(dateISO : string) {
    const utc : DateTime = DateTime.fromISO(dateISO);
    const local : DateTime = utc.setZone('Europe/Brussels');

    return local.toISO();
}

export function formatDateTime(date: string) : string {

    const localISO : string = convertTimeZone(date)

    return DateTime.fromISO(localISO, {locale: 'nl'}).toFormat("HH:mm (dd MMM)")
}