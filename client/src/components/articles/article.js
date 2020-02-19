import React, { Component } from 'react';
import axios from 'axios';

class Article extends Component {
    constructor() {
        super();
        this.state = {
            newsStories: []
        }
    }

    componentDidMount() {
        axios.get('/api/start')
            .then((data) => {
                let articleInfo = []
                for (let i = 0; i <= 10; i++) {
                    articleInfo.push(data.data[i]);
                    console.log(articleInfo)
                }

                this.setState({
                    newsStories: articleInfo
                });
            });
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.newsStories.map((article) => {
                            return (
                                <li
                                    key={article.id}
                                    headline={article.headline}
                                    summary={article.summary}
                                    url={article.url}
                                >
                                    <h3>{article.headline}</h3>
                                    <p>{article.summary}</p>
                                    <p>{article.url}</p>
                                </li>
                            )

                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Article;