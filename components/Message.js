import styled from 'styled-components';

const Bubble = styled.div`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  color: white;
  max-width: 60%;
  min-width: 4rem;
  padding: 1rem;
  border-radius: 1.5rem;
  break-word: break-word;
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  margin: 10px 0;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.8rem;
    max-width: 80%;
  }
`;

export const Message = ({ message }) => {
  const messageLines = typeof message === 'string' ? message.split('\n') : [];

  return (
    <>
      <Bubble>
        {messageLines &&
          messageLines.map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
      </Bubble>
    </>
  );
};
