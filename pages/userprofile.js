// wherever we want to work with the contex we need to import Context and useContext
import { useState, useEffect, useContext } from 'react';
import { Context } from "../context";
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
    const router = useRouter();

    const logout = async () => {
        dispatch({ type: "LOGOUT" });
        window.localStorage.removeItem("user");
        const { data } = await axios.get("/api/logout");
        toast(data.message);
        router.push("/login");
    }

    return (
        <Container>
            <Button onClick={logout}>
                LogOut
            </Button>
        </Container>
    )
}

export default userprofile