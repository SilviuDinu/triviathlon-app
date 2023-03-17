import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { categoriesMap } from '@utils/helpers';
import { useNavigate } from 'react-router-dom';
import './style.scss';

export const LandingPage = ({ onCategoryChoice, category }: any) => {
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    onCategoryChoice(event.target.value as string);
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
