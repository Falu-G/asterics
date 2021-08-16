import React, { useState } from 'react'
import Modal from "react-modal"

function Modaal() {
    let subtitle;
    const [openModal, setOpenModal] = useState(false);

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

      
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }


    return (
        <div>
<h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
            <Modal isOpen={openModal}
                style={customStyles}
                onAfterOpen={afterOpenModal}
                contentLabel="Example Modal">
                <p>Modal</p>
                <button
                    onClick={() => setOpenModal(() => openModal ? false : true)}>Close</button>
            </Modal>
        </div>
    )
}

export default Modaal
