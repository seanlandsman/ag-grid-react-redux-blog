import React, {Component} from "react";
import {AgGridReact} from "ag-grid-react";
import {connect} from "react-redux";

class SimpleGridExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: this.createColumnDefs()
        }
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    createColumnDefs() {
        return [
            {headerName: "Company", field: "name"},
            {headerName: "Price", field: "price", cellFormatter: (params) => params.value.toFixed(2)}
        ];
    }

    render() {
        let containerStyle = {
            height: 115,
            width: 500
        };

        return (gi
            <div style={containerStyle} className="ag-fresh">
                <h1>Simple ag-Grid React Example</h1>
                <AgGridReact
                    // properties
                    columnDefs={this.state.columnDefs}
                    rowData={this.props.rowData}

                    deltaRowDataMode
                    getRowNodeId={(data) => data.symbol}

                    // events
                    onGridReady={this.onGridReady}>
                </AgGridReact>
            </div>
        )
    }
}

// pull off row data changes
export default connect(
    (state) => {
        return {
            rowData: state.rowData
        }
    }
)(SimpleGridExample);
