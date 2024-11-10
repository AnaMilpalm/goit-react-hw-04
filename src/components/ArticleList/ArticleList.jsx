import s from './ArticleList.module.css';
export const ArticleList = ({ items }) => (
    <ul className={s.list}>
    {items.map(({objectID, url, title}) => (
      <li key={objectID}>
        <a href={url} target="_blank" rel='noreferrer nooperer'>
          {title}
        </a>
      </li>
    ))}
  </ul>
  );