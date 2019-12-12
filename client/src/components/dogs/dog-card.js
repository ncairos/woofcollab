import React from "react";

const DogCard = ({ name, imgPath, imgName, age, sex }) => {
  return (
    <>
      <img src={imgPath} alt={imgName} />
      <h3>{name}</h3>
      <hr></hr>
      <p>
        <strong>Age:</strong> {age} año
        <br></br>
        <strong>Sex:</strong> {sex}
      </p>
    </>
  );
};

export default DogCard;
