import * as dayjs from 'dayjs';

export const DayjsProvider = {
  provide: 'DAYJS',
  useValue: dayjs,
};