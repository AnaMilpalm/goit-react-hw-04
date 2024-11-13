import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css';
const ImageGallery = ({images}) => {

    return (
        <ul className={s.list}>
           {images.map(image => 
            <li key={image.id}>
                <ImageCard 
                images={image.urls.small} 
                alt_description={image.alt_description}
                />
            </li>
           )}
        </ul>
    )
    
}

export default ImageGallery;