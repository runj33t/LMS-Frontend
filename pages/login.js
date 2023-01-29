import { useState } from "react";
import styled from "styled-components";

// axios is used to make get and post requests, it a promise-based hhtp client fofr node.js
import axios from 'axios';

// to display notifications we use toast
import { toast } from 'react-toastify';

const Container = styled.div`
  width: 100vw;
  height: 80vh;
  /* background-size: cover; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  @media screen and (max-width: 960px){
    width: 75%;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  @media screen and (max-width: 960px){
    min-width: 100%;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
`;

const LogIn = () => {
    const [email, setEmail] = useState("Rahul@gmail.com");
    const [password, setPassword] = useState("Password12");

    // state for loading effect
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.table({ email, password });

        try {

            // set loading to true
            setLoading(true);

            const { data } = await axios.post(`/api/login`, {        // since we have setup our own front end server so we can use directly /api for backend api calls
                email,
                password,
            });
            console.log('LogIn Response', data);
            toast.success('LogIn Success');

            setLoading(false);
        } catch (err) {
            toast.error(err.response.data);
            setLoading(false);
        }
    };
    return (
        <div>
            <Container>
                <Wrapper>
                    {loading ?
                        <Title>Logging In</Title>
                        :
                        <Title>LOGIN</Title>
                    }
                    <Form onSubmit={handleSubmit}>

                        <Input
                            type='email'
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <Input
                            type='password'
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />

                        <Button type="submit">LogIn</Button>
                    </Form>
                </Wrapper>
            </Container>
        </div>
    );
};

export default LogIn;