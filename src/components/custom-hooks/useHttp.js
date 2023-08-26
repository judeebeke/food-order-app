import { useState } from "react";

const useHttp = (getError) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitOrder, setIsSubmitOrder] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const httpRequest = async (url, postFormat) => {
    setIsSubmitting(true)

    try {
      let response = await fetch(url, postFormat === undefined ? {} : {
        method: postFormat.method,
        headers: postFormat.header,
        body: JSON.stringify(postFormat.body)
      });

      if (!response.ok) {
        throw new Error();
      }

      let data = await response.json();

      if(postFormat !== undefined && postFormat.method === 'POST') {
        setIsSubmitting(false)
        setIsSubmitOrder(true)
        setIsLoading(false);
        console.log('POST REQUEST')
        return;
      } 

      let transformData = [];

      for (let meal of Object.keys(data)) {
        transformData.push({
          id: meal,
          name: data[meal].name,
          price: data[meal].price,
          description: data[meal].description,
        });
      }

      setIsLoading(false);
      setMeals(transformData);
    } catch (error) {
      setIsLoading(false);
      isSubmitOrder(false)
      getError("Something went wrong!");
    }
  };

  return {
    meals,
    isLoading,
    isSubmitOrder,
    isSubmitting,
    httpRequest
  };
};

export default useHttp;
