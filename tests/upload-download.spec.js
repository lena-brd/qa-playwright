import { test, expect } from '@playwright/test';
const ExcelJS = require('exceljs');

// let output = { row: -1, column: -1 };

async function writeExcel(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');

  const output = await readExcel(worksheet, searchText, change);

  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });
  return output;
}

// writeExcel('Mango', '350', { rowChange: 0, colChange: 2 }, '/Users/elenabrd/Downloads/excel-download.xlsx');

test.skip('Upload download excel validation', async ({ page }) => {
  const textSearch = 'Mango';
  const updatedValue = '350';
  await page.goto('https://rahulshettyacademy.com/upload-download-test/');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download' }).click();
  await downloadPromise;
  writeExcel('Mango', '350', { rowChange: 0, colChange: 2 }, '/Users/elenabrd/Downloads/download.xlsx');
  await page.locator('#fileinput').click();
  await page.locator('#fileinput').setInputFiles('/Users/elenabrd/Downloads/download.xlsx');
  //   await page.screenshot({ path: 'updated-download-file.png' });
  const textLocator = page.getByText(textSearch);
  const desiredRow = page.getByRole('row').filter({ has: textLocator });
  await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updatedValue);
});
