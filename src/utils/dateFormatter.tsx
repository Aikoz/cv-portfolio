import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import  es  from "dayjs/locale/es";
dayjs.locale(es);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs().tz('America/Mexico_City');

export function DateFormatter (string: string) {

   const formattedDate = dayjs.utc(string).format('DD MMMM YYYY, H:mm:ss');

   return formattedDate

}

export function DateFormatterDateType (string: string) {

   const formattedDate = dayjs.utc(string);

   return formattedDate

}