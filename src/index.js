'use strict';

import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";

// pull in the ag-grid styles we're interested in
import "ag-grid-root/dist/styles/ag-grid.css";
import "ag-grid-root/dist/styles/theme-fresh.css";

// only necessary if you're using ag-Grid-Enterprise features
// import "ag-grid-enterprise";

// our application
import SimpleGridExample from "./SimpleGridExample";
import GridDataService from "./GridDataService";

// a simple reducer
let gridDataReducer = (state = {rowData: []}, action) => {
    switch (action.type) {
        case 'ROW_DATA_CHANGED':
            return {
                ...state,
                rowData: action.rowData,
            };
        default:
            return state;
    }
};

// create the Redux store
let store = createStore(gridDataReducer);

// instantiate our Service and pass in the Redux store dispatch method
let gridDataService = new GridDataService(store.dispatch);

// wait for the dom to be ready, then render our application
document.addEventListener('DOMContentLoaded', () => {
    render(
        // make our application redux aware
        <Provider store={store}>
            <SimpleGridExample/>
        </Provider>,
        document.querySelector('#app')
    );

    // kick off our service updates
    gridDataService.start();
});

