// added for spotify api
import { useState, useEffect } from "react"
import axios from "axios"





export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    // Below is added for the spotify api
    // creates or token for the api calls
    useEffect(() => {
        axios
            .post("http://localhost:3001/login", {
                code,
            })
            .then(res => {
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setExpiresIn(res.data.expiresIn)
                // this pulls the code number off of out url and sets it blank
                window.history.pushState({}, null, "/")
            })
            .catch(() => {
                window.location = "/"
            })
    }, [code])

    // before token expires we will jump in to the server.js and refresh the token so the user dosent get logged out
    useEffect(() => {
        // if we dont have a refreshToken or its not expresIn will return out of this hook. this is so this dosent run when we first log in and cause an error
        if (!refreshToken || !expiresIn) return
        // use setInterval to run this right before out token expires
        const interval = setInterval(() => {
            axios
                .post("http://localhost:3001/refresh", {
                    refreshToken,
                })
                .then(res => {
                    setAccessToken(res.data.accessToken)
                    setExpiresIn(res.data.expiresIn)
                })
                .catch(() => {
                    window.location = "/"
                })
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    return accessToken
}