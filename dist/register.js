
class Register extends React.Component{
  constructor(props){
    super(props);

    this.state = {
       firstname: "",
       lastname: "",
       email: "",
       confirmEmail: "",
       password: null,
       confirmPassword: null,
       errorClass:"",
       errorMessage:"",
       formErrorMessage:{
         firstname: "Enter firstname",
         lastname: "Enter lastname",
         confirmEmail: "Emails do not match",
         email:"Please enter a valid email",
         password: "Enter password",
         confirmPassword: "Passwords do not match"
       }

    }

    this.handleFirstname = this.handleFirstname.bind(this)
    this.handleLastname = this.handleLastname.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handleConfirmemail = this.handleConfirmemail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleConfirmpassword = this.handleConfirmpassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.isEmpty = this.isEmpty.bind(this)
    this.isEmail = this.isEmail.bind(this)

  }

   handleSubmit(e){
     e.preventDefault();
     const formErrors = this.state.formError;



      if(this.isEmpty(this.state.firstname)){
        this.setState({errorClass:"alert alert-danger",errorMessage:this.state.formErrorMessage["firstname"]})
     }

     else if(this.isEmpty(this.state.lastname)){
        this.setState({errorClass:"alert alert-danger",errorMessage:this.state.formErrorMessage["lastname"]})
     }

     else if(!this.isEmail(this.state.email)){
        this.setState({errorClass:"alert alert-danger",errorMessage:this.state.formErrorMessage["email"]})
     }

     else if(this.state.email != this.state.confirmEmail){
        this.setState({errorClass:"alert alert-danger",errorMessage:this.state.formErrorMessage["confirmEmail"]})
     }

     else if(this.isEmpty(this.state.password)){
        this.setState({errorClass:"alert alert-danger",errorMessage:this.state.formErrorMessage["password"]})
     }

     else if(this.state.password !== this.state.confirmPassword){
        this.setState({errorClass:"alert alert-danger",errorMessage:this.state.formErrorMessage["confirmPassword"]})
     }

     else{
       const firstname = this.state.firstname;
       const lastname = this.state.lastname;
       const email = this.state.email;
       const password = this.state.password;
      fetch('/register',{method:'post',
                          headers: {
                      'Content-Type': 'application/json'
                      // 'Content-Type': 'application/x-www-form-urlencoded',
                      },
                      body: JSON.stringify({firstname:firstname,lastname:lastname,email:email,password:password})
                    })
      .then((response)=>{
        return response.json();
      })
      .then((result)=>{
         if(result.error){
           console.log(result)
           this.setState({errorClass:"alert alert-danger",errorMessage:result.error})
         }else if(result.success){
           window.location.href = "/user/dashboard"
         }
        // window.location.href = "/register/something"
      })
     }



   }//handleSubmit

  handleFirstname(e){
    this.setState({
      firstname: e.target.value
    })
  }

  handleLastname(e){
    this.setState({
      lastname : e.target.value
    })


  }

  handleEmail(e){


    this.setState({
      email: e.target.value
    })

    if(isEmail(this.state.email)){
      this.removeFromErrors("email",this.state.formError)
    }else{
      this.addToErrors("email",this.state.formError)
    }

  }

  handleConfirmemail(e){
    this.setState({
      confirmEmail : e.target.value
    })

  }

  handlePassword(e){


    this.setState({
      password : e.target.value
    })
  }

  handleConfirmpassword(e){
    this.setState({
      confirmPassword : e.target.value
    })
  }





   isEmpty(fieldVal){
   if(!fieldVal){
     return true
   }else{
     return false;
   }
  }


   isEmail(email)
  {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  }




  render(){
    return(

      <div>
          <div className={this.state.errorClass}>
              {this.state.errorMessage}
          </div>
          <form action=""  onSubmit={this.handleSubmit}>
            <div className="form-group" >
              <input type="text" autoComplete="off"  value={this.firstname} onChange={this.handleFirstname} placeholder="Your firstname" className="form-control"/>
            </div>
            <div className="form-group">
              <input type="text" autoComplete="off"  value={this.lastname}  onChange={this.handleLastname} placeholder="Your lastname" className="form-control"/>
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
