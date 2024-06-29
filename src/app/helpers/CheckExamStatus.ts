export const checkExamStatus = (
  dateOfExamination: string,
  endTime: string,
  startTime: string
) => {
  if (!dateOfExamination)
    return { started: false, ongoing: false, ended: false };

  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  const startDateTime = new Date(dateOfExamination);
  startDateTime.setHours(startHours, startMinutes);

  const endDateTime = new Date(dateOfExamination);
  endDateTime.setHours(endHours, endMinutes);

  const now = new Date();
  const started = now >= startDateTime;
  const ongoing = now >= startDateTime && now <= endDateTime;
  const ended = now > endDateTime;

  return { started, ongoing, ended };
};
