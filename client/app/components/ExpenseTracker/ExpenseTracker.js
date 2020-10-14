import React from 'react';

export class ExpenseTracker extends React.Component {
state = {
  expenseName: '',
  expenseDate: '',
  expenseAmount: '',
  expenseCategory: '',
  totalExpense:'',
  inputError: '',
  isLoading: false
}

onTextBoxChange = e => {
  //prevent reset
  //take value from textbox and apply to state
  e.preventDefault();
      this.setState({
          [e.target.name]: e.target.value,
  });
}

expenseInput = e => {
  const {
    expenseName,
    expenseDate,
    expenseAmount,
    expenseCategory,
    inputError
  } = this.state

  this.setState({
    isLoading: true,
  })
//Post request to Backend
fetch('/api/account/expensetracker', { 
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    expneseName: expenseName,
    expenseDate: expenseDate,
    expenseAmount: expenseAmount,
    expenseCategory: expenseCategory
  }), 
}).then(res => res.json())
.then(json => {
  if (json.success) {
    this.setState({
      inputError: json.message, 
      isLoading: false
    })
  } else {
    this.setState({
      signUpError: json.message, 
      isLoading: false,
      expeneseName: '',
      expenseDate: '',
      expenseAmount: '',
    })

  }
});
}


  render(){
    let 
    return(
        <div>
           <div>
    
      <p>Input your Expense</p>
      <input type="text" placeholder ="Input your expense name" value = {expenseName} onChange = {this.onTextBoxChange}/><br/>
      <input type="date" placeholder ="Enter Date" value = {expenseDate} onChange ={this.onTextBoxChange}/><br />
      <input type="number" placeholder ="Enter amount" value = {expenseAmount} onChange ={this.onTextBoxChange}/><br />
      <input type="text" placeholder = "Input Category" value = {expenseCategory} onChange = {this.onTextBoxChange}/><br />
      <button onClick ={this.expenseInput}></button>
      </div>


            
        </div>


    )
    
  }
}