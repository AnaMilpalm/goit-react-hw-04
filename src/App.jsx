import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import { ArticleList } from './components/ArticleList/ArticleList';
import { fetchArticlesWithTopic } from './articles-api';
import { SearchForm } from './components/SearchForm/SearchForm';

const App = () => {
      const [articles, setArticles] = useState([]);
      const [loading, setLoading] = useState(false);
     const [error, setError] = useState(false);



  // useEffect(() => {
  //   async function fetchArticles() {
  //     try {
  //       setLoading(true);
  //       const data = await fetchArticlesWithTopic("react");
  //       setArticles(data);
  //     } catch (error) {
  //       setError(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchArticles();
  // }, []);

    const handleSearch = async (topic) => {
      try {
        setArticles([]);
        setError(false);
        setLoading(true);
        const data = await fetchArticlesWithTopic(topic);
        setArticles(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div>

      <SearchForm onSearch={handleSearch} />
      {loading && <p style={{ fontSize:20 }}>Loading data, please wait...</p>}
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
};

export default App;
