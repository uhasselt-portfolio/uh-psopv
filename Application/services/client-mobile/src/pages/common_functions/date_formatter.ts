export function formatDate(data: string){
    return (data.slice(5, 10))

}

export function  formatTime(data:string){
    return (data.slice(11, 16))
}

export function formatDateTime(data: string){
    let d: Date = new Date(data);
    const ye = new Intl.DateTimeFormat('nl', { year: '2-digit' }).format(d)
    const mo = new Intl.DateTimeFormat('nl', { month: 'short' }).format(d)
    const da = new Intl.DateTimeFormat('nl', { day: 'numeric' }).format(d)

    const hour = new Intl.DateTimeFormat('nl', { hour: '2-digit' }).format(d)
    let minute = new Intl.DateTimeFormat('eng', { minute: '2-digit' }).format(d)

    if(minute == '0'){
        minute = '00'
    }

    return (`${hour}:${minute} (${da} ${mo})`)
}