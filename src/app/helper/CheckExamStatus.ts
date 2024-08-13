/**
 * Checks the status of an exam based on the date of examination, start time, and end time.
 * @param dateOfExamination - The date of the examination in string format.
 * @param endTime - The end time of the examination in string format (HH:mm).
 * @param startTime - The start time of the examination in string format (HH:mm).
 * @returns An object containing the status of the exam:
 * - started: A boolean indicating if the exam has started.
 * - ongoing: A boolean indicating if the exam is currently ongoing.
 * - ended: A boolean indicating if the exam has ended.
 */
export const CheckExamStatus = (
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