import React from "react";
import { motion, useInvertedScale } from "framer-motion";
import { closeSpring } from "./animations";
import HImage from "../Image";
export const Image = ({
  image,
  isSelected,
  pointOfInterest = 0,
  backgroundColor,
  type,
}) => {
  const inverted = useInvertedScale();

  return (
    <motion.div
      className="Card-Image-Container"
      style={{
        ...inverted,
        backgroundColor,
        opacity: 0.7,
        originX: 0,
        originY: 0,
      }}
    >
      <HImage image={image} type={type} />
      <motion.img
        className="Card-Image"
        src={image}
        alt=""
        initial={false}
        animate={
          isSelected ? { x: -20, y: -20 } : { x: -pointOfInterest, y: 0 }
        }
        transition={closeSpring}
      />
    </motion.div>
  );
};
