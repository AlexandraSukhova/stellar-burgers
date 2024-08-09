import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../services/slices/ingredient-slice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const params = useParams();

  const ingredientData = useSelector(getIngredients).find(
    (i) => i._id === params.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
