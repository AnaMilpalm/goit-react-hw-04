import Modal from 'react-modal';
import s from './ImageModal.module.css';

Modal.setAppElement('#root'); 

const ImageModal = ({ openModal, closeModal, image }) => {
  return (
    <Modal  
    isOpen={openModal} // Якщо модальне вікно відкрите
    onRequestClose={closeModal} // Закрити модалку при натисканні на бекдроп або кнопку
    shouldCloseOnOverlayClick={true} // Модалка закривається при натисканні на бекдроп
    overlayClassName={s.ReactModal__Overlay} // Клас для бекдропа
    className={s.ReactModal__Content} // Клас для контенту модалки
    contentLabel={image?.alt_description || 'Image modal'} // Опис для доступності
    // style={{
    //     overlay: {
    //       position: 'fixed',
    //       top: 0,
    //       left: 0,
    //       right: 0,
    //       bottom: 0,
    //       backgroundColor: 'rgba(0, 0, 0, 0.75)'
    //     },
    //     content: {
    //       position: 'absolute',
    //       top: '80px',
    //       left: '80px',
    //       right: '80px',
    //       bottom: '80px',
          
    //       border: '1px solid #ccc',
    //       overflow: 'auto',
    //       WebkitOverflowScrolling: 'touch',
    //       borderRadius: '4px',
    //       outline: 'none',
    //       padding: '20px',
    //       color: 'black'
    //     }
    //   }}/
    >
      <button className={s.button} onClick={closeModal}>Close</button>
        {image && (
          <div className={s.modal}>
            <img src={image.urls?.regular} alt={image.alt_description} style={{ width: '100%' }} />
          </div>
        )}
    </Modal>
  );
};

export default ImageModal;
