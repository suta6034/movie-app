import React, {useEffect, useState} from 'react'
import {withRouter} from "react-router";
import GridCard from "./Sections/GridCard"
import {Button, Row} from "antd";
import {DownSquareTwoTone} from "@ant-design/icons/lib";
import SearchBar from "./Sections/SearchBar";
import './landingPage.scss'

interface movieType{
    title:string, year:any, director:string
}


const LandingPage:React.FC = () =>{
    const [movieList, setMovieList] = useState<movieType[]>([]);
    const [filteredMovieList, setFilteredMovieList] = useState<movieType[]>([]);
    const [offset, setOffset] = useState(0);
    const [limit] = useState(130);
    const [maxSize] = useState(4);
    const [hitTheLast,setHitTheLast] =useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchMovieInfo().then(res =>
            removeDuplicated(res, 'first')
        )
    },[]);

    useEffect(() => {
        if(searchTerm === ''){
            setFilteredMovieList([])
        }else{
            fetchDataBySearch().then(r => null)
        }
    },[searchTerm]);

    const removeDuplicated = (fetchedData, type) => {
        let newArray :movieType[] = [];
        let theLastIndex = 0;
        if(type === 'search'){
            newArray.push({title:fetchedData[0].title, year: fetchedData[0].release_year, director: fetchedData[0].director})
            setFilteredMovieList([...newArray]);
            setLoading(false)
        }else{
            setFilteredMovieList([]);
            for(let i = 0 ; newArray.length < maxSize ; i++){
                if(fetchedData[i].title === 'Zodiac'){
                    setHitTheLast(true)
                }else{
                    setHitTheLast(false)
                }
                if(newArray.length === 0){
                    if(type === 'next'){
                        if(movieList[movieList.length-1].title !== fetchedData[i].title){
                            newArray.push({title:fetchedData[i].title, year: fetchedData[i].release_year, director: fetchedData[i].director})
                        }
                    }
                    else if(type ==='first') {
                        newArray.push({
                            title: fetchedData[i].title,
                            year: fetchedData[i].release_year,
                            director: fetchedData[i].director
                        })
                    }

                }
                else if(newArray.length >0){
                    if(newArray[newArray.length-1].title !== fetchedData[i].title){
                        newArray.push({title:fetchedData[i].title, year: fetchedData[i].release_year, director: fetchedData[i].director});
                        theLastIndex=i;
                    }
                }
            }
            setOffset(offset+theLastIndex)
            if(type=== 'first'){
                setMovieList([...newArray]);
            }else{
                setMovieList([...movieList,...newArray]);
            }
            setLoading(false)
            const El = document.getElementById('scroll__inside');
            //@ts-ignore
            El.scrollTo({top: El.scrollHeight, behavior: 'smooth'});
        }
        };

    const fetchMovieInfo = async () => {
        const res = await fetch(`https://data.sfgov.org/resource/yitu-d5am.json?$limit=${limit}&$offset=0`);
        return await res.json();
    };


    const fetchNewData = async(type) => {
        if(type === 'next'){
            const res =await fetch(`https://data.sfgov.org/resource/yitu-d5am.json?$limit=${limit}&$offset=${offset}`)
            const result = await res.json();
            removeDuplicated(result,type)
        }
    };

    const fetchDataBySearch = async() => {
            const res = await fetch(`https://data.sfgov.org/resource/yitu-d5am.json?title=${searchTerm}`)
            const result = await res.json();
            if(result.length > 0){
                removeDuplicated(result,'search')
            }else{
                return null
            }
    };

    const searchTermUpdate = (term) => {
        setSearchTerm(term)
    };


    // @ts-ignore
    return (
        <>
            <div className="app">
                {!loading &&

                <div
                    className='landingPage__container'
                    style={{
                    width:'55%',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                        borderRadius:' 90px',
                }}>
                    <SearchBar searchTerm={searchTermUpdate}/>
                    <div
                        id='scroll__inside'
                        style={{
                        height: '550px',
                        width: '85%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        overflow: 'auto',
                    }}>
                        {filteredMovieList.length >0 ?
                            <Row justify='center' gutter={[40, 32]}>
                                {
                                    filteredMovieList && filteredMovieList.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <GridCard item={item}/>
                                        </React.Fragment>
                                    ))
                                }
                            </Row>
                            :
                            <>
                            <Row justify='center' gutter={[40, 32]}>
                                {
                                    movieList && movieList.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <GridCard item={item}/>
                                        </React.Fragment>
                                    ))
                                }
                            </Row>
                       </>
                        }
                    </div>
                    {
                        !hitTheLast && filteredMovieList.length === 0 && <Button style={{width:'8rem',marginBottom:'10px',marginTop:'15px'}} className="loadMore" onClick={() => fetchNewData('next')} type="ghost"
                                               icon={<DownSquareTwoTone/>}>
                            Load more
                        </Button>
                    }
                </div>

                }
            </div>
        </>
    );
};

export default withRouter(LandingPage)