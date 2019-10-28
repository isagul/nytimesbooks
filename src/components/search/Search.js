import React, {useState} from 'react';
import {Input} from 'semantic-ui-react';
import {Store} from '../../store';
import './Search.scss';

const Search = () => {
    const [searchParam, setSearchParam] = useState('');
    const { state, dispatch } = React.useContext(Store);

    const handleSearchParam = (event) => {
        setSearchParam(event.target.value);
        dispatch({
            type: 'FILTER_CATEGORIES',
            payload: event.target.value
        });
    }
    return (
        <Input className="search" icon='search' placeholder='Search Categories...' onChange={handleSearchParam} value={searchParam}/>
    )
}

export default Search;