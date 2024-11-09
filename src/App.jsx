import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

const ArticleList = ({ items }) => (
  <ul>
  {items.map(({objectID, url, title}) => (
    <li key={objectID}>
      <a href={url} target="_blank" rel='noreferrer nooperer'>
        {title}
      </a>
    </li>
  ))}
</ul>
);
function App() {
      const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      const response = await axios.get(
        "http://hn.algolia.com/api/v1/search?query=react"
      );
      console.log(response);
      setArticles(response.data.hits);
    }
    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Latest articles</h1>
      {articles.length > 0 && <ArticleList items={articles}/>

      }
    </div>
  );
};

export default App;
