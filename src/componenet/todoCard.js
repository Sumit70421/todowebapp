import axios from 'axios';
import React from 'react'
import './../css/todoCard.css'

export default function TodoCard(props) {
  function deleteData(thing,id){
    axios.delete('https://jsonplaceholder.typicode.com/todos/'+id,{
      method: 'DELETE',
    })
    alert('Deleted');
    let button = document.querySelector('#'+thing);
    let parent = button.parentElement.parentElement;
    parent.classList.add('visible');
  }
    function markClick(thing,id){
        let button = document.querySelector('#'+thing);
        let parent = button.parentElement.parentElement;
        console.log(parent);
        if (button.innerHTML === "Mark as Completed") {
            button.innerHTML = "Mark as incomplete";
            parent.classList.add('checkedTask');
            parent.classList.remove('Card');
            button.classList.add('marked');
            button.classList.remove('Mark')
            axios.patch(`https://jsonplaceholder.typicode.com/todos/`+id,{
              method: 'PATCH',
              body: {'completed' : true},
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            })
              .then((response) => console.log(response.data));
          } else {
            button.innerHTML = "Mark as Completed";
            parent.classList.remove('checkedTask');
            parent.classList.add('Card');
            button.classList.add('Mark');
            button.classList.remove('marked')
            axios.patch(`https://jsonplaceholder.typicode.com/todos/`+id,{
              method: 'PATCH',
              body: {'completed' : false},
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            })
            .then((response) => console.log(response.data));
          }
    }
  return (
    <div className='Card'>
        <div className='index'>{props.list.id}</div>
        <div className='title'>{props.list.title}</div>
        <hr className='divLine' />
        <div className='buttons'>
            <button className='Mark' id={'mark'+props.list.id} onClick={()=>{markClick('mark'+props.list.id,props.list.id)}}>Mark as Completed</button> 
            <button className='Delete' onClick={()=>{deleteData('mark'+props.list.id,props.list.id)}}>Delete</button>    
        </div>
    </div>
  )
}


