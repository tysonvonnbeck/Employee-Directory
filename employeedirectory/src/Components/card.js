import React from "react";


function EmployeeCard(props) {
  return (
   <tr>
     <td><img alt={props.name} src={props.image} /></td>
     <td><strong>Name:</strong> {props.firstname}</td>
     <td><strong>Email:</strong> {props.email}</td>
     <td> <strong>DOB:</strong> {props.DOB}</td>
     <td> <span onClick={() => props.removeEmployee(props.id)} className="remove">
          𝘅
      </span> </td>
   </tr>
  );
}

export default EmployeeCard;