import styled from 'styled-components';

export function Button({ variant, children, ...props }) {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  background: transparent;
  border-radius: 8px;
  padding: 12px 21px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.25s ease;
  width: 100%;

  ${({ variant }) =>
    variant === 'apply'
      ? `
        border: 1px solid #8BE04E;
        color: #8BE04E;

        &:hover {
          background: #8BE04E;
          color: #001B33;
        }
      `
      : `
        border: 1px solid #FF5A5A;
        color: #FF5A5A;

        &:hover {
          background: #FF5A5A;
          color: #001B33;
        }
      `};

  @media (max-width: 930px) {
    padding: 12px 13px;
  }
`;
