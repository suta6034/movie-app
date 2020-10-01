import React from 'react';
import {Card, Col} from "antd";


interface Props{
    item: movieList
}
interface movieList{
    title:string, year:any, director:string
}

const GridCard: React.FC<Props> = ({item}) => {

    return (
            <Col  lg={12} md={12} xs={24} style={{height:'270px', display:'flex', justifyContent:'center'}}>

                <a href={`/movie/${item.title}`}>
                    <Card style={{
                        // backgroundColor: `${colors[type]}`,
                        borderRadius:' 90px',
                        boxShadow:'0 3px 15px rgba(100, 100, 100, 0.5)',
                        textAlign:'center',
                        margin:'10px',
                        padding:'20px',
                        width:'18rem',
                        height:'100%'
                    }}>
                        <div style={{}}>

                            <div className='info' style={{marginTop:'20px'}}>
                                <div  style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                    borderRadius: '10px',
                                    fontSize: '1em',
                                    padding: '5px 10px',
                                    fontWeight:'normal',
                                    fontFamily:'sans-serif',
                                    letterSpacing:'1px',
                                    margin:'0 auto',
                                    width:'80%',
                                }}>
                                    {item.title}
                                </div>
                                <div style={{
                                    fontWeight:'bolder',
                                    fontFamily:'sans-serif',
                                    fontSize:'15px',
                                    margin: '15px 0 7px',
                                    letterSpacing:'1px',

                                }}>
                                    {item.director}
                                </div>
                                <div
                                     style={{
                                         backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                         borderRadius: '10px',
                                         fontSize: '0.8em',
                                         padding: '5px 10px',
                                         margin:'0 auto',
                                         width:'40%',
                                         letterSpacing:'1px'
                                     }}
                                >
                                    {item.year}
                                </div>
                            </div>
                        </div>
                    </Card>
                </a>
            </Col>
    );
};

export default GridCard

