import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SelectOptions } from './SelectOptions';

export function CustomSelect(props) {
  const { options, value, placeholder, onChange, isLoading = false } = props;
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <SelectWrapper ref={ref}>
      <SelectHeader
        $isPlaceholder={!value}
        onClick={() => setOpen((prev) => !prev)}
      >
        <HeaderText title={value || placeholder}>
          {value || placeholder}
        </HeaderText>
        {value ? (
          <ClearButton
            onClick={(e) => {
              e.stopPropagation();
              onChange('');
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12L8 8L12 12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 4L8 8L12 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ClearButton>
        ) : (
          <Arrow $open={open}>
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.800049 0.800049L4.80005 4.80005L8.80005 0.800049"
                stroke="#B2B2B2"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Arrow>
        )}
      </SelectHeader>

      {open && (
        <SelectOptions
          value={value}
          options={options}
          isLoading={isLoading}
          setOpen={setOpen}
          onChange={onChange}
        />
      )}
    </SelectWrapper>
  );
}

const BaseField = `
  font-family: Inter, sans-serif;
  background: #263750;
  border: 1px solid #83BF46;
  border-radius: 12px;
  padding: 12px 16px;
  color: #cfcfcf;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s ease;

  &:focus {
    outline: none;
    border-color: #7dffab;
  }
`;

const HeaderText = styled.span`
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 180px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const SelectHeader = styled.div`
  ${BaseField};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ $isPlaceholder }) => ($isPlaceholder ? '#B3B3B3' : '#F5F5F5')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: #334466;
  }
`;

const Arrow = styled.span`
  transition: 0.2s ease;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0)')};
`;

const ClearButton = styled.div`
  color: #ffffff;
  transition: color 0.2s ease;

  &:hover {
    color: #83bf46;
  }
`;
