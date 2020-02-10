
import React from "react";
import Wrapper from "../Components/wrapper";
import EmployeeCard from "./card"
import API from "../utils/API";
import Moment from 'react-moment';


class Body extends React.Component {

  state = {
    peoples: [],
    search: ""
  };
  
  search(){
    
  }

  componentDidMount() {
    API.search()
      .then(res => {
        this.setState({ peoples: res.data.results })
      })
      .catch(err => console.log(err));
  }

  removeEmployee(id) {
    let newPeoples = this.state.peoples.filter(person => person.id.value !== id);
    console.log(id);
    this.setState({
      peoples: newPeoples
    })
  }

  render() {
    return (
      <div>
        <Wrapper>
          <h1 className="title">Employee Directory</h1>
          <span className="input-group"><input type="text" className="form-control" /> 
          <button className="btn input-group-btn btn-primary" id="search"> Search </button> </span>
          <hr/>
          {
            this.state.peoples.map(peoples => {
              return (

                <div className="container" >
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        {/* <th scope="col">image</th>
                        <th scope="col">name</th>
                        <th scope="col">email</th>
                        <th scope="col">DOB</th>
                        <th scope="col">delete</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <EmployeeCard
                        key={peoples.id.value}
                        firstname={peoples.name.first}
                        name={peoples.name.first + " " + peoples.name.last}
                        image={peoples.picture.thumbnail}
                        email={peoples.email}
                        DOB={<Moment format="MM/DD/YYYY">{peoples.dob.date}</Moment>}
                        id={peoples.id.value}
                        removeEmployee={() => this.removeEmployee(peoples.id.value)}
                      />
                    </tbody>
                  </table>
                </div>
              )
            })
          }
        </Wrapper>
      </div>
    )
  }
}
export default Body;

