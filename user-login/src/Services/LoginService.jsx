import axios from 'axios';

class LoginService
{
    static async checkEmail(email)
    {
    let BASE_URL = `http://localhost:8080/fetch-email/${email}`;
    return axios.get(BASE_URL);
    }

    static login(email,pwd)
    {
        let Base_Url = "http://localhost:8080/login"
        return axios.post(Base_Url,{
            userName:email,
            password: pwd
        })
    }

    static resetPassword(email,pwd)
    {
       let BASE_URL = "http://localhost:8080/save-password"
        
       return axios.post(BASE_URL,{
        email :email,
        password:pwd
       })

    }

    static sendEmail(email)
    {
        console.log(email)
       let BASE_URL = `http://localhost:8080/send-email/${email}`
        return axios.post(BASE_URL)
    }

    static unLock(data)
    {
        console.log(data)
        return axios.get(`http://localhost:8080/un-lock/${data}`)
        
    }
    
}
export default LoginService