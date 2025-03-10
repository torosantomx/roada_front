import * as ExcelJS from 'exceljs';

export const Between = (minValue: number, maxValue: number): ExcelJS.DataValidation => ({
    type: 'whole',
    operator: 'between',
    formulae: [`${minValue}`, `${maxValue}`], // Se usa un array en lugar de formula1 y formula2
    showErrorMessage: true,
    errorTitle: 'Valor fuera de rango',
    error: `Ingrese un número entre ${minValue} y ${maxValue}`
});
