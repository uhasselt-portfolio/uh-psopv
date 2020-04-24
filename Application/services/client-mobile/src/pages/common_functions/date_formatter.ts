export function formatDate(data: string){
    return (data.slice(5, 10))

}

export function  formatTime(data:string){
    return (data.slice(11, 16))
}

export function formatDateTime(data: string){
    return (formatTime(data) + ", " + formatDate(data))
}