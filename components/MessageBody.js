import React from 'react';
import { useState } from 'react';
import MessageBar from './MessageBar';
import { Message } from './Message';
// import fetch from 'isomorphic-fetch';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const HistoryContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  overflow-y: auto;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const BarContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background-color: white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-top: 1px solid #ccc;
    z-index: 1;
  }
`;

export const MessageBody = ({ product }) => {
  const [message, setMessage] = useState({});
  const [workoutPlan, setWorkoutPlan] = useState({});
  const [loading, setLoading] = useState(false);
  const [workoutType, setWorkoutType] = useState(null);

  const handleSelectChange = (event) => {
    setWorkoutType(event.target.value);
    console.log(
      '🚀 ~ file: MessageBody.js:69 ~ handleSelectChange ~ event.target.value:',
      event.target.value
    );
  };

  const onNewMessage = async (message) => {
    setMessage(() => [
      {
        text: message
          .replace(/^([\n]*)/g, '')
          .replace(/([\n]*)$/g, '')
          .trim(),
      },
    ]);
    setLoading(true);

    const response = await fetch('/.netlify/functions/queryopenai', {
      method: 'POST',
      body: JSON.stringify({ workoutType, product }),
    });
    const data = await response.json();
    console.log('🚀 ~ file: MessageBody.js:90 ~ onNewMessage ~ data:', data);

    setWorkoutPlan(() => [
      {
        text: data.result
          .replace(/^([\n]*)/g, '')
          .replace(/([\n]*)$/g, '')
          .trim(),
      },
    ]);
    setLoading(false);
  };

  return (
    <ModalContainer>
      <Container>
        <HistoryContainer>
          <MessageBar
            handleSelectChange={handleSelectChange}
            onNewMessage={onNewMessage}
            disabled={loading}
          />
          <Message message={message ? message : ''} />
        </HistoryContainer>
      </Container>
    </ModalContainer>
  );
};
