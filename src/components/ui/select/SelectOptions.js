import styled from 'styled-components';

export function SelectOptions(props) {
  const { options, value, setOpen, onChange, isLoading = false } = props;

  return (
    <Options>
      {!options?.length && !isLoading ? (
        <NoOptionText>Options not found</NoOptionText>
      ) : isLoading ? (
        <NoOptionText>Loading...</NoOptionText>
      ) : (
        options.map((option) => (
          <Option
            key={option}
            $active={option === value}
            onClick={() => {
              onChange(option);
              setOpen(false);
            }}
          >
            {option}
          </Option>
        ))
      )}
    </Options>
  );
}

const Options = styled.div`
  max-height: 160px;
  font-family: Inter, sans-serif;
  font-size: 16px;
  position: absolute;
  width: 100%;
  margin-top: 5px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  overflow: auto;
  z-index: 10;
`;

const NoOptionText = styled.div`
  padding: 15px;
  text-align: center;
`;

const Option = styled.div`
  padding: 7px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};

  &:hover {
    background: #83bf4633;
  }
`;
