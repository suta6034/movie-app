import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {authCheck} from "../_actions/user_actions";

export default (SpecificComponent, option, adminRoute = null) => {

    // options
    // null : for anybody
    // true : for logged in user
    // false : for any body except logged in user
    // adminRoute = true : page only for admin

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(authCheck()).then(response => {
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login')
                    }
                } else {
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if (option === false)
                            props.history.push('/')
                    }
                }
            })
        }, []);

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}

