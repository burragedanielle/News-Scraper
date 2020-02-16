import React, { Component } from 'react';

class Article extends Component {

    constructor() {
        super();
        this.state = {
            newsStories: []
        }
    }

    getArticles = async () => {
        const response = await fetch('/api/news-stories')
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    }

    componentDidMount() {
        this.getArticles()
            .then(res => {
                const articleData = res;
                this.setState({ newsStories: articleData })
                console.log(this.state.newsStories);
            })
    }

    render() {
        return (
            <div>
                <h2>a thing</h2>
                <ul>
                    {
                        this.state.newsStories.map(article =>
                            <li key={article.id}>{article.headline}</li>
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default Article;