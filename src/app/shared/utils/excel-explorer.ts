import { FileExplorer } from "./file-explorer";
import * as XLSX from 'xlsx';


export class ExcelExplorer extends FileExplorer {
    public static async SelectExcel() {
        return new Promise(async (resolve, reject) => {
            try {
                const file = await this.openFileExplorer(['xlsx', 'xls']);
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (e: any) => {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });

                    // Leer la primera hoja
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];

                    // Convertir a JSON
                    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                    const headers: any = jsonData[0]; // Primera fila como encabezados
                    const rows: any = jsonData.slice(1); // Resto de filas
                    if (!headers || rows.length < 1)
                        return resolve([])

                    // Mapear filas a objetos con claves del header
                    const formattedData = rows.map((row: any[]) => {
                        let obj: any = {};
                        headers.forEach((header: string, index: number) => {
                            obj[header.toLowerCase()] = row[index] || null; // Evita valores `undefined`
                        });
                        return obj;
                    });
                    resolve(formattedData);
                };
                reader.readAsArrayBuffer(file);
            } catch (error) {
                reject(error)
            }

        });

    }
}

