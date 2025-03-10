import * as ExcelJS from 'exceljs';

export const GreaterThanCero: ExcelJS.DataValidation = {
    type: 'whole',
    operator: 'greaterThan',
    formulae: ['0'],
    showErrorMessage: true,
    errorTitle: 'Solo números permitidos',
    error: 'Ingrese un número mayor que 0'
}