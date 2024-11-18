import Modal from 'react-modal';
import s from './ImageModal.module.css';

Modal.setAppElement('#root'); 

const ImageModal = ({ openModal, closeModal, image }) => {
  return (
    <Modal 
    style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)'
        },
        content: {
          position: 'absolute',
          top: '40px',
          left: '40px',
          right: '40px',
          bottom: '40px',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px'
        }
      }}
    //   className={s.content}
    //   isOpen={openModal} 
    //   onRequestClose={closeModal} 
    //   overlayClassName={s.overlay}
    //   ariaHideApp={false}
    //   closeTimeoutMS={200}
    //   contentLabel={alt_description}
    // bodyOpenClassName={s.reactModal}
    //   contentLabel={image?.alt_description || 'Image modal'}
     
    >
      <button onClick={closeModal}>Close</button>
      {image && (
        <div>
          <img src={image.urls?.regular} alt={image.alt_description} style={{ width: '100%' }} />
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
