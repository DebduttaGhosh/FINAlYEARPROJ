import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {URL} from '../http/index'
import axios from 'axios'

export default function Add() {

  const [res, setRes] = useState(null);

  const [studentData, setStudentData] = useState({
    Serial: '',
    Name: '',
    Current_Year: '',
    Current_Semester: '',
    Roll: '',
    SGPA_1: '',
    SGPA_2: '',
    SGPA_3: '',
    SGPA_4: '',
    SGPA_5: '',
    SGPA_6: '',
    SGPA_7: '',
    SGPA_8: '',
    Active_Backlog: '',
    Backlog_Subject: 'No',
  });


  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}/api/students/save`, studentData);
      if(response){
        setRes(response);
      } // Assuming backend sends a response
      toast.success('Saved successfully 👌');

    } catch (error) {
      console.error(error);
      toast.error('Something went wrong 😕');
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  console.log(studentData)
  return (
    <div>
      <ToastContainer />
      <div className="overflow-y-scroll">
        <div className="mt-10 bg--200 flex flex-col items-center justify-center mb-10 text-2xl font-semibold">
          <p> Add Student Data </p>
        </div>
      
        <div className="bg--200 flex flex-col items-center justify-center mb-">
          <p className="text-xl mb-2 pt-2 mr-3"> Serial: </p>
          <input
            className="w-52 h-10 bg-blue-200 text-xl px-3 shadow-lg"
            type="text"
            name="Serial"
            onChange={handleInputChange}
          />
        </div>


        <div className="bg--200 flex flex-col items-center justify-center mb-">
          <p className="text-xl mb-2 pt-2 mr-3"> Name: </p>
          <input
            className="w-52 h-10 bg-blue-200 text-xl px-3 shadow-lg"
            type="text"
            name="Name"
            onChange={handleInputChange}
          />
        </div>

        <div className="bg--200 flex flex-col items-center justify-center">
          <p className="text-xl mb-2 pt-2 mr-3"> Roll No: </p>
          <input
            className="w-52 h-10 bg-blue-200 text-xl px-3 shadow-lg"
            type="text"
            name="Roll"
            onChange={handleInputChange}
          />
        </div>

        <div className="bg--200 flex flex-col items-center justify-center">
          <p className="text-xl mb-2 pt-2 mr-3"> Year: </p>
          <input
            className="w-52 h-10 bg-blue-200 text-xl px-3 shadow-lg"
            type="text"
            name="Current_Year"
            onChange={handleInputChange}
          />
        </div>

        <div className="bg--200 flex flex-col items-center justify-center">
          <p className="text-xl mb-2 pt-2 mr-3"> Semester: </p>
          <input
            className="w-52 h-10 bg-blue-200 text-xl px-3 shadow-lg"
            type="text"
            name="Current_Semester"
            onChange={handleInputChange}
          />
        </div>

        {(studentData.Current_Year == 1 || studentData.Current_Year == 2 || studentData.Current_Year == 3 || studentData.Current_Year == 4) && (
          <>
          <div className="bg--200 flex flex-col items-center justify-center">
            <p className="text-xl mb-2 pt-2 mr-3"> 1st Semester: </p>
            <input
              className="w-52 h-10 bg-blue-200 text-xl px-3 shadow-lg"
              type="text"
              name="SGPA_1"
              onChange={handleInputChange}
            />
          </div>

          <div className="bg--200 flex flex-col items-center justify-center">
          <p className="text-xl mb-2 pt-2 mr-3"> 2nd Semester: </p>
          <input
            className="w-52 h-10 bg-blue-200 text-xl px-3 shadow-lg"
            type="text"
            name="SGPA_2"
            onChange={handleInputChange} 
          />
          </div>
          </>
        )}

        {(studentData.Current_Year == 2 || studentData.Current_Year == 3 || studentData.Current_Year == 4) && (
         
         <>
         <div className="bg--200 flex flex-col items-center justify-center">
            <p className="text-xl mb-2 pt-2 mr-3"> 3rd Semester: </p>
            <input
              className="w-52 h-10 bg-blue-200 text-xl px-3 shadow-lg"
              type="text"
              name="SGPA_3"
              onChange={handleInputChange}
            />
          </div>

          <div className="bg--200 flex flex-col items-center justify-center">
          <p className="text-xl mb-2 pt-2 mr-3"> 4th Semester: </p>
          <input
            className="w-52 h-10 bg-blue-200 text-xl px-3 shadow-lg"
            type="text"
            name="SGPA_4"
            onChange={handleInputChange}
          />
          </div>
          </>
        )}

        {( studentData.Current_Year == 3 || studentData.Current_Year == 4) && (
                
                <>
                <div className="bg--200 flex flex-col items-center justify-center">
                    <p className="text-xl mb-2 pt-2 mr-3"> 5th Semester: </p>
                    <input
                      className="w-52 h-10 bg-blue-200 text-xl px-3 shadow-lg"
                      type="text"
                      name="SGPA_5"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="bg--200 flex flex-col items-center justify-center">
                  <p className="text-xl mb-2 pt-2 mr-3"> 6th Semester: </p>
                  <input
                    className="w-52 h-10 bg-blue-200 text-xl px-3 shadow-lg"
                    type="text"
                    name="SGPA_6"
                    onChange={handleInputChange}
                  />
                  </div>
                  </>
          )}


          {( studentData.Current_Year == 4) && (
                
                <>
                <div className="bg--200 flex flex-col items-center justify-center">
                    <p className="text-xl mb-2 pt-2 mr-3"> 7th Semester: </p>
                    <input
                      className="w-52 h-10 bg-blue-200 text-xl px-3 shadow-lg"
                      type="text"
                      name="SGPA_7"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="bg--200 flex flex-col items-center justify-center">
                  <p className="text-xl mb-2 pt-2 mr-3"> 8th Semester: </p>
                  <input
                    className="w-52 h-10 bg-blue-200 text-xl px-3 shadow-lg"
                    type="text"
                    name="SGPA_8"
                    onChange={handleInputChange}
                  />
                  </div>
                  </>
          )}  

        <div className="bg--200 flex flex-col items-center justify-center mb-10">
          <p className="text-xl mb-2 pt-2 mr-3"> Active Backlog: </p>
          <input
            className="w-52 h-10 bg-blue-200 text-xl px-3 shadow-lg"
            type="text"
            name="Active_Backlog"
            onChange={handleInputChange}
          />
        </div>

        <div className="bg--200 flex flex-col items-center justify-center mb-10">
          <button onClick={submitHandler} className="w-82 h-10 bg-yellow-500 flex items-center justify-center text-white rounded-sm cursor-pointer"><p className="px-4"> Submit </p></button>
          
        </div>

        <div className="bg--200 flex flex-col items-center justify-center mb-10">
          <p> {res != null && 'Saved Successfully'}</p>
        </div>

      </div>
    </div>
  );
}
