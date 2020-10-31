import React from "react";
import { motion, useInvertedScale } from "framer-motion";
import { Header } from "semantic-ui-react";
export const ContentPlaceholder = React.memo(({ children }) => {
  const inverted = useInvertedScale();
  return (
    <motion.div
      className="Content-Container"
      style={{ ...inverted, originY: 0, originX: 0 }}
    >
      <Header inverted>{children}</Header>
    </motion.div>
  );
});
