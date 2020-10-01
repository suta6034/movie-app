import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import {HeartTwoTone} from "@ant-design/icons/lib";
import {withRouter} from 'react-router-dom';

function Favorite(props) {
    const user = useSelector(state => state.user_reducer);
    const [favorited, setFavorited] = useState(false);
    useEffect(() => {
        axios.post('/api/favorite/favorited', init)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.subscribed)
                } else {
                    alert('Failed to get Favorite Information')
                }
            })
    }, []);

    const init = {
        movieTitle: props.match.params.movieTitle,
        userFrom: props.userFrom,
    };

    const variables = {
        userFrom: props.userFrom,
        movieTitle: props.title,
        movieDirector: props.director,
        movieYear: props.year,
    };

    const onClickFavorite = () => {
        if (user.authCheckResponse && !user.authCheckResponse.isAuth) {
            return alert('Please Log in first :)');
        }

        if (favorited) {
            //when subscribed
            axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        console.log('success! and change fav')
                        setFavorited(!favorited)
                    } else {
                        alert('Failed to Remove From Favorite')
                    }
                })

        } else {
            // when not favorited yet
            axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavorited(!favorited)
                    } else {
                        alert('Failed to Add To Favorite')
                    }
                })
        }
    };

    return (
        <div style={{position:'absolute', right:'0'}}>
            <Button style={{borderRadius:'30px',backgroundColor:'white'}} onClick={onClickFavorite} type="ghost" icon={<HeartTwoTone twoToneColor={`${!favorited ? "#52c41a" : "#eb2f96"}`}/>} >
                {!favorited ? "Favorite" : "Favorited"}
            </Button>
        </div>
    )
}

export default withRouter(Favorite)