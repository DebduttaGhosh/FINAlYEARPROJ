import exportFromJSON from "export-from-json";
export const convertToPDF = (sem, data, year) => {
  let newData = data.filter((x) =>
    year ? x.Current_Year === year : x.Current_Semester === sem
  );

  const fileName = `${sem}-result`;
  let removedNullValues = JSON.parse(
    JSON.stringify(newData, (key, value) => {
      if (value === null || value === undefined) {
        return undefined;
      }

      return value;
    })
  );
  console.log(removedNullValues);
  removedNullValues = removedNullValues.map((i) => {
    delete i._id;
    return i;
  });
  const exportType = "xls";
  exportFromJSON({ data: removedNullValues, fileName, exportType });
};
