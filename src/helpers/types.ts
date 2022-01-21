export type WorkedHours = {
  day: string,
  hours: number,
}

export type WeeksData = {
  week: string,
  workedHours: WorkedHours[]
}

export type EmployeeData = {
  name: string,
  weeks: WeeksData[],
};
