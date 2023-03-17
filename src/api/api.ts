import { Question } from '@pages/QuestionPage/QuestionPage';
import { categoriesMap } from '@utils/helpers';
import axios from 'axios';

export const fetchQuestions = async ({
  category = categoriesMap.entries().next().value[1],
  amount = '10',
}): Promise<{ data: { results: Question[] } }> => {
  const params = new URLSearchParams({
    category: category,
    amount: String(amount),
  });

  return axios.get('https://opentdb.com/api.php', { params });
};
