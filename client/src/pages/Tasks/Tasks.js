import React, { Component } from "react";
import Card from "../../components/Card";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Tasks extends Component {
  // Setting our component's initial state
  state = {
    tasks: [],
    name: "",
    weight: "",
    assignedTo: "",
    dueDate: "",
    completed: ""
  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadTasks();
  }

  // Loads all tasks  and sets them to this.state.tasks
  loadTasks = () => {
    API.getTasks()
      .then(res =>
        this.setState({ tasks: res.data, name: "", weight: "", assignedTo: "", dueDate: "", completed: "" })
      )
      .catch(err => console.log(err));
  };

  // Deletes a task from the database with a given id, then reloads books from the db
  deleteTask = id => {
    API.deleteTask(id)
      .then(res => this.loadTasks())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveTask method to save the task data
  // Then reload tasks from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name) {
      API.saveTask({
        name: this.state.name,
        weight: this.state.weight,
        assignedTo: this.state.assignedTo,
        dueDate: this.state.dueDate,
        completed: this.state.completed
      })
        .then(res => this.loadTasks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          {/* <Col size="md-6"> */}
            {/* <form>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Title (required)"
              />
              <FormBtn
                disabled={!(this.state.name)}
                onClick={this.handleFormSubmit}
              >
                Submit Task
              </FormBtn>
            </form> */}
          {/* </Col> */}
          <Col size="md-2 sm-4">
            <Card>
            {this.state.tasks.length ? (
              <List>
                {this.state.tasks.map(task => {
                  return (
                    <ListItem key={task._id}>
                      <a href={"/tasks/" + task._id}>
                        <strong>
                          {task.name} due {task.dueDate}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteBook(task._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Tasks;
