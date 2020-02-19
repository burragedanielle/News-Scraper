import React, { Component } from 'react';
import axios from 'axios';

class Jumbotron extends Component {
    state = {}

    handleClick = () => {
        axios.post('/api/scrape')
            .then(() => {
                console.log(`Scraped`);
            });
    }

    render() {
        return (
            <React.Fragment>
                <div className="jumbotron">
                    <h1 className="display-4">What's New?</h1>
                    <hr className="my-4" />
                    <p>Get and save the latest on pop culture and entertainment news.</p>
                    <a className="btn btn-primary btn-lg" onClick={this.handleClick} role="button">See the latest</a>
                </div>
            </React.Fragment>
        );
    }
}

export default Jumbotron;
