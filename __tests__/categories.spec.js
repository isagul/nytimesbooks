import React from 'react';
import { mount, shallow } from 'enzyme';
import Categories from '../src/components/categories/Categories';
import { findByClassName, findByTag } from '../utils/index';
import { StoreProvider, Store } from '../src/store';
import { fetchData } from '../utils/fetch';
import * as TYPES from '../src/constants/actions';

import axios from 'axios';

const setUp = () => {
    const context = {
        categories: []
    }
    return mount(
        <StoreProvider value={context}>
            <Categories />
        </StoreProvider>
    );
};

// jest.mock('axios', () => ({ get: jest.fn() }));

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: jest.fn(),
        location: {
            pathname: ''
        }
    }),
}));

describe('Categories Component', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = setUp();
    });

    afterEach(() => {
        jest.resetAllMocks();
        jest.unmock('axios');
    })

    it('fetches successfully data from an API', async () => {
        const data = { status: 'OK' };
        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(fetchData()).resolves.toEqual(data);
    });

    it('fetches erroneously data from an API', async () => {
        const errorMessage = 'Network Error';
        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );
        await expect(fetchData()).rejects.toThrow(errorMessage);
    });

    it('should render without errors', async () => {
        const component = await findByClassName(wrapper, 'category-table');
        expect(component.exists()).toBe(true);
    })

    it('should render title tag render', () => {
        const component = findByTag(wrapper, 'h3');
        expect(component.exists()).toBe(true);
    })

    it('should render title text as expected', () => {
        const component = findByClassName(wrapper, 'page-title');
        expect(component.text()).toBe('Categories');
    })

    it('should render table as expected', () => {
        const table = findByTag(wrapper, 'table');
        expect(table.length).toEqual(1);
    })
});