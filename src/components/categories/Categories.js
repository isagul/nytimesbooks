import React from 'react';
import {Button, Header, Image ,Table} from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Store} from '../../store';
import BooksAvatar from '../../../assets/images/books-avatar.png';
import './Categories.scss';


const Categories = () => {
    const { state } = React.useContext(Store);

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
                <Table.Cell>
                    <Link to={{ pathname: `/categories/${value.list_name_encoded}`, state: { category: value} }}>
                        <Button>Detail</Button>
                    </Link>
                </Table.Cell>
            </Table.Row>
        )
    })
    return (
        <div className="category-table">
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

export default Categories;