export function GetCurrentDayNumberAndName()
{
    const date = new Date();
    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const dayNumber = date.getDay() > 0 ? date.getDay() -1 : 6;
    const day = days[dayNumber];

    return [dayNumber, day];
}


export const readableTime = (time) =>
{
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
}

function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}