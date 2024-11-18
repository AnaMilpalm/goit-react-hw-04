import s from './LoadMoreBtn.module.css';
const LoadMoreBtn = ({onLoadMore}) => {
    return (
        <div className={s.buttonBox}>
        <button onClick={onLoadMore} className={s.loadMore}>
            Load more
        </button>
        </div>
    )
}

export default LoadMoreBtn;