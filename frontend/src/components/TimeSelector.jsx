export const TimeSelector = ({ selectedTime, setSelectedTime }) => {
  const times = [];
  const startHour = 8; // 8:00 AM
  const endHour = 18; // 6:00 PM

  for (let hour = startHour; hour < endHour; hour++) { // Changed <= to <
    for (let minute = 0; minute < 60; minute += 30) {
      const hourStr = hour.toString().padStart(2, '0');
      const minuteStr = minute.toString().padStart(2, '0');
      const
        timeStr = `${hourStr}:${minuteStr}:00.000`;
      times.push(timeStr);
    }
  }

  // Handle the last hour (18:00) separately
  const hourStr = endHour.toString().padStart(2, '0');
  const minuteStr = '0'.toString().padStart(2, '0');
  const timeStr = `${hourStr}:${minuteStr}:00.000`;
  times.push(timeStr);

  return (
    <select
      value={selectedTime}
      onChange={(e) => setSelectedTime(e.target.value)}
      className="border rounded p-2"
    >
      {times.map((time, index) => (
        <option key={index} value={time}>
          {new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
        </option>
      ))}
    </select>
  );
};

