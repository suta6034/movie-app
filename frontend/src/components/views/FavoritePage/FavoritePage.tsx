import React, {useEffect, useState} from 'react'
import {Typography, Button} from 'antd';
import axios from 'axios';
import './FavoritePage.scss';
import {DeleteTwoTone} from "@ant-design/icons/lib";

const {Title} = Typography;
interface types {
    movieTitle:String;
    movieYear:String;
    movieDirector:Boolean;
}

function FavoritePage() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    let variable = {userFrom: localStorage.getItem('userId')};

    useEffect(() => {
        fetchFavoritedMovies()
    }, []);

    const fetchFavoritedMovies = () => {
        axios.post('/api/favorite/getFavoritedMovies', variable)
            .then(response => {
                if (response.data.success) {
                    setFavorites(response.data.favorites);
                    setLoading(false)
                } else {
                    alert('Failed to get Favorited Movies')
                }
            })
    };

    const onClickDelete = (movieTitle, userFrom) => {

        const variables = {
            movieTitle: movieTitle,
            userFrom: userFrom,
        };

        axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoritedMovies()
                } else {
                    alert('Failed to Remove From Favorite')
                }
            })
    };

    const renderCards = favorites.map((favorite:types, index) => {

        return (
            <tr key={index} style={{fontWeight:'bold',
                fontSize:'15px',
                fontFamily:'sans-serif',
                letterSpacing:'1px',}}>
                <td><a href={`/movie/${favorite.movieTitle}`}>{favorite.movieTitle}</a></td>
                <td>{favorite.movieDirector}</td>
                <td>{favorite.movieYear}</td>
                <td>
                    <Button  onClick={() => onClickDelete(favorite.movieTitle, variable.userFrom)} type="primary" danger>
                        Remove
                    </Button>
                </td>
            </tr>
        )
    });

    return (
        <div>
        <div style={{ width: '85%', margin: '0 auto',paddingTop:'6rem'}}>
            <Title level={2}> Favorite Movies </Title>
            <hr/>
            {favorites.length === 0 ? <div style={{margin:'10px', textAlign:'center'}}>There is no movie</div> :
                <>
                    {!loading &&
                    <table style={{margin:'20px auto'}}>
                        <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Movie Director</th>
                            <th>Released Year</th>
                            <td>{<DeleteTwoTone twoToneColor="#eb2f96" />}</td>
                        </tr>
                        </thead>
                        <tbody>
                        {renderCards}
                        </tbody>
                    </table>
                    }</>
            }
        </div>
        </div>
    )
}

export default FavoritePage