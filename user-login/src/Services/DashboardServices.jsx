import axios from 'axios'
import React from 'react'

export default class DashboardServices
{
  static fetchAllUsers(userId)
  {
    return axios.get(`http://localhost:8080/fetch-all/${userId}`)
  }

  static updateUser(data)
  {
    console.log(data)
    return axios.put("http://localhost:8080/update-user",data)
  }

  static deleteUser(data)
  {console.log(data)
    return axios.delete(`http://localhost:8080/delete-user/${data}`)
  }
}
