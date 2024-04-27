import './Form.css'
import React, {useCallback, useState} from 'react';
import Modal from 'react-modal';


const Form = (props) => {

    const [value,setValue] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = useCallback(() => {
        setModalIsOpen(true)
    },[])
    const closeModal = useCallback(() => {
        setModalIsOpen(false)
    },[])

    return (
        <div>
            <button className='modal_html' onClick={openModal}>Добавить задачи</button>
        <Modal className='modal' isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className='divform'>
        <form className='form'>
            <button className='btn1' onClick={e => {
            e.preventDefault();
            props.putTodo(value);
            setValue('');
        }}>Создать задачу</button>
            <button className='btn2' onClick={e => {
                closeModal();
                e.preventDefault();
            }}>Отмена</button>
            <input type="text" placeholder='Введите новую задачу' className='input' value={value} onChange={(e) => setValue(e.target.value)}/>
        </form>
        </div>
        </Modal>
        </div>
        
    )
}

export default Form;