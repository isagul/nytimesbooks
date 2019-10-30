import React, {useState} from 'react';
import {Input, Icon} from 'semantic-ui-react';
import {Store} from '../../store';
import {withRouter} from 'react-router-dom';
import './Search.scss';

const Search = (props) => {
    const [searchParam, setSearchParam] = useState('');
    const { state, dispatch } = React.useContext(Store);

    const handleSearchParam = (event) => {
        setSearchParam(event.target.value);
        if(event.key === 'Enter') {
          props.history.push('/');
          filterParam();
        }
    }

    const filterParam = (event) => {
      dispatch({
          type: 'FILTER_CATEGORIES',
          payload: searchParam
      });
    }

    return (
        <Input  className="search"
                focus
                placeholder='Search Categories...'
                onKeyPress={handleSearchParam}
                onChange={handleSearchParam} value={searchParam} icon={<Icon name='search' link onClick={filterParam}/>} />
    )
}

export default withRouter(Search);
