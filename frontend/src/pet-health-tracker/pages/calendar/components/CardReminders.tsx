import type { CurrentMonthReminder } from '../CalendarPage';
import { CardReminder } from './CardReminder';

interface Props {
  reminders: CurrentMonthReminder[];
}

export const CardReminders = ({ reminders }: Props) => {
  return (
    <div className='p-4 bg-white rounded-lg w-full'>
      <h3 className='font-bold ml-2 mb-2'>Recordatorios</h3>

      <div className='flex flex-col gap-2'>
        {reminders.map((reminder) => (
          <CardReminder
            key={reminder.id}
            petImage={reminder.petImage}
            petName={reminder.petName}
            task={reminder.task}
            theme={reminder.theme}
          />
        ))}
      </div>
    </div>
  );
};
