import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Button, Descriptions, Typography} from "antd";
import './MovieDetailPage.scss'
import Favorite from "./Sections/Favorite";
import {ArrowLeftOutlined} from "@ant-design/icons/lib";

interface movieType {
    title: string,
    year: any,
    director: string,
    production: string,
    distributor: string,
    writer: string,
}

const {Title} = Typography;

const MovieDetailPage = (props) => {
    const movieTitle = props.match.params.movieTitle;
    const [movieInfo, setMovieInfo] = useState<movieType>({title:'',year:'',director:'',production:'',distributor:'',writer:''});
    const [locations,setLocations] = useState([]);
    const [actors,setActors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDetail().then(res => {
            updateDetailInfo(res)
        })
    },[]);

    const fetchDetail = async () => {
        const res = await fetch(`https://data.sfgov.org/resource/yitu-d5am.json?title=${movieTitle}`);
        return await res.json()
    };
    const updateDetailInfo = (fetchedData) => {
        let locationsArray = [];
        let actorsArray = [];

        if(!fetchedData[0].hasOwnProperty('distributor')){
            // @ts-ignore
            setMovieInfo({
                title: fetchedData[0].title,
                year: fetchedData[0].release_year,
                director: fetchedData[0].director,
                production: fetchedData[0].production_company,
                distributor: 'None',
                writer: fetchedData[0].writer,
            });
        }else{
            setMovieInfo({
                title: fetchedData[0].title,
                year: fetchedData[0].release_year,
                director: fetchedData[0].director,
                production: fetchedData[0].production_company,
                distributor: fetchedData[0].distributor,
                writer: fetchedData[0].writer,
            });
        }

        //actors
        if(!fetchedData[0].hasOwnProperty('actor_2')){
            // @ts-ignore
            actorsArray.push(fetchedData[0].actor_1)
        }else if(!fetchedData[0].hasOwnProperty('actor_3')){
            // @ts-ignore
            actorsArray.push(fetchedData[0].actor_1,fetchedData[0].actor_2)
        }else{
            // @ts-ignore
            actorsArray.push(fetchedData[0].actor_1,fetchedData[0].actor_2,fetchedData[0].actor_3)
        }
        setActors(actorsArray);


        //locations
        if(!fetchedData[0].hasOwnProperty('locations')){
                // @ts-ignore
            locationsArray.push('No data')
        }else{
            fetchedData.forEach((item) => {
                // @ts-ignore
                const location = item.locations;
                let duplicatedChecker = false;
                duplicatedChecker = locationsArray.some((i) =>
                    i === location
                );
                if(!duplicatedChecker){
                    // @ts-ignore
                    locationsArray.push(location);
                }
            });
        }
        setLocations(locationsArray)
    };

    const actorsRender = () => {
        return (
            actors.map((i,index) => {
                return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{i}</td>
                    </tr>
                )
            })
        )
    };
    const locationsRender = () => {
        return(
       locations.map((i,index) => {
           return (
               <tr key={index}>
                   <td>{index+1}</td>
                    <td>{i}</td>
               </tr>
           )
       })
        )
    };

    const backButton = () => {
        window.history.back();
    };

    // @ts-ignore
    return (
        <div className="infoPage" style={{width: '100%', padding: '5rem 4rem'}}>

            <div style={{display: 'flex',justifyContent:'center',position:'relative', margin:'30px 0'}}>
                <div style={{position:'absolute', left:'0'}}>
                   <Button onClick={backButton} icon={<ArrowLeftOutlined />}>Back</Button>
                </div>
                <Favorite title={movieInfo.title} director={movieInfo.director} year={movieInfo.year}
                          userFrom={localStorage.getItem('userId')}
                />
                <div style={{
                    letterSpacing: '1px',
                    fontWeight: 'bolder',
                    fontFamily: 'sans-serif',
                }}
                >
                    <Descriptions title="Movie Info" bordered size='small'>
                        <Descriptions.Item label="Movie Title">{movieInfo.title}</Descriptions.Item>
                        <Descriptions.Item label="Released Year">{movieInfo.year}</Descriptions.Item>
                        <Descriptions.Item label="Director">{movieInfo.director}</Descriptions.Item>
                    </Descriptions>
                    <br/>
                    <br/>
                    <Title style={{fontSize: '16px'}}>Management </Title>
                    <br/>
                    <table>
                        <thead>
                        <tr>
                            <th>Operations</th>
                            <th>Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Production</td>
                            <td>{movieInfo.production}</td>
                        </tr>
                        <tr>
                            <td>Distributor</td>
                            <td>{movieInfo.distributor}</td>
                        </tr>
                        </tbody>
                    </table>
                    <br/>
                    <br/>
                    <Title style={{fontSize: '16px'}}>Actors </Title>
                    <br/>
                    <table>
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {actorsRender()}
                        </tbody>
                    </table>
                    <br/>
                    <br/>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Title style={{fontSize: '16px', marginBottom: '0', paddingTop: '5px'}}>Locations </Title>
                    </div>
                    <br/>
                    <table>
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Location</th>
                        </tr>
                        </thead>
                        <tbody>
                        {locationsRender()}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>

    );
};

export default withRouter(MovieDetailPage);
