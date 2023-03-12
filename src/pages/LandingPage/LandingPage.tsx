import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { categoriesMap } from '@utils/helpers';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

export const LandingPage = ({ onCategoryChoice }: any) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState(categoriesMap.entries().next().value[1]);

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <div className='landing-page-container flex-column center'>
      <Select
        className='mt-4 category-selector'
        value={category}
        label='Category'
        onChange={handleChange}>
        {Array.from(categoriesMap).map(([key, value]) => (
          <MenuItem
            key={value}
            onClick={() => onCategoryChoice(key)}
            value={value}>
            {key}
          </MenuItem>
        ))}
      </Select>
      <button
        className='mt-4'
        onClick={() => navigate('/questions')}>
        Play
      </button>
    </div>
  );
};

export default LandingPage;
