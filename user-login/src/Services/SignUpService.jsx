import React,{useEffect, useState} from 'react'
import axios from 'axios'
export default function SignUpService(form) 
{
    return  axios.post('http://localhost:8080/create',form)

}
