import './ModalWithForm.css'

function Modal() {
    return (<div className="modal">

        <form className='modal__form'>
            <h2 className='modal__title'></h2>
            <button type='button' className='modal__close'></button>
            <label htmlFor='name' className='modal__label'>Name
                <input type='text' className='modal__input' id='name' placeholder='Name'></input>
            </label>
            <label htmlFor='image' className='modal__label'>Image
                <input type='text' className='modal__input' id='image' placeholder='Name'></input>
            </label>
            <label htmlFor='weather' className='modal__label'>Select the weather type:
                <input type='radio' className='modal__input' id='weather' placeholder='Name'></input>
            </label>

        </form>
    </div>);
}

export default Modal;