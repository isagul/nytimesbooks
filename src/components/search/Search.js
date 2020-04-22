import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Store } from '../../store';
import { useHistory } from 'react-router-dom';
import {FILTER_CATEGORIES} from '../../constants/actions';
import {HOME} from '../../constants/routes';
import './Search.scss';

const Search = (props) => {
  const [searchParam, setSearchParam] = useState('');
  const { dispatch } = React.useContext(Store);
  // const history = useHistory();

  const handleSearchParam = (event) => {
    setSearchParam(event.target.value);
    if (event.key === 'Enter') {
      history.push(HOME);
      filterParam();
    }
  }

  const filterParam = (event) => {
    dispatch({
      type: FILTER_CATEGORIES,
      payload: searchParam
    });
  }

  return (
      <Input className="search"
            autoFocus
            placeholder='Search Categories...' 
            size="large" onKeyPress={handleSearchParam}
            onChange={handleSearchParam}  
            value={searchParam} 
            prefix={<SearchOutlined />} 
            />
  )
}

export default Search;
