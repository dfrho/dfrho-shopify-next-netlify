import React from 'react';
import { useState } from 'react';
import MessageBar from './MessageBar';
import { Message } from './Message';
import fetch from 'isomorphic-fetch';
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
  const [message, setMessage] = useState('');
  const [workoutPlan, setWorkoutPlan] = useState('');
  const [workoutType, setWorkoutType] = useState('HIIT');
  const [disabled, setDisabled] = useState(false);

  const handleSelectChange = (event) => {
    event.preventDefault();

    setWorkoutType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabled(true);

    const response = await fetch('/.netlify/functions/queryopenai', {
      method: 'POST',
      body: JSON.stringify({ workoutType, product }),
    });
    const data = await response.json();

    setWorkoutPlan(() =>
      data.result
        .replace(/^([\n]*)/g, '')
        .replace(/([\n]*)$/g, '')
        .trim()
    );

    console.log(
      '🚀 ~ file: MessageBody.js:106 ~ handleSubmit ~ workoutPlan:',
      workoutPlan
    );
    setDisabled(false);
  };

  return (
    <ModalContainer>
      <Container>
        <HistoryContainer>
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
          <Message message={message ? message : ''} />
        </HistoryContainer>
      </Container>
    </ModalContainer>
  );
};
