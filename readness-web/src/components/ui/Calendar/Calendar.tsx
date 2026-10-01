import { useState } from 'react';
import styles from './Calendar.module.scss';
import Modal from '../Modal/Modal';

interface CalendarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Calendar({ value, onChange }: CalendarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [currentDate, setCurrentDate] = useState(
    value ? new Date(`${value}T00:00:00`) : new Date(),
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const startDay = firstDay === 0 ? 6 : firstDay - 1;

  const monthName = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const selectDay = (day: number) => {
    const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(
      day,
    ).padStart(2, '0')}`;

    onChange(date);
    setIsOpen(false);
  };

  return (
    <div className={styles.calendarWrapper}>
      <button type='button' onClick={() => setIsOpen((prev) => !prev)}>
        {value || 'Select date'}
      </button>

      {isOpen && (
        <Modal>
          <div className={styles.calendar}>
            <div className={styles.calendar__header}>
              <button
                type='button'
                className={styles.calendar__nav}
                onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              >
                ‹
              </button>

              <span className={styles.calendar__month}>{monthName}</span>

              <button
                type='button'
                className={styles.calendar__nav}
                onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              >
                ›
              </button>
            </div>

            <div className={styles.calendar__weekdays}>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
              <span>Su</span>
            </div>

            <div className={styles.calendar__days}>
              {Array.from({ length: startDay }).map((_, index) => (
                <div key={`empty-${index}`} />
              ))}

              {Array.from({ length: daysInMonth }, (_, index) => {
                const day = index + 1;

                const date = `${year}-${String(month + 1).padStart(
                  2,
                  '0',
                )}-${String(day).padStart(2, '0')}`;

                const isSelected = date === value;

                return (
                  <button
                    key={day}
                    type='button'
                    className={`${styles.calendar__day} ${
                      isSelected ? styles['calendar__day--selected'] : ''
                    }`}
                    onClick={() => selectDay(day)}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
