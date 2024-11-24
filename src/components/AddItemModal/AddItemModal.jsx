import React from "react";
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const AddItemModal = ({closeActiveModal, isOpen, activeModal, onAddItem}) => {

    return (
        <ModalWithForm  closeActiveModal={closeActiveModal} buttonText="Add garment" isOpen={activeModal === "add-garment"} titleText="New garment" activeModal={activeModal} onSubmit={onAddItem}>
        <label htmlFor='name' className='modal__label'>Name
          <input type='text' className='modal__input' id='name' placeholder='Name'></input>
        </label>
        <label htmlFor='imageUrl' className='modal__label'>Image
          <input type='URL' className='modal__input' id='imageUrl' placeholder='Image URL'></input>
        </label>
        <fieldset className='modal__fieldset'>
          <legend className='modal__legend'>Select the weather type:</legend>
          <div>
          <input type='radio' id='hot' name='weather' className='modal__radio-input'></input>
          <label htmlFor='hot' className='modal__label modal__label_type_radio'>
            Hot
          </label>
          </div>
          <div>
          <input type='radio' name='weather' className='modal__radio-input' id='warm'></input>
          <label htmlFor='warm' className='modal__label modal__label_type_radio'>
            Warm
          </label>
          </div>
          <div>
          <input type='radio' name='weather' className='modal__radio-input' id='cold'></input>
          <label htmlFor='cold' className='modal__label modal__label_type_radio'>
            Cold
          </label>
          </div>
        </fieldset>
      </ModalWithForm>
    );

}

export default AddItemModal;