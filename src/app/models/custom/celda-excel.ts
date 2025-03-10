import * as ExcelJS from 'exceljs';

export interface ExcelCell {
    name: string;
    validation?: ExcelJS.DataValidation; 
}