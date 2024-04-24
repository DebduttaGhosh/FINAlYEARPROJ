import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../http/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { convertToPDF } from "../util/util";

export default function Year4() {
  let { year } = useParams();

  let i = 1;
  let j = 1;

  const [subject, setSubject] = useState([{ one: "", two: "" }]);

  const [data, setData] = useState([]);

  useEffect(() => {
    // Define a function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(URL + "/api/students/");
        response.data = response.data
          .map((item, index) => {
            // Calculate percentage
            let percentage = 0;
            if (item.Current_Semester === "5") {
              percentage = (
                ((item.SGPA_1 + item.SGPA_2 + item.SGPA_3) / 3) *
                10
              ).toFixed(2);
            } else {
              percentage = (
                ((item.SGPA_1 + item.SGPA_2 + item.SGPA_3 + item.SGPA_4) / 4) *
                10
              ).toFixed(2);
            }

            return {
              ...item,
              percentage: percentage,
            };
          })
          .sort((a, b) => b.percentage - a.percentage); // Sort in descending order by percentage

        setData(response.data); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetch function when the component mounts
    fetchData();

    // Cleanup function (optional)
    return () => {
      // Any cleanup code if needed
    };
  }, []); // Empty dependency array means this effect runs only once, on mount

  const handleSaveSubjects = async (id, sub1, sub2) => {
    try {
      // Use state variables for subject1 and subject2
      console.log(sub1, sub2);
      await axios.put(`${URL}/api/students/updateSubjects/${id}`, {
        Subject1: sub1,
        Subject2: sub2,
      });
      toast.success("Subjects updated successfully");
    } catch (error) {
      console.error("Error updating subjects:", error);
      toast.error("Error updating subjects");
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${URL}/api/students/${_id}`);
      // Update the state by removing the deleted student
      setData(data.filter((item) => item._id !== _id));
      console.log("Student deleted successfully");
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <ToastContainer />

      <h1 className="text-3xl font-bold mb-5 mt-10">Year {year} Data</h1>

      <div className="mb-2 mt-10 flex">
        <Link
          to={"/add/" + year}
          className="w-44  cursor-pointer flex items-center justify-center text-white font-semibold   bg-green-200 rounded-md shadow-lg p-2 transform transition-transform duration-300 hover:scale-105"
        >
          <p>Add Student</p>
        </Link>
      </div>

      <div className="mb-10 flex">
        <Link
          to={"/search"}
          className="w-44  cursor-pointer flex items-center justify-center text- font-semibold   bg-yellow-200 rounded-md shadow-lg p-2 transform transition-transform duration-300 hover:scale-105"
        >
          <p>Search</p>
        </Link>
      </div>

      <div className="text-xl font-semibold mb-2">5th Semester</div>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => convertToPDF("5", data)}
      >
        Convert to XLS
      </button>
      <table className="min-w-full border-collapse border border-gray-300">
        {/* Table Header */}
        <thead>
          <tr className="font-bold">
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              Serial
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              Roll
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              Sem
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              SGPA 1
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              SGPA 2
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              SGPA 3
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              Active Backlog
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              Average
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              Percentage
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              Subject
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              Action
            </th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {data
            .filter((item) => item.Current_Semester === "5")
            .map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {j++}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {item.Name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {item.Roll}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {item.Current_Semester}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {item.SGPA_1}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {item.SGPA_2}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {item.SGPA_3}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {item.Active_Backlog}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {((item.SGPA_1 + item.SGPA_2 + item.SGPA_3) / 3).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {item.percentage} %
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  <div>
                    <input
                      defaultValue={item.Subject1}
                      onChange={(e) =>
                        setData((prev) => {
                          const idx = prev.findIndex((i) => i._id === item._id);
                          const object = Object.assign({}, prev[idx], {
                            Subject1: e.target.value,
                          });
                          return [
                            ...prev.slice(0, idx), // keep items before
                            object, // replace the
                            ...prev.slice(idx + 1),
                          ];
                        })
                      }
                      placeholder="Enter subject"
                      className="bg-yellow-200 -md shadow-lg mb-1 px-1"
                    ></input>
                    <input
                      defaultValue={item.Subject2}
                      onChange={(e) =>
                        setData((prev) => {
                          const idx = prev.findIndex((i) => i._id === item._id);
                          const object = Object.assign({}, prev[idx], {
                            Subject2: e.target.value,
                          });
                          return [
                            ...prev.slice(0, idx), // keep items before
                            object, // replace the
                            ...prev.slice(idx + 1),
                          ];
                        })
                      }
                      placeholder="Enter subject"
                      className="bg-yellow-200 -md shadow-lg mb-2 px-1 "
                    ></input>
                    <div
                      onClick={() =>
                        handleSaveSubjects(
                          item._id,
                          item.Subject1,
                          item.Subject2
                        )
                      }
                      className="bg-green-500 w-20 text-white -lg cursor-pointer px-3"
                    >
                      {" "}
                      Save{" "}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  <div
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 w-20 cursor-pointer"
                  >
                    Delete
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="my-10"></div>

      <div className="text-xl font-semibold mb-2">6th Semester</div>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => convertToPDF("6", data)}
      >
        Convert to XLS
      </button>
      <table className="min-w-full border-collapse border border-gray-300">
        {/* Table Header */}
        <thead>
          <tr className="font-bold">
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              Serial
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              Roll
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              Sem
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              SGPA 1
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              SGPA 2
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              SGPA 3
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              SGPA 4
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              Active Backlog
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              Average
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              Percentage
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              Subject
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              Action
            </th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {data
            .filter((item) => item.Current_Semester === "6")
            .map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {i++}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {item.Name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {item.Roll}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {item.Current_Semester}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {item.SGPA_1}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {item.SGPA_2}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {item.SGPA_3}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {item.SGPA_4}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {item.Active_Backlog}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {(
                    (item.SGPA_1 + item.SGPA_2 + item.SGPA_3 + item.SGPA_4) /
                    4
                  ).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {item.percentage} %
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  <div>
                    <input
                      defaultValue={item.Subject1}
                      onChange={(e) =>
                        setData((prev) => {
                          const idx = prev.findIndex((i) => i._id === item._id);
                          const object = Object.assign({}, prev[idx], {
                            Subject1: e.target.value,
                          });
                          return [
                            ...prev.slice(0, idx), // keep items before
                            object, // replace the
                            ...prev.slice(idx + 1),
                          ];
                        })
                      }
                      placeholder="Enter subject"
                      className="bg-yellow-200 -md shadow-lg mb-1 px-1"
                    ></input>
                    <input
                      defaultValue={item.Subject2}
                      onChange={(e) =>
                        setData((prev) => {
                          const idx = prev.findIndex((i) => i._id === item._id);
                          const object = Object.assign({}, prev[idx], {
                            Subject2: e.target.value,
                          });
                          return [
                            ...prev.slice(0, idx), // keep items before
                            object, // replace the
                            ...prev.slice(idx + 1),
                          ];
                        })
                      }
                      placeholder="Enter subject"
                      className="bg-yellow-200 -md shadow-lg mb-2 px-1 "
                    ></input>
                    <div
                      onClick={() =>
                        handleSaveSubjects(
                          item._id,
                          item.Subject1,
                          item.Subject2
                        )
                      }
                      className="bg-green-500 w-20 text-white -lg cursor-pointer px-3"
                    >
                      {" "}
                      Save{" "}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  <div
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 w-20 cursor-pointer"
                  >
                    Delete
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
