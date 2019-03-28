import React from 'react';
import './App.css';
import axios from 'axios';
import Inputs from './components/smsinput';

class Send extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      clientName: '',
      email: '',
      message:'',
      number: '',
      smsContent: ''
    }
  }
  resetForm(){
    document.getElementById('contact-form').reset();
}

  handleSubmit(){
    const name = this.state.clientName;
    const email = this.state.email;
    const message = this.state.message;
    console.log(name)
    axios.post('/send', {
      name: name,
      email: email,
      message: message
    }).then((response)=>{
        if (response.data.msg === 'success'){
            alert("Message Sent."); 
            this.resetForm()
        }else if(response.data.msg === 'fail'){
            alert("Message failed to send.")
        }
    })
}
handleChange() {
  //eslint-disable-next-line
  this.setState({[event.target.name]: event.target.value});
}
handleSendSms(){
  const number = this.state.number;
  const smsContent = this.state.smsContent;
  axios.post('/text', {
    number,
    smsContent,
  })
  .then(res=>{
    return res.status === 200 ? alert('sms sent successfully') : alert('something went wrong')
  })
}



  render() {
    return (
      <div className="App">
      Send email
      <div classname="email-form">
      name: <input 
              name="clientName" 
              onChange={this.handleChange} />
      email: <input 
              name="email" 
              onChange={this.handleChange} />
      message: <textarea 
              name="message" 
              onChange={this.handleChange} />
    <button type="button" onClick={this.handleSubmit}>Submit</button>
    </div>
    Send a text msg
    {/* <div classname="text-form">
      number: <input 
              name="number" 
              onChange={this.handleChange} />
      smsContent: <textarea 
              name="smsContent" 
              onChange={this.handleChange} />
    <button type="button" onClick={this.handleSendSms.bind(this)}>Submit</button>
    </div> */}
    <Inputs/>
      </div>
    );
  }
}

export default Send;
