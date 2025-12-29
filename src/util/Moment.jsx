import moment from 'moment';

moment.locale('ko');

export const formatter = (dateStr, format) => moment(dateStr, 'YYYYMMDDHHmmss').format(format);