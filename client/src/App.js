
import './App.css';
import { useState } from "react";
import Axios from 'axios';
import { AppBar,Toolbar,styled } from "@mui/material";

function App() {
  const [name,setName] = useState("");
  const [age,setAge] = useState(0);
  const [country,setCountry] = useState("");
  const [position,setPosition] = useState("");
  const [wage,setWage] = useState(0);
  const [employeedata,setEmployeeData] = useState([]);
  const [newWage, setNewWage] = useState(0);

  const addEmployee = () =>{
      Axios.post("http://localhost:3001/create",{
      name: name,
      age: age,
      country:country,
      position:position,
      wage:wage
    }).then(()=>{
      alert("Employee added successfully");
      setEmployeeData([
        ...employeedata,{name: name,
        age: age,
        country:country,
        position:position,
        wage:wage
      }
    ]);
    })
  }

  const employeeData = () => {
    Axios.get("http://localhost:3001/employee").then((response)=>{
      setEmployeeData(response.data);
    })
  }

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update",{ wage: newWage, id: id }).then(
      (res)=>{
      setEmployeeData(
        employeedata.map((val)=>{
        return val.id === id 
        ? {
            id:val.id, 
            name:val.name, 
            country:val.country, 
            age:val.age, 
            position:val.position,
            wage:newWage,
          } 
          : val;
      })
    );
  }
).then((res)=>{
  alert("Update Successful");
});
};

const deleteEmployee = (id) =>{
  Axios.delete(`http://localhost:3001/delete/${id}`).then((res)=>{
    setEmployeeData(employeedata.splice(id));
  }).then((res)=>{alert("Deleted successfully")});
}

  return (
    <div class="App">
      <AppBar position='static' style={{marginTop:"5pxx"}}>
          <Toolbar style={{
            display:"flex",
            alignContent: "center",
            justifyContent: "center",
            fontFamily:"cursive",
            fontSize:"19px",
            }}>
            Employee CRUD Application
          </Toolbar>
        </AppBar>
      <div class="information" style={{marginTop:"5px"}}>
        <label>Name:</label>
        <input type='text' onChange={(event)=>{setName(event.target.value)}}/>
        <label>Age:</label>
        <input type='number' onChange={(event)=>{setAge(event.target.value)}}/>
        <label>Country:</label>
        <input type="text" onChange={(event)=>{setCountry(event.target.value)}}/>
        <label>Position:</label>
        <input type='text' onChange={(event)=>{setPosition(event.target.value)}}/>
        <label>Wage(year):</label>
        <input type='number' onChange={(event)=>{setWage(event.target.value)}}/>
        <button onClick={addEmployee}>Add Employee</button>
        ---------------------------------------------------------
        <button onClick={employeeData}>Show Employees</button>
        
          {employeedata.map((val,key)=>{
            return (
            <div className="employee">
              <div>
              <h3>name: {val.name}</h3>
              <h3>age: {val.age}</h3>
              <h3>country: {val.country}</h3>
              <h3>position: {val.position}</h3>
              <h3>wage: {val.wage}</h3>
              </div>
              <div>
                <input 
                type='text' 
                placeholder='2000...'
                onChange={(event)=>{
                  setNewWage(event.target.value)
                }}
                />
                <button 
                  onClick={()=>{
                    updateEmployeeWage(val.id)
                  }}
                >
                  Update
                </button>

                <button
                onClick={()=>{deleteEmployee(val.id)}}
                >
                  Delete
                </button>
              </div>
            </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
