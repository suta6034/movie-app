import React, {useState} from 'react'
import { Input } from 'antd';
import './searchBar.scss'
const { Search } = Input;

function SearchBar(props) {
    const [searchTerm, setSearchTerm ]= useState('');
    const onChangeSearchTerm = (event) => {
        setSearchTerm(event.currentTarget.value);
        props.searchTerm(event.currentTarget.value)
    };

    return (
        <div style={{width:'20rem', marginTop:'20px', marginBottom:'20px'}}>
            <Input.Group compact style={{width:'30rem'}}>
                <Search style={{ marginLeft:'5px',width: '70%' , borderRadius:'30px'}}  onChange={onChangeSearchTerm} value={searchTerm} placeholder={`Title must be accurate, Uppercase as well..`}  />
            </Input.Group>
        </div>
    )
}

export default SearchBar