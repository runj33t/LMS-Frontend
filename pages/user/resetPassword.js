// password reset page
// how password reset will work
// user will enter his email, we will look for that email in the databse, if that email exist then we will generate a 
// password reset code send that code to the user on his email, then using that code, user will be able to reset his 
// password
// i.e. in the backend we will find user in mongoose database based on email we recieved, if user with that email exists
// update his old password with new one and reset the password reset code back to empty when password reset is done.
import { useState, useContext, useEffect } from "react";
import styled from "styled-components"
import axios from 'axios'
import { toast } from 'react-toastify'
import Link from "next/link";
import { Context } from "../../context";
import { useRouter } from "next/router";

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

const resetPassword = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // destructure user from global state
    const { state: { user } } = useContext(Context);
    // router to redirect to pages
    const router = useRouter();

    // if user is loggedIn that means he does not require to view any password reset page so we prevent him to acces
    // that page by redirecting back to his account
    useEffect(() => {
        if (user != null) {
            router.push("/user/userprofile");
        }
    }, [user]);

    // this handleSubmot will send code to the email submitted
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(email);
        try {
            setLoading(true);
            const { data } = await axios.post('/api/forgot-password', { email });
            setSuccess(true);
            toast("Password Reset Code Has Been Sent To Your Registered Email!");
        } catch (err) {
            setLoading(false);
            toast(err.response.data);
        }
    }

    // this handleResetPassword will send security code back to server for further process of password reset
    const handleResetPassword = async (e) => {
        e.preventDefault();

        // debugging
        // console.log(email, newPassword, code);
        // return;

        try {
            setLoading(true);
            const { data } = await axios.post('/api/reset-password', { email, code, newPassword });
            setEmail('');
            setCode('');
            setNewPassword('');
            setLoading(false);
            toast("Password Successfully Reset! Now you can log in with new password.");
        } catch (err) {
            setLoading(false);
            toast(err.data.response);
        }
    }


    return (
        <div>
            <Container>
                <Wrapper>
                    <Title>Reset Your Password</Title>
                    <Form onSubmit={success ? handleResetPassword : handleSubmit}>
                        <Input
                            type='email'
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {
                            success &&
                            <>
                                <Input
                                    type='text'
                                    placeholder="Enter Code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                />
                                <Input
                                    type='password'
                                    placeholder="Enter New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </>
                        }

                        <Button type="submit">SUBMIT</Button>
                    </Form>
                    <br />
                </Wrapper>
            </Container>
        </div>
    )
}

export default resetPassword