import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../http/index";
import { convertToPDF } from "../util/util";

export default function Year2() {
  let { year } = useParams();
  let i = 1;
  let j = 2;
  const [data, setData] = useState([]);

  useEffect(() => {
    // Define a function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(URL + "/api/students/");
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

  console.log(data);
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-5 mt-10">Year {year} Data</h1>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => convertToPDF("6", data, (year = "2"))}
      >
        Convert to XLS
      </button>
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
            {/* <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">SGPA 3</th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">SGPA 4</th> */}
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
              Action
            </th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {data
            .filter((item) => item.Current_Year === "2")
            // .sort((a, b) => {
            //     const avgA = (a.SGPA_1 + a.SGPA_2 + a.SGPA_3 + a.SGPA_4) / 4;
            //     const avgB = (b.SGPA_1 + b.SGPA_2 + b.SGPA_3 + b.SGPA_4) / 4;
            //     return avgB - avgA; // Sort in descending order
            // })
            .sort((a, b) => {
              const avgA = (a.SGPA_1 + a.SGPA_2) / 2;
              const avgB = (b.SGPA_1 + b.SGPA_2) / 2;
              return avgB - avgA; // Sort in descending order
            })
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
                {/* <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">{item.SGPA_3}</td>
            <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">{item.SGPA_4}</td> */}
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {item.Active_Backlog}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {(item.SGPA_1 + item.SGPA_2) / 2}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                  {((item.SGPA_1 + item.SGPA_2) / 2) * 10} %
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
