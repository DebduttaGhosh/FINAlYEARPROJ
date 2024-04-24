import exportFromJSON from "export-from-json";
export const convertToPDF = (sem, data, year) => {
  const newData = data.filter((x) =>
    year ? x.Current_Year === year : x.Current_Semester === sem
  );
  const fileName = `${sem}-result`;
  const removedNullValues = JSON.parse(
    JSON.stringify(newData, (key, value) => {
      if (value === null || value === undefined) {
        return undefined;
      }

      return value;
    })
  );
  const exportType = "xls";
  exportFromJSON({ data: removedNullValues, fileName, exportType });
};
