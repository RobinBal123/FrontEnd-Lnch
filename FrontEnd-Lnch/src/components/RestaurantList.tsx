import React, { useEffect, useState } from "react";
import styles from "./RestaurantList.module.css";

interface Restaurant {
  id: number;
  name: string;
  priceRange: string;
  distance: number;
  cuisine: string;
}

const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    fetch("http://localhost:5241/api/restaurants")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        setRestaurants(data);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
      });
  }, []);

  return (
    <div className={styles.restaurantContainer}>
      <h2 className={styles.title}>Restauranger i närheten</h2>
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className={styles.restaurantCard}>
          <div className={styles.cardContent}>
            <div className={styles.left}>
              <h3 className={styles.restaurantName}>{restaurant.name}</h3>
              <p>
                {" "}
                <strong>Price range: </strong>
                {restaurant.priceRange}
              </p>
              <p>
                {" "}
                <strong>Distance: </strong>
                {restaurant.distance}
              </p>
              <p>
                <strong>Cuisine: </strong>
                {restaurant.cuisine}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
