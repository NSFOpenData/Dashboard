import authHelper from './../../auth-helper'
import React, {useState, useEffect} from "react"
import {Redirect} from 'react-router-dom'
const SignOut: React.FC = () => {
    const tryLogOut = async () => {
        try {
            authHelper.logout()

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