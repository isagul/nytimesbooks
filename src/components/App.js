import React, {useState, useEffect} from 'react';
import './App.scss';
import { Dimmer, Loader, Segment, Button, List, Header, Image, Table } from 'semantic-ui-react'
const axios = require('axios');
import BooksAvatar from '../../assets/images/books-avatar.png';
import Search from './search/Search';
import {Store} from '../store';
import apiConfig from '../config';

const App = () => {
    const [isActive, setIsActive] = useState(true);
    const { state, dispatch } = React.useContext(Store);
    console.log(state);
    useEffect(() => {
        axios.get('https://api.nytimes.com/svc/books/v3/lists/names.json', {
            params: {
              'api-key': apiConfig.apiKey
            }
          })
          .then(function (response) {
            if(response.status === 200) {
                setIsActive(false);
                dispatch({
                    type: 'SET_DATA',
                    payload: response.data.results
                })
            }
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {
            //console.log('state', state);
          }); 
    },[]);

    const goCategoryDetail = function (value){
        setIsActive(true);
        let getDetail = value.toLowerCase().split(' ').join('-');
        axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/${getDetail}.json`, {
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
    }

    const allCategories = state.categories.length > 0 &&
        state.categories.map((value, index) => {
            return (
            <Table.Row key={index}>
                <Table.Cell>
                    <Header as='h4' image>
                        <Image src={BooksAvatar} rounded size='mini' />
                        <Header.Content>
                            {value.display_name}
                        <Header.Subheader>{value.updated}</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell>{value.oldest_published_date}</Table.Cell>
                <Table.Cell>{value.newest_published_date}</Table.Cell>
                <Table.Cell><Button onClick={() => goCategoryDetail(value.display_name)}>Detail</Button></Table.Cell>
            </Table.Row>
        )                    
    })



    return (
        <div className="app">
            <h1>The New York Times® Bestsellers</h1>
            <Search/>
            {
                isActive &&
                <Segment>
                    <Dimmer active style={{height:'100vh'}}>
                        <Loader indeterminate>Preparing Files</Loader>
                    </Dimmer>
                </Segment>
            }
            <Table basic='very' celled collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Display Name</Table.HeaderCell>
                        <Table.HeaderCell>Oldest Published Date</Table.HeaderCell>
                        <Table.HeaderCell>Newest Published Date</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {allCategories}
                </Table.Body>
            </Table>
            
        </div>
    )
}

export default App;