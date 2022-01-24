export type WeeksData = {
  week: string,
  workedHours: {
    [key: string] : number,
  },
  }

export type EmployeeData = {
  name: string,
  weeks: WeeksData[],
};
