from openpyxl import Workbook
wb=Workbook()
ws=wb.active
ws['A1']='Test BRSR excel'
wb.save('tmp_test.xlsx')
print('tmp_test.xlsx created')
