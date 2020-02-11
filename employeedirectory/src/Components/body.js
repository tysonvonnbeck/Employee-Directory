
import React from "react";
import Wrapper from "../Components/wrapper";
import EmployeeCard from "./card"
import API from "../utils/API";
import Moment from 'react-moment';


class Body extends React.Component {

  state = {
    peoples: [],
    search: "",
    results:[],
    filter: ""
  };
  
  handleInputChange = event => {
    console.log("inputChange");
    event.preventDefault();
    this.setState({filter: event.target.value.toLowerCase()})
    // this.results2People()
  }

  // results2People = () => {
  //   let peoples = [...this.state.results];
  //   console.log("Hello " + this.state.filter);
  //   if(this.state.filter > ""){
  //     let filter = this.state.filter;
  //     peoples = peoples.filter(person => {
  //       let name = person.name.first.toLowerCase();
  //       return name.startsWith(filter);
  //     })
  //   }
  //   if (this.state.sorted){
  //     peoples.sort( (a,b) => {
  //       a = a.name.first.toLowerCase()+" "+ a.name.last.toLowerCase();
  //       b = b.name.first.toLowerCase()+" "+ b.name.last.toLowerCase();
  //       return (a > b ? 1 : (b > a ? -1 : 0));
  //     })
  //   }
  // //  this.setState({peoples: peoples})
  //  return peoples;
  // } 


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
          <span onChange={this.handleInputChange} className="input-group"><input type="text" className="form-control" /> 
          <button className="btn input-group-btn btn-primary" id="search"> Search </button> </span>
          <hr/>
          {this.state.peoples.map((peoples, key) => (
              // return (
               
                <div className="container" >
                  <table className="table table-striped">
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
              
          ))
          }
        </Wrapper>
      </div>
    )
  }
}
export default Body;

