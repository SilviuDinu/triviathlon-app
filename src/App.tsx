import LandingPage from '@pages/LandingPage/LandingPage';
import QuestionPage from '@pages/QuestionPage/QuestionPage';
import { categoriesMap } from '@utils/helpers';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import './App.scss';

export const App = () => {
  const [category, setCategory] = useState<string>(categoriesMap.entries().next().value[1]);

  return (
    <div className='page-container'>
      <div className='flex-column center content'>
        <Router>
          <Switch>
            <Route
              path=''
              element={
                <LandingPage
                  category={category}
                  onCategoryChoice={(category: string) => setCategory(category)}
                />
              }
            />
            <Route
              path='questions'
              element={<QuestionPage category={category} />}
            />
          </Switch>
        </Router>
      </div>
    </div>
  );
};
