import styled from 'styled-components';

export function CustomInput({ value, placeholder, onChange }) {
  return (
    <StyledInput
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

const BaseField = `
  font-family: Inter, sans-serif;
  background: #263750;
  border: 1px solid #83BF46;
  border-radius: 12px;
  padding: 12px 16px;
  color: #F5F5F5;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s ease;

  &:focus {
    outline: none;
    border-color: #7dffab;
  }
  
    @media (max-width: 600px) {
    width: 100%;
  }
`;

const StyledInput = styled.input`
  ${BaseField};
  width: 180px;
  cursor: text;

  &::placeholder {
    color: #b3b3b3;
    opacity: 1; /* важно для Safari */
  }

  &:hover {
    background: #334466;
  }
`;
