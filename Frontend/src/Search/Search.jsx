import React, { useState } from "react";
import axios from "axios";
import { URL } from "../http/index";
import { calc } from "../util/util.js";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        URL + `/api/students/search?name=${searchTerm}`
      );
      setSearchResults(response.data);
      console.log(searchResults);
    } catch (error) {
      console.error("Error searching for students:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(URL + `/api/students/${_id}`);
      // Update the state by removing the deleted student
      setSearchResults(searchResults.filter((student) => student._id !== _id));
      console.log("Student deleted successfully");
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-5 mt-10">Search for a Student</h1>

      <div className="mb-2 mt-10 flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-52 h-10 bg-green-200 text-2xl px-2 rounded-l outline-none"
        />
        <div
          onClick={handleSearch}
          className="bg-yellow-200 h-10 w-12 flex items-center justify-center text-2xl cursor-pointer"
        >
          <p>🔍</p>
        </div>
      </div>

      <table className="min-w-full border-collapse border border-gray-300">
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
              SGPA 5
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              SGPA 6
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              SGPA 7
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider border border-gray-300">
              SGPA 8
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
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((student, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                {student.Serial}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                {student.Name}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                {student.Roll}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                {student.Current_Semester}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                {student.SGPA_1}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                {student.SGPA_2 === 0 || student.SGPA_2 === null
                  ? "NA"
                  : student.SGPA_2}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                {student.SGPA_3 === 0 || student.SGPA_3 === null
                  ? "NA"
                  : student.SGPA_3}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                {student.SGPA_4 === 0 || student.SGPA_4 === null
                  ? "NA"
                  : student.SGPA_4}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                {student.SGPA_5 === 0 || student.SGPA_5 === null
                  ? "NA"
                  : student.SGPA_5}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                {student.SGPA_6 === 0 || student.SGPA_6 === null
                  ? "NA"
                  : student.SGPA_6}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                {student.SGPA_7 === 0 || student.SGPA_7 === null
                  ? "NA"
                  : student.SGPA_7}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                {student.SGPA_8 === 0 || student.SGPA_8 === null
                  ? "NA"
                  : student.SGPA_8}
              </td>

              <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                {student.Active_Backlog}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                {isNaN(calc(student).average) ? "NA" : calc(student).average}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                {isNaN(calc(student).percentage)
                  ? "NA"
                  : calc(student).percentage}{" "}
                %
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border border-gray-300">
                <div
                  onClick={() => handleDelete(student._id)}
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
