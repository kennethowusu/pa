
class Login extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      emailErr: "dfdfs",
      email: 'dfs',
      password: 'sds',
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }

  handleLogin(e){
    this.setState({
      email: e.target.value
    })

    if(this.state.email == 'kennethowusu@gmail.com'){
      this.setState({
        emailErr: 'Email already exists'
      })
    }else{
      this.setState({
        emailErr:''
      })
    }
  }

  handlePassword(e){
    this.setState({
      password: e.target.value
    })
  }
  render(){
    return(

      <div className="centered">
            <a  href="/" className="d-flex justify-content-center align-items-center mb-4">
              <img src="/images/logo.png" alt="" className="t"/>
            </a>
            <p className="error text-center" >{this.state.emailErr}</p>
            <form className="" action="" method="post">
              <div className="col-md-4 offset-lg-4 pr-md-5">

                  <div className="form-group">
                    <input type="text" value={this.state.email} onChange={this.handleLogin} className="form-control form" id="email" placeholder="Enter Email"/>
                    <label  className="error emailEmptyErr emailInvalidErr"></label>
                  </div>
                  <div className="form-group">
                    <input type="password"  value={this.state.password} onChange={this.handlePassword} className="form-control form" id="password" placeholder="Enter password"/>
                    <label  className="error passwordEmptyErr"></label>
                  </div>


                  <div className="form-group">
                    <input type="submit" value="Log In" id="loginBtn" className="btn w-100 btn-orange text-white rad-s py-3 px-5"/>
                  </div>

                  <p><a href="#" id="forgotpassword" className="text-muted">Forgot password?</a></p>

                  <div className="form-group">
                    <a href="/register" className="btn w-100 btn-muted text-black rad-s py-3 px-5 no-shadow">Register</a>
                  </div>



              </div>
            </form>
      </div>

    )
  }
}

ReactDOM.render(<Login/>,document.getElementById('login-root'))
