import React from "react";
import "./App.css";

class Employee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastname: "",
      firstname: "",
      email: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = e => {
    e.preventDefault();

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    };

    const url = "http://campus-bordeaux.ovh:3001/api/quests/employees/";
    if (
      this.state.firstname === "" ||
      this.state.email === "" ||
      this.state.lastname === ""
    ) {
      alert("Please fill all the fields :)!");
    } else {
      fetch(url, config)
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            alert(res.error);
          } else {
            alert(`Added employee with the ID ${res}!`);
          }
        })
        .catch(e => {
          console.error(e);
          alert("Error during l'an employee addition");
        });
      this.setState({
        firstname: "",
        lastname: "",
        email: ""
      });
    }
  };

  render() {
    return (
      <div className="FormEmployee">
        <h1> employee’s entry</h1>

        <form onSubmit={this.submitForm}>
          <fieldset>
            <legend>Information</legend>
            <div className="form-data">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                onChange={this.onChange}
                value={this.state.lastname}
                required
              />
            </div>

            <div className="form-data">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                onChange={this.onChange}
                value={this.state.firstname}
                required
              />
            </div>

            <div className="form-data">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={this.onChange}
                value={this.state.email}
              />
            </div>
            <hr />
            <div className="form-data">
              <input type="submit" value="Send" />
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
export default Employee;
