import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Store } from '../../store';
import { withRouter } from 'react-router-dom';
import {FILTER_CATEGORIES} from '../../constants/actions';
import './style.scss';

const Search = (props) => {
  const [searchParam, setSearchParam] = useState('');
  const { dispatch } = React.useContext(Store);

  const handleSearchParam = (event) => {
    setSearchParam(event.target.value);
    if (event.key === 'Enter') {
      props.history.push('/');
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
      <Input 
        className="search"
        autoFocus
        placeholder='Search category display name' 
        size="large" onKeyPress={handleSearchParam}
        onChange={handleSearchParam}  
        value={searchParam} 
        prefix={<SearchOutlined />} 
      />
  )
}

export default withRouter(Search);
