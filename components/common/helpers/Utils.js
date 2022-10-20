export function GetCurrentDayNumberAndName()
{
    const date = new Date();
    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const dayNumber = date.getDay()-1;
    const day = days[dayNumber];

    return [dayNumber, day];
}