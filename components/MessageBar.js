import { useRef, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';

const MessageBarContainer = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  width: ${({ hasFocus }) => (hasFocus ? '90%' : '100%')};
  position: ${({ hasFocus }) => (hasFocus ? 'absolute' : 'relative')};
  bottom: 0;

  @media screen and (max-width: 480px) {
    padding: 0.5rem;
    max-width: 100%;
  }
`;

const StyledTextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  width: 60%;
  font-size: 1rem;
  resize: none;
  overflow: hidden;
  outline: none;
  transition: height 0.3s ease-in-out;
  box-shadow: ${({ hasFocus }) =>
    hasFocus && '0px 4px 4px rgba(0, 0, 0, 0.25)'};

  &:focus {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  @media screen and (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
`;

const SendButton = styled.button`
  background-color: #1d4ed8;
  color: white;
  border-radius: 1.5rem;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }

  &:disabled {
    background-color: #718096;
    cursor: not-allowed;
  }

  @media screen and (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
`;

const SendIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
`;

const MessageBar = ({ disabled, handleSelectChange }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('firing handleSubmit');

    // onNewMessage(message);
  };

  //   function messageReducer(state, action) {
  //     switch (action.type) {
  //       case 'set':
  //         return action.payload;
  //       case 'reset':
  //         return '';
  //       default:
  //         return state;
  //     }
  //   }

  //   const resetMessage = () => {
  //     dispatchMessage({ type: 'reset' });
  //   };

  //   const setMessage = (message) => {
  //     dispatchMessage({ type: 'set', payload: message });
  //   };

  //   const textAreaRef = useRef();
  //   const buttonRef = useRef(null);

  //   const resize = () => {
  //     textAreaRef.current.style.height = 'inherit';
  //     textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  //   };

  //   useEffect(() => {
  //     resize();
  //   }, [message]);

  //   const tryNewMessage = () => {
  //     if (message.trim() !== '') {
  //       onNewMessage(message);
  //       resetMessage();
  //     }
  //   };

  //   const handleKeyDown = (event) => {
  //     if (event.key === 'Enter') {
  //       event.preventDefault();
  //       if (!event.ctrlKey && event.shiftKey !== true) {
  //         buttonRef.current.click();
  //       }
  //     }
  //   };

  return (
    <MessageBarContainer>
      <form onSubmit={handleSubmit}>
        <select onChange={handleSelectChange}>
          <option value="HIIT">HIIT</option>
          <option value="Cardio">Cardio</option>
          <option value="Performance">Performance</option>
          <option value="Endurance">Endurance</option>
          <option value="Flexibility">Flexibility</option>
          <option value="Strength">Strength</option>
        </select>
        <button type="submit" disabled={disabled}>
          Send
        </button>
      </form>
      {/* <SendButton
        ref={buttonRef}
        disabled={disabled}
        onClick={() => {
          tryNewMessage();
          resetMessage();
        }}
        id="sendButton"
      >
        <SendIcon
          src={disabled ? '/loading.svg' : '/icon-send.png'}
          className={`w-6 h-6 }`}
          alt=""
        />
      </SendButton> */}
    </MessageBarContainer>
  );
};

export default MessageBar;
