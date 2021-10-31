import React from "react";
import styles from "./Card.module.scss";

interface Props {
  name: String;
  description?: String;
}

const Card = (props: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_title}>
        {props.name ? (
          <h3 className={styles.card_title__name}>{props.name}</h3>
        ) : (
          <div className="w-40 mb-2 bg-lime-600 h-6 animate-pulse"></div>
        )}
      </div>
      {props.description ? (
        <p className={styles.card_description}>{props.description}</p>
      ) : (
        <div className={styles.card_description}>
          <p className="w-full bg-lime-600 h-8 animate-pulse"></p>
        </div>
      )}
    </div>
  );
};

export default Card;
