import React,{useState} from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import axios from 'axios' 
import { backend } from '../backend'



const Container = styled.div`
width: 100vw;
height: 100vh;
background:  linear-gradient(                  
            rgba(255,255,255,0.5),         
            rgba(255,255,255,0.5)
            ),                           // Linearr gradient to apply opacity to the background-image.
             url("https://cdn.shopify.com/s/files/1/0972/9458/articles/Outdoor_movie_1024x1024.jpg?v=1533094315") ;
background-size: cover; 
overflow: hidden;

display: flex;
align-items: center;
justify-content: center;
`
const Wrapper = styled.div`
padding: 20px;
width: 40%;
background-color: white;
border-radius: 10px;
${mobile({ width: "80%",})}
`
const Title = styled.h1`
font-size: 24px;
font-weight: 300;

`

const Form = styled.form`
display: flex;
flex-wrap: wrap;
`

const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 20px 10px 0px 0px;
padding: 10px;
`
const Agreement = styled.span`
font-size: 12px;
margin: 20px 0px;
`

const Button = styled.button`
width: 40%;   //40% means 40% of the available space of the parent element
border: none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
margin-left: 29%;
`

const Register = () => {
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [passwordagain, setpasswordagain] = useState("")
    const [error,seterror]=useState("")

    const handleClick=async(e)=>{
        e.preventDefault();
        const data={
            email:email,
            password:password,
            username:username
        }
        await axios.post(backend+"/register",data,{withCredentials:true})
        .then(res=>{
            const data=res.data;
            console.log(data.status)
            if(data.status) {
                seterror("Registered")
                console.log("Login","Logged in");}
            else{
                seterror(data.error)
                console.log("Login",data.error);
            }
            
        }).catch(err=>{
            console.log("Login",err);
        }
        )
        
    }


    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form className='form'>
                    <Input placeholder="username"onChange={(e)=> setusername(e.target.value)}/>
                    <Input placeholder="email" onChange={(e)=> setemail(e.target.value)}/>
                    <Input placeholder="password" onChange={(e)=> setpassword(e.target.value)}/>
                    <Input placeholder="Confirm password" onChange={(e)=> setpasswordagain(e.target.value)}/>
                    <div style={{"color":"red"}}>{error}</div>
                    <Agreement>By creating an account, I consert to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b></Agreement>
                    <Button onClick={handleClick}>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register
