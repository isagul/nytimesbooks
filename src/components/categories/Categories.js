import React from 'react';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import { Store } from '../../store';
import BooksAvatar from '../../../assets/images/books-avatar.png';
import App from '../App';
import './Categories.scss';


const Categories = () => {
  const { state } = React.useContext(Store);

  const addKeyCategories = state.categories.length > 0 && state.categories.map((category, index) => {
    category["key"] = `${index + 1}`;
    return category;
  })

  const columns = [
    {
      title: 'Display Name',
      dataIndex: 'display_name',
      key: 'display_name',
      render: (text) => {
        return (
          <div className="display-name">
            <img src={BooksAvatar} className="image"/>
            <p className="text">{text}</p>
          </div>
        )
      }
    },
    {
      title: 'Oldest Published Date',
      dataIndex: 'oldest_published_date',
      key: 'oldest_published_date',
    },
    {
      title: 'Newest Published Date',
      dataIndex: 'newest_published_date',
      key: 'newest_published_date',
    },
    {
      title: 'Updated',
      dataIndex: 'updated',
      key: 'updated',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'detail',
      render: (record) => {
        return (
          <Link to={{ pathname: `/categories/${record.list_name_encoded}`, state: { category: record } }}>
            <Button>Detail</Button>
          </Link>
        )
      },
    }
  ];

  return (
    <App>
      <div className="category-table">
        <h3 className="page-title">Categories</h3>
        <Table columns={columns} dataSource={addKeyCategories} />
      </div>
    </App>
  )
}

export default Categories;