
class Login extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      emailErr: "dfdfs",
      email: 'dfs',
      password: 'sds',
      formError:'',
      errorClass:''
    }

    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleEmail(e){
    this.setState({
      email: e.target.value,
      formError:'',
      errorClass:''
    })


  }

  handlePassword(e){
    this.setState({
      password: e.target.value,
      formError:'',
      errorClass:''
    })
  }

  handleLogin(e){

    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    fetch('/login',{method:'post',
                        headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({email:email,password:password})
                  })
    .then((response)=>{
      return response.json();
    })
    .then((result)=>{
       if(result.error){
         this.setState({formError:"Email or password is incorrect",errorClass:"alert alert-danger"})
       }else if(result.success){
         window.location.href = "/user/dashboard"
       }
      // window.location.href = "/register/something"
    })
  }
  render(){
    return(

      <div>
        <div className={this.state.errorClass}>
          {this.state.formError}
        </div>
        <form action="" onSubmit={this.handleLogin}>
          <div className="form-group">
            <input type="text" value={this.state.email} onChange={this.handleEmail} placeholder="Your email address"className="form-control"/>
          </div>
          <div className="form-group">
            <input type="password" value={this.state.password} onChange={this.handlePassword} placeholder="Your password" className="form-control"/>
          </div>
          <div className="form-group">
             <input className="form-control bg-primary" onClick={this.handleLogin}  type="submit" value="Login"/>
          </div>
        </form>
        <div>
          <a  className="text-right d-block font-weight-bold" href="">Forgot Password?</a>
        </div>
      </div>

    )
  }
}

ReactDOM.render(<Login/>,document.getElementById('login-form'))
