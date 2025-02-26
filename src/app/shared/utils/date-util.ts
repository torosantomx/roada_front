export class DateUtil {
    private static todayCdmx = new Date(
        new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" })
    );


    public static convertFromDateToString(date: Date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }
    public static convertFromDateToStringDDMMYY(date: Date) {
        return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    }
    public static getPreviousDate(): string {
        return `${this.yesterday.getFullYear()}-${String(this.yesterday.getMonth() + 1).padStart(2, '0')}-${String(this.yesterday.getDate()).padStart(2, '0')}`;
    }

    public static getPreviousDateDDMMYYY(): string {
        return `${String(this.yesterday.getDate()).padStart(2, '0')}-${String(this.yesterday.getMonth() + 1).padStart(2, '0')}-${this.yesterday.getFullYear()}`;
    }


    public static get yesterday(): Date {
        const previous = new Date(this.today);
        previous.setDate(previous.getDate() - 1);
        return previous;
    }

    public static get today(): Date {
        return this.todayCdmx;
    }
}