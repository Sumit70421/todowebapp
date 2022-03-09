import React from 'react';
import axios from 'axios';
import './css/app.css'
import TodoCard from './componenet/todoCard';
import Heading from './componenet/header';
export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      list : [],
      newInput : "",
      id : 51
    }
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/todos`)
      .then(res => {
        const chunk = res.data;
        var first = chunk.filter((item, idx) => idx <50)
        this.setState({list : first});
        // console.log(this.state.list);
      })
      
  }
  renderTodo(input){
    let newTodo = {
          "userId": 100001,
          "id": this.setState({id : this.state.id+1}),
          "title": input,
          "completed": false
    }
    this.state.list.unshift(newTodo);
  }
  render() {
    return (
      <>
        <Heading title="TO DO List"/>
        <div className='takeInp'><input type='text' placeholder='Enter the task here' id="inputField"/> <button className='Submit' onClick={()=>{
          let input = document.querySelector('#inputField').value;
          this.renderTodo(input);
          this.setState({newInput : input});
          axios.post('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify({
          "userId": 100001,
          "id": this.setState({id : this.state.id+1}),
          "title": this.state.newInput,
          "completed": false
      }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then(function (response) {
        console.log(response);
        alert('Task Added Successful');
      })
      .catch(function (error) {
        console.log(error);
      });}}>Submit</button></div>
        <p className='subtitle'>Added task in the list</p>
        <ul className='TitleList'>
        {
          this.state.list
            .map(person =>
              <li key={person.id}><TodoCard list={person}/></li>
            )
        }
        
      </ul>
      </>
     
    )
  }
}
