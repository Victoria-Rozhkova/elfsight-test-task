import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CustomSelect } from '../ui/select';
import { CustomInput } from '../ui/input';
import { Button } from '../ui/button';
import { useData } from '../providers';
import { API_URL } from '../providers/DataProvider';
import axios from 'axios';

export function Filters() {
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [loadingSpecies, setLoadingSpecies] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    gender: '',
    species: '',
    name: '',
    type: ''
  });
  const { setApiURL } = useData();

  const applyHandler = () => {
    const query = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        query.append(key, value);
      }
    });

    setApiURL(`${API_URL}?${query.toString()}`);
  };

  const resetHandler = () => {
    setFilters({
      status: '',
      gender: '',
      species: '',
      name: '',
      type: ''
    });

    setApiURL(API_URL);
  };

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const firstPage = await axios.get(`${API_URL}?page=1`);
        const totalPages = firstPage.data.info.pages;

        // Создаем массив промисов для всех страниц
        const promises = [];
        for (let i = 1; i <= totalPages; i++) {
          promises.push(axios.get(`${API_URL}?page=${i}`));
        }

        const results = await Promise.all(promises);

        const allSpecies = new Set();
        results.forEach((res) => {
          res.data.results.forEach((char) => allSpecies.add(char.species));
        });

        setSpeciesOptions(Array.from(allSpecies));
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSpecies(false);
      }
    };

    fetchSpecies();
  }, []);

  return (
    <StyledFilter>
      <TopRow>
        <CustomSelect
          placeholder="Status"
          options={['Alive', 'Dead', 'Unknown']}
          value={filters.status}
          onChange={(newValue) =>
            setFilters((prev) => ({
              ...prev,
              status: newValue
            }))
          }
        />
        <CustomSelect
          placeholder="Gender"
          options={['Male', 'Female', 'Genderless', 'Unknown']}
          value={filters.gender}
          onChange={(newValue) =>
            setFilters((prev) => ({
              ...prev,
              gender: newValue
            }))
          }
        />
        <CustomSelect
          placeholder="Species"
          options={speciesOptions}
          value={filters.species}
          isLoading={loadingSpecies}
          onChange={(newValue) =>
            setFilters((prev) => ({
              ...prev,
              species: newValue
            }))
          }
        />
      </TopRow>
      <BottomRow>
        <CustomInput
          placeholder="Name"
          value={filters.name}
          onChange={(newValue) =>
            setFilters((prev) => ({
              ...prev,
              name: newValue
            }))
          }
        />
        <CustomInput
          placeholder="Type"
          value={filters.type}
          onChange={(newValue) =>
            setFilters((prev) => ({
              ...prev,
              type: newValue
            }))
          }
        />
        <ButtonRow>
          <Button variant="apply" onClick={applyHandler}>
            Apply
          </Button>
          <Button variant="reset" onClick={resetHandler}>
            Reset
          </Button>
        </ButtonRow>
      </BottomRow>
    </StyledFilter>
  );
}

const StyledFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 930px) {
    gap: 15px;
  }

  @media (max-width: 600px) {
    max-width: 240px;
    width: 100%;
  }
`;

const TopRow = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 930px) {
    gap: 15px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const BottomRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: 930px) {
    gap: 15px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
