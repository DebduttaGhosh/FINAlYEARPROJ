import exportFromJSON from "export-from-json";
export const convertToPDF = (sem, data, year) => {
  let newData = data.filter((x) =>
    year ? x.Current_Year === year : x.Current_Semester === sem
  );

  newData = newData.map((data) => {
    let count = 0;
    let sum = 0;
    if (data.SGPA_1) {
      sum += data.SGPA_1;
      count++;
    }
    if (data.SGPA_2) {
      sum += data.SGPA_2;
      count++;
    }
    if (data.SGPA_3) {
      sum += data.SGPA_3;
      count++;
    }
    if (data.SGPA_4) {
      sum += data.SGPA_4;
      count++;
    }
    if (data.SGPA_5) {
      sum += data.SGPA_5;
      count++;
    }
    if (data.SGPA_6) {
      sum += data.SGPA_6;
      count++;
    }
    if (data.SGPA_7) {
      sum += data.SGPA_7;
      count++;
    }
    if (data.SGPA_8) {
      sum += data.SGPA_8;
      count++;
    }
    return { ...data, Average: (sum / count).toFixed(2) };
  });
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
  removedNullValues = removedNullValues.map((i, idx) => {
    delete i.Serial;
    delete i._id;
    delete i.Active_Backlog;
    delete i.Backlog_Subject;
    delete i.__v;
    return { Serial: idx + 1, ...i };
  });
  const exportType = "xls";
  exportFromJSON({ data: removedNullValues, fileName, exportType });
};

export const calc = (data) => {
  let count = 0;
  let sum = 0;
  if (data.SGPA_1) {
    sum += data.SGPA_1;
    count++;
  }
  if (data.SGPA_2) {
    sum += data.SGPA_2;
    count++;
  }
  if (data.SGPA_3) {
    sum += data.SGPA_3;
    count++;
  }
  if (data.SGPA_4) {
    sum += data.SGPA_4;
    count++;
  }
  if (data.SGPA_5) {
    sum += data.SGPA_5;
    count++;
  }
  if (data.SGPA_6) {
    sum += data.SGPA_6;
    count++;
  }
  if (data.SGPA_7) {
    sum += data.SGPA_7;
    count++;
  }
  if (data.SGPA_8) {
    sum += data.SGPA_8;
    count++;
  }

  return {
    average: (sum / count).toFixed(2),
    percentage: ((sum / count) * 10).toFixed(2),
  };
};
