interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  converterToUTC(date: Date): string;
  dateNow(): Date;
}

export { IDateProvider };
