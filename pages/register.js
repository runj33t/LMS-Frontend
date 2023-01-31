import { useState, useEffect, useContext } from "react";   // useContext for global state
import { Context } from "../context";           // to be able to use the Context
import { useRouter } from "next/router";        // by using this useRouter we can route to any page after some actions, like after log in we can redirect to home page!
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

const register = () => {

  const [name, setName] = useState("Rahul");
  const [email, setEmail] = useState("Rahul@gmail.com");
  const [password, setPassword] = useState("Password12");
  const [confirmPassword, setConfirmPassword] = useState("Password12");

  // destructuring the global state
  const { state, dispatch } = useContext(Context);
  // console.log("STATE  : ", state);

  // destructuring the user from the global state
  const { user } = state;

  // Navigation / Router
  const router = useRouter();

  // redirect user to homepage when already logged in (security and ui change so that logged in user can access register or login page)
  useEffect(() => {
    // if user is not null in gloabl state i.e. someone is logged In, redirect them to home page
    if (user !== null) router.push("/");
  }, [user]); // whenever value of user changes, useEffect will work

  // state for loading effect
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password, confirmPassword });

    try {

      // set loading to true
      setLoading(true);

      // syntax of post request - axios.post(url_endpoint, {data, to, be, sent,})
      // const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`, {
      const { data } = await axios.post(`/api/register`, {        // since we have setup our own front end server so we can use directly /api for backend api calls
        name,
        email,
        password,
        confirmPassword,
      });
      // console.log('Register Response', data);
      toast.success('Registration Success');

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
            <Title>Creating an Account.......</Title>
            :
            <Title>CREATE AN ACCOUNT</Title>
          }
          <Form onSubmit={handleSubmit}>
            <Input
              type='text'
              placeholder="Name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />

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

            <Input
              type='password'
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />

            <Button type="submit">SING UP</Button>
          </Form>
        </Wrapper>
      </Container>
    </div>
  );
};

export default register;