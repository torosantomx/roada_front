import { Injectable } from '@angular/core';
import { ExcelCell } from '@models/custom/celda-excel';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class GenerateExcelFileService {

  constructor() { }

  public async generateAndDownloadExcel(columns: Array<ExcelCell>, fileName: string) {
    try {
      // Crear un nuevo libro de trabajo
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Hoja1");

      const columnNames = columns.map(col => col.name);

      // Agregar los encabezados
      worksheet.addRow(columnNames);
      worksheet.getRow(1).font = { bold: true }; // Encabezados en negrita

      // Configurar columnas con ancho dinámico
      worksheet.columns = columns.map(col => ({
        header: col.name,
        key: col.name,
        width: col.name.length + 5
      }));

      // Aplicar validaciones a toda la columna (excepto la fila de encabezado)
      columns.forEach((col, index) => {
        if (col.validation) {
          const colLetter = worksheet.getColumn(index + 1).letter; 
          for (let rowNumber = 2; rowNumber <= 400; rowNumber++) {
            worksheet.getCell(`${colLetter}${rowNumber}`).dataValidation = col.validation;
          }
        }
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(data, `${fileName}.xlsx`);
    } catch (error) {
      console.error("Error al generar el archivo Excel:", error);
    }
  }
}
