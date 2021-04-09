import React from 'react';
import { Table, Button } from 'antd';
import { Link,  } from 'react-router-dom';
import { Store } from '../../store';
import BooksAvatar from '../../../assets/images/books-avatar.png';
import App from '../../components/App';
// import {
//   EyeOutlined
// } from '@ant-design/icons';
import './style.scss';


const Categories = (props) => {
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
    // {
    //   title: '',
    //   dataIndex: '',
    //   key: 'detail',
    //   align: "center",
    //   render: (record) => {
    //     return (
    //       <Link to={{ pathname: `/categories/${record.list_name_encoded}`, state: { category: record } }}>
    //         <EyeOutlined />
    //       </Link>
    //     )
    //   },
    // }
  ];

  function handleRow (record) {
    props.history.push({
      pathname: `/categories/${record.list_name_encoded}`,
      state: { category: record }
    })
  }

  return (
    <App>
      <div className="category-table">
        <h3 className="page-title">Categories</h3>
        <Table 
          className='category-table-row-select'
          columns={columns} 
          dataSource={addKeyCategories} 
          onRow={(record) => {
            return {
              onClick: () => handleRow(record)
            };
          }}
          pagination={{ position: ["bottomRight"] }} />
      </div>
    </App>
  )
}

export default Categories;