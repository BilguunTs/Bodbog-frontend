import React, { memo, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Link } from "react-router-dom";

//import { CardData } from "../types";
import { ContentPlaceholder } from "./ContentPlaceholder";
import { Title } from "./Title";
import { Image } from "./Image";
import { openSpring, closeSpring } from "./animations";
import { useInvertedBorderRadius } from "../../utils/use-inverted-border-radius";
import { useScrollConstraints } from "../../utils/use-scroll-constraints";
import { useWheelScroll } from "../../utils/use-wheel-scroll";
import { Button, List, Header, Grid } from "semantic-ui-react";
import { numberWithCommas } from "../../utils/number-withcomma";
// Distance in pixels a user has to scroll a card down before we recognise
// a swipe-to dismiss action.
const dismissDistance = 100;

export const Card = memo(
  ({
    isSelected,
    _id,
    herdType,
    price,
    image,
    history,
    weight,
    height,
    age,
    owner,
    color,
    amount,
    description,
    pointOfInterest,
    backgroundColor,
    published_date,
  }) => {
    const y = useMotionValue(0);
    const zIndex = useMotionValue(isSelected ? 2 : 0);

    // Maintain the visual border radius when we perform the layoutTransition by inverting its scaleX/Y
    const inverted = useInvertedBorderRadius(20);

    // We'll use the opened card element to calculate the scroll constraints
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelected);

    function checkSwipeToDismiss() {
      y.get() > dismissDistance && history.push("/");
    }

    function checkZIndex(latest) {
      if (isSelected) {
        zIndex.set(2);
      } else if (!isSelected && latest.scaleX < 1.01) {
        zIndex.set(0);
      }
    }

    // When this card is selected, attach a wheel event listener
    const containerRef = useRef(null);
    useWheelScroll(
      containerRef,
      y,
      constraints,
      checkSwipeToDismiss,
      isSelected
    );

    return (
      <li ref={containerRef} className={`Card`}>
        <Overlay isSelected={isSelected} />
        <div className={`Card-Content-Container ${isSelected && "Open"}`}>
          <motion.div
            ref={cardRef}
            className="Card-Content"
            style={{ ...inverted, zIndex, y }}
            layoutTransition={isSelected ? openSpring : closeSpring}
            drag={isSelected ? "y" : false}
            dragConstraints={constraints}
            onDrag={checkSwipeToDismiss}
            onUpdate={checkZIndex}
          >
            <Image
              id={_id}
              image={image}
              type={herdType}
              isSelected={isSelected}
              pointOfInterest={pointOfInterest}
              backgroundColor={backgroundColor}
            />
            <Link to={`/хэрэглэгч/${owner._id || null}`}>
              <div className="Avatar">
                <p style={{ color: "white" }}>
                  {" "}
                  {(owner.firstname && owner.firstname[0]) || "🦊"}
                </p>
              </div>
            </Link>
            <Title
              title={herdType}
              category={"таван хошуу"}
              isSelected={isSelected}
            />
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                color: "#fff",
              }}
            >
              <p>{published_date}</p>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: isSelected ? "40%" : "12px",
                left: isSelected ? "80%" : "12px",
              }}
            >
              <p color="white">{`${amount || 1}-${
                isSelected ? "ширхэг" : "ш"
              }`}</p>
            </div>
            <ContentPlaceholder>
              <Grid columns="2" verticalAlign="middle">
                <Grid.Column>
                  <List as="h4">
                    <List.Item>Нас:{age || <p>оруулаагүй</p>}</List.Item>
                    <List.Item>Жин:{weight || <p>оруулаагүй</p>}</List.Item>
                    <List.Item>Өндөр:{height || <p>оруулаагүй</p>}</List.Item>
                    <List.Item>Зүс:{color || <p>оруулаагүй</p>}</List.Item>
                    <List.Item>
                      <Header color="green">
                        үнэ-{numberWithCommas(price)}₮
                      </Header>
                    </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column textAlign="right">
                  <Link to={`/зар/${_id}`}>
                    <Button color="orange" content="дэлэгрэнгүй" />
                  </Link>
                </Grid.Column>
              </Grid>

              <Header as="h4" inverted>
                Тайлбар:{description || <p>оруулаагүй</p>}
              </Header>
            </ContentPlaceholder>
          </motion.div>
        </div>
        {!isSelected && (
          <Link to={`/expand/${_id}`} className={`Card-Open-Link`} />
        )}
      </li>
    );
  },
  (prev, next) => prev.isSelected === next.isSelected
);

const Overlay = ({ isSelected }) => (
  <motion.div
    initial={false}
    animate={{ opacity: isSelected ? 1 : 0 }}
    transition={{ duration: 0.2 }}
    style={{ pointerEvents: isSelected ? "auto" : "none" }}
    className="Overlay"
  >
    <Link to="/" />
  </motion.div>
);
