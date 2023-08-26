import {useEffect, useContext} from 'react'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import CartContext from '../../store/cart-context';
import useHttp from '../custom-hooks/useHttp';

const AvailableMeals = () => {
  const cartCtx = useContext(CartContext);
  const {httpError, setHttpError} = cartCtx;

  const {meals, isLoading, httpRequest: fetchMeals} = useHttp(setHttpError)

  useEffect(() => {
        fetchMeals("https://resturant-list-f5d9d-default-rtdb.firebaseio.com/meals.json")
  }, [fetchMeals])

  let content = ''

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if(isLoading) {
    content = <section className={classes.mealLoader}>
        <h3><em>Loading...</em></h3>
    </section>
  }

  if(httpError) {
    content = <section className={classes.mealError}>
        <h3>{httpError}</h3>
        <div className={classes.actions}>
        <button className={classes.button} onClick={()=>{fetchMeals()}}>
           Try Again
        </button>
      </div>
    </section>
  }

  return (
    <section className={classes.meals}>
      <Card>
        {!isLoading && !httpError ? <ul>{mealsList}</ul> : content}
      </Card>
    </section>
  );
};

export default AvailableMeals;
