// wherever we want to work with the contex we need to import Context and useContext
import { useState, useEffect, useContext } from 'react';
import { Context } from "../../context";
import axios from 'axios';

import { toast } from 'react-toastify';
import { useRouter } from "next/router";

import styled from 'styled-components';

const Container = styled.div`
    margin: 100px;
`

const Button = styled.button`
    color: white;
    background-color: black;
    padding: 50px;
    cursor: pointer;
`

const userprofile = () => {
    // wherever we need to work with Context we need the below line of code 
    const { state, dispatch } = useContext(Context);
    const { user } = state;
    const router = useRouter();

    // states 
    const [hidden, setHideen] = useState(true);

    const logout = async () => {
        dispatch({ type: "LOGOUT" });
        window.localStorage.removeItem("user");
        const { data } = await axios.get("/api/logout");
        toast(data.message);
        router.push("/login");
    }

    // to protect the page, we are making call to our backend, from backend if the use is valid
    // we will get response and we will set hidden to false i.e. make hidden content visible
    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/api/current-user");
            // console.log(data);
            // setHideen(false);
            if(data.ok) setHideen(false);
        } catch (err) {
            console.log(err);
            setHideen(true);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <Container>
            {
                hidden ?
                    <div>You Must be logged in!!</div>
                    :
                    <Button onClick={logout}>
                        LogOut
                    </Button>
            }
        </Container>
    )
}

export default userprofile