import React from 'react';
import { useState } from 'react';
import { Message } from './Message';
import fetch from 'isomorphic-fetch';
import styled from 'styled-components';

const MessageBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  position: relative;
  font-family: 'Roboto', sans-serif;
  padding-top: 1rem;

  @media screen and (max-width: 480px) {
    padding: 0.5rem;
    max-width: 100%;
  }
`;

const FormContainer = styled.div`
  flex: 1;

  & > form {
    display: flex;
    align-items: center;

    & > select {
      font-family: 'Roboto', sans-serif;
      font-size: 1rem;
      padding: 0.5rem;
      margin-right: 1rem;
    }

    & > button {
      font-family: 'Roboto', sans-serif;
      font-size: 1rem;
      padding: 0.5rem 1rem;
      background-color: #4caf50;
      border: none;
      border-radius: 5px;
      color: #fff;
      cursor: pointer;

      &:hover {
        background-color: #3e8e41;
      }

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }
  }
`;

const WorkoutTypeHeader = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.25rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  & .modal-content {
    background-color: #fff;
    padding: 2rem;
    border-radius: 5px;
    max-width: 90%;
    max-height: 90%;
    overflow: auto;
    position: relative;
  }

  & .close-btn {
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
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
  const [workoutPlan, setWorkoutPlan] = useState('');
  const [workoutType, setWorkoutType] = useState('HIIT');
  const [disabled, setDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

    setWorkoutPlan(() => data.result.trim());

    setShowModal(true);
    setDisabled(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setWorkoutPlan('');
  };

  return (
    <>
      <MessageBarContainer>
        <WorkoutTypeHeader>
          {`Choose a workout type for the ${product}`}:
        </WorkoutTypeHeader>
        <FormContainer>
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
              Get Workout
            </button>
          </form>
        </FormContainer>
      </MessageBarContainer>
      {showModal && (
        <ModalContainer>
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseModal}>
              &times;
            </button>
            <Message message={workoutPlan ? workoutPlan : ''} />
          </div>
        </ModalContainer>
      )}
    </>
  );
};
