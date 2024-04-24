import exportFromJSON from "export-from-json";
export const convertToPDF = (sem, data, year) => {
  const newData = data.filter((x) =>
    year ? x.Current_Year === year : x.Current_Semester === sem
  );
  const fileName = `${sem}-result`;
  const exportType = "xls";
  exportFromJSON({ data: newData, fileName, exportType });
};
