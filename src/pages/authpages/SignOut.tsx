import authHelper from './../../auth-helper'
import React, {useState, useEffect} from "react"
import {Redirect} from 'react-router-dom'
import {useAuth} from './../../AuthContext'
const SignOut: React.FC = () => {
    const {logOut} = useAuth()
    const tryLogOut = async () => {
        try {
            authHelper.logout()
            logOut()


        } catch(err) {
            console.log(err)
        }
    }
    const [redirect, setRedirect] = useState(false);

        useEffect(() => {
            tryLogOut().then(() => {
                setRedirect(true)
            }).catch((err) => console.log(err))
        }
        , []);
        


      return redirect ? <Redirect to='/authentication'/> : <div>Loading</div>



}

export default SignOut;