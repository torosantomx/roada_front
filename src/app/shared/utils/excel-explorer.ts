import { FileExplorer } from "./file-explorer";
import * as ExcelJS from 'exceljs';

export class ExcelExplorer extends FileExplorer {
    public static async SelectExcel(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const file = await this.openFileExplorer(['xlsx', 'xls']);
                if (!file) return;

                const reader = new FileReader();
                reader.onload = async (e: any) => {
                    try {
                        const arrayBuffer = e.target.result as ArrayBuffer;
                        const workbook = new ExcelJS.Workbook();
                        await workbook.xlsx.load(arrayBuffer);

                        // Leer la primera hoja del libro
                        const worksheet = workbook.worksheets[0]; // Primera hoja
                        if (!worksheet) return resolve([]);

                        // Extraer encabezados
                        const headers: string[] = [];
                        worksheet.getRow(1).eachCell((cell) => {
                            headers.push(cell.text.trim().toLowerCase());
                        });

                        if (headers.length === 0) return resolve([]);

                        // Leer datos (a partir de la segunda fila)
                        const formattedData: Array<any> = [];
                        worksheet.eachRow((row, rowNumber) => {
                            if (rowNumber === 1) return; // Omitir encabezados

                            let obj: any = {};
                            row.eachCell((cell, colNumber) => {
                                const headerKey = headers[colNumber - 1]; // Ajuste de índice
                                obj[headerKey] = typeof cell.value === "string" 
                                    ? cell.value.replace(/\s+/g, '').toUpperCase()
                                    : cell.value ?? null;
                            });

                            formattedData.push(obj);
                        });

                        resolve(formattedData);
                    } catch (error) {
                        reject(error);
                    }
                };
                reader.readAsArrayBuffer(file);
            } catch (error) {
                reject(error);
            }
        });
    }
}
