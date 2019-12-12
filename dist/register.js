
class Register extends React.Component{
  constructor(props){
    super(props);

    this.state = {
       firstname: "",
       lastname: "",
       email: "",
       confirmEmail: "",
       password: "",
       confirmPassword: "",
       errorClass:"",
       formError: [
          "firstname",
          "lastname",
          "email",
          "confirmEmail",
          "password",
          "confirmEmail"
       ],
       formErrorMessage:{
         firstname: "Enter firstname",
         lastname: "Enter lastname",
         confirmEmail: "Emails do not match",
         password: "Enter password",
         confirmPassword: "Confirm Password"
       }

    }

    this.handleFirstname = this.handleFirstname.bind(this)
    this.handleLastname = this.handleLastname.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handleConfirmemail = this.handleConfirmemail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleConfirmpassword = this.handleConfirmpassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addToErrors = this.addToErrors.bind(this)
    this.removeFromErrors = this.removeFromErrors.bind(this)

  }

   handleSubmit(e){
      e.preventDefault();
   }

  handleFirstname(e){
    this.setState({
      firstname: e.target.value
    })
    if(this.state.firstname !== ""){
      this.removeFromErrors("firstname",this.state.formError)
      return;
    }
    this.addToErrors("firstname",this.state.formError)
  }

  handleLastname(e){
    this.setState({
      lastname : e.target.value
    })

    if(this.state.lastname !== ""){
      this.removeFromErrors("lastname",this.state.formError)
      return;
    }
    this.addToErrors("lastname",this.state.formError)
  }

  handleEmail(e){
    this.setState({
      email: e.target.value
    })
  }

  handleConfirmemail(e){
    this.setState({
      confirmEmail : e.target.value
    })
    if(this.state.email == this.state.confirmEmail){
      this.removeFromErrors("confirmEmail",this.state.formError)
      return;
    }
    this.addToErrors("confirmEmail",this.state.formError)
  }

  handlePassword(e){
    this.setState({
      password : e.target.value
    })
    if(this.state.password !== ""){
      this.removeFromErrors("password",this.state.formError)
      return;
    }
    this.addToErrors("password",this.state.formError)
  }

  handleConfirmpassword(e){
    this.setState({
      confirmPassword : e.target.value
    })

    if(this.state.password == this.state.confirmPassword){
      this.removeFromErrors("confirmPassword",this.state.formError)
      return;
    }
    this.addToErrors("confirmPassword",this.state.formError)
  }

   addToErrors(errorName,errorContainer){
    if(errorContainer.includes(errorName)){
      return;
    }
   errorContainer.push(errorName);
   return console.log(errorContainer);
  }

   removeFromErrors(errorName,errorContainer){
   if(errorContainer.includes(errorName)){
     var index = errorContainer.indexOf(errorName);
     if (index > -1) {
      errorContainer.splice(index, 1);
     }
     return console.log(errorContainer);
   }
   return;

  }



  render(){
    return(

      <div>
          <div className={this.state.errorClass}>

          </div>
          <form action="">
            <div className="form-group" onSubmit={this.handleSubmit}>
              <input type="text" value={this.firstname} onChange={this.handleFirstname} placeholder="Your firstname" className="form-control"/>
            </div>
            <div className="form-group">
              <input type="text" value={this.lastname}  onChange={this.handleLastname} placeholder="Your lastname" className="form-control"/>
            </div>
            <div className="form-group">
              <input type="email" value={this.email}  onChange={this.handleEmail} placeholder="Your email address" className="form-control"/>
            </div>
            <div className="form-group">
              <input type="email" value={this.confirmEmail}  onChange={this.handleConfirmemail} placeholder="Confirm your email" className="form-control"/>
            </div>

            <div className="form-group">
              <input type="password" value={this.password} onChange={this.handlePassword} placeholder="Your password" className="form-control"/>
            </div>
            <div className="form-group">
              <input type="password" value={this.confirmPassword}  onChange={this.handleConfirmpassword} placeholder="Re-enter password" className="form-control"/>
            </div>
            <div className="form-group">
               <input className="form-control bg-primary" onClick={this.handleSubmit} type="submit" value="Register"/>
            </div>
          </form>
      <div>
        <a  className="text-right d-block font-weight-bold" href="">Forgot Password?</a>
      </div>
      </div>

    )
  }
}

ReactDOM.render(<Register/>,document.getElementById('register-form'))
