import React from 'react';
import { Button, Header, Image, Table, Responsive, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Store } from '../../store';
import BooksAvatar from '../../../assets/images/books-avatar.png';
import './Categories.scss';


const Categories = () => {
    const { state } = React.useContext(Store);

    const allCategories = state.categories.length > 0 &&
        state.categories.map((value, index) => {
            return (
                <Table.Row key={index}>
                    <Responsive as={Table.Cell} minWidth={Responsive.onlyMobile.minWidth}>
                        <Header as='h4' image>
                            <Image src={BooksAvatar} rounded size='mini' />
                            <Header.Content>
                                {value.display_name}
                                <Header.Subheader>{value.updated}</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Responsive>
                    <Responsive as={Table.Cell} minWidth={Responsive.onlyMobile.minWidth}>{value.oldest_published_date}</Responsive>
                    <Responsive as={Table.Cell} minWidth={Responsive.onlyMobile.minWidth}>{value.newest_published_date}</Responsive>
                    <Responsive as={Table.Cell} minWidth={Responsive.onlyMobile.minWidth}>
                        <Link to={{ pathname: `/categories/${value.list_name_encoded}`, state: { category: value } }}>
                            <Button>Detail</Button>
                        </Link>
                    </Responsive>
                </Table.Row>
            )
        })
    return (
        <div className="category-table">
            <Container>
                <Table basic='very' celled collapsing>
                    <Table.Header>
                        <Table.Row>
                            <Responsive as={Table.HeaderCell} minWidth={Responsive.onlyMobile.minWidth}>Display Name</Responsive>
                            <Responsive as={Table.HeaderCell} minWidth={Responsive.onlyMobile.minWidth}>Oldest Published Date</Responsive>
                            <Responsive as={Table.HeaderCell} minWidth={Responsive.onlyMobile.minWidth}>Newest Published Date</Responsive>
                            <Responsive as={Table.HeaderCell} minWidth={Responsive.onlyMobile.minWidth}>Action</Responsive>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {allCategories}
                    </Table.Body>
                </Table>
            </Container>
        </div>
    )
}

export default Categories;