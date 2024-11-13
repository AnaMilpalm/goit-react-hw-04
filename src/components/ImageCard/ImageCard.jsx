const ImageCard = ({images: url, alt_description}) => {
    return (
        <div>
           <img src={url} alt={alt_description} />
        </div>

    );  
};

export default ImageCard;