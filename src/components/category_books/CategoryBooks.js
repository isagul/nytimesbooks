import React, {useEffect, useState} from 'react';
import {Store} from '../../store';
import axios from 'axios';
import apiConfig from '../../config';
import { Dimmer, Loader, Segment} from 'semantic-ui-react'


const CategoryBooks = (props) => {
    const { state, dispatch } = React.useContext(Store);    
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        let categoryRoute = props.location.state.category.list_name_encoded;
        axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/${categoryRoute}.json`, {
            params: {
              'api-key': apiConfig.apiKey
            }
          })
          .then(function (response) {
            if(response.status === 200) {
                setIsActive(false);
                dispatch({
                    type: 'SET_CATEGORY_DATA',
                    payload: response.data.results.books
                })
                console.log(response);
            }
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {
            //console.log('state', state);
          });
    },[]);

    /*const editRouteName = route => {
        return route.toLowerCase().split(' ').join('-');
    }*/

    const categoryDetail = state.categoryBooks.length > 0 && 
    state.categoryBooks.map((value, index) => {
        return (
            <p key={index}>{value.title}</p>
        )
    })

    return (
        <div>
            {
                isActive &&
                <Segment>
                    <Dimmer active style={{height:'100vh'}}>
                        <Loader indeterminate>Preparing Files</Loader>
                    </Dimmer>
                </Segment>                
            }
            {categoryDetail}
        </div>
    )
}

export default CategoryBooks;