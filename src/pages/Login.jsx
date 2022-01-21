import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import img from '../images/login.png'
import {Link} from "react-router-dom"
import axios from 'axios' 
import { backend } from '../backend'
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
width: 100vw;
height: 100vh;
background:  linear-gradient(                  
            rgba(255,255,255,0.5),         
            rgba(255,255,255,0.5)
            ),                           // Linear gradient to apply opacity to the background-image.
            /* url(${img}); */
            url('https://cdn.shopify.com/s/files/1/0972/9458/articles/Outdoor_movie_1024x1024.jpg?v=1533094315'); 
background-size: cover; 
background-repeat: no-repeat;
overflow: hidden;
display: flex;
align-items: center;
justify-content: center;
`
const Wrapper = styled.div`
padding: 20px;
width: 25%;
background-color: white;
border-radius: 10px;
${mobile({ width: "80%",})}

`
const Title = styled.h1`
font-size: 24px;
font-weight: 300;
margin-left: 36%;
`

const Form = styled.form`
display: flex;
flex-direction: column;
`

const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 8px 0px ;
padding: 10px;
`

const Button = styled.button`
width: 100%;   //40% means 40% of the available space of the parent element
border: none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
/* margin-left: 29%; */
margin-bottom: 10px;
margin-top: 10px;
&:disabled{
    background-color: #dbdbdb;
    color: teal;
    cursor: not-allowed;
}

`
const LINK = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    border: 1px solid red;
    width: 100px;
    cursor: pointer;
`
const Error = styled.span`
    color: red;
    font-size: 15px;
`

const Login = () => {
    const navigate=useNavigate();
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [error,seterror]=useState("")
    const handleClick = async (e)=>{
        e.preventDefault();
        const data={
            email:email,
            password:password
        }
        await axios.post(backend+"/login",data,{withCredentials:true})
        .then(res=>{
            const data=res.data;
            if(data.status) {
                navigate('/home')
                seterror("Logged In")
                console.log("Login","Logged in");}
            else{
                seterror(data.error)
                if(data.error==="Already logged in")
                navigate('/home')
                else console.log("Login",data.error);
            }
            
        }).catch(err=>{
            console.log("Login",err);
        }
        )
        console.log(email,password);
    }
    return (
        <Container>
        <Wrapper>
            <Title>SIGN IN</Title>
            <Form>
                <Input type="email" placeholder="email" onChange={(e)=> setemail(e.target.value)}/>
                <Input type="password" placeholder="password" onChange={(e)=> setpassword(e.target.value)}/>
                <Button onClick={handleClick} >LOGIN</Button>  
                {error.length!==0 && <Error>{error}</Error>} 
                <LINK>Forgot password ?</LINK>
                <LINK style={{"width": "45px"}}> Register </LINK>

            </Form>
        </Wrapper>
    </Container>
    )
}

export default Login
