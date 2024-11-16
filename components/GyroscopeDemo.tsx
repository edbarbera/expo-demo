import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Gyroscope } from "expo-sensors";
import * as Haptics from "expo-haptics";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const BALL_SIZE = 50;

const GyroscopeDemo = () => {
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const [isTouchingEdge, setIsTouchingEdge] = useState(false);

  useEffect(() => {
    Gyroscope.setUpdateInterval(16); // Update every 16ms (~60fps)

    const subscription = Gyroscope.addListener((gyroscopeData) => {
      const { x, y } = gyroscopeData;
      let newPositionX = positionX.value + x * 250; // Multiplier = 250
      let newPositionY = positionY.value + y * 100; // Multiplier = 100

      let hitEdge = false;

      // Lock ball in screen dimensions horizontally
      if (newPositionX < -SCREEN_WIDTH / 2 + BALL_SIZE / 2) {
        newPositionX = -SCREEN_WIDTH / 2 + BALL_SIZE / 2;
        hitEdge = true;
      } else if (newPositionX > SCREEN_WIDTH / 2 - BALL_SIZE / 2) {
        newPositionX = SCREEN_WIDTH / 2 - BALL_SIZE / 2;
        hitEdge = true;
      }

      // Lock ball in screen dimensions vertically
      if (newPositionY < -SCREEN_HEIGHT / 2 + BALL_SIZE / 2) {
        newPositionY = -SCREEN_HEIGHT / 2 + BALL_SIZE / 2;
        hitEdge = true;
      } else if (newPositionY > SCREEN_HEIGHT / 2 - BALL_SIZE / 2) {
        newPositionY = SCREEN_HEIGHT / 2 - BALL_SIZE / 2;
        hitEdge = true;
      }

      if (hitEdge && !isTouchingEdge) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setIsTouchingEdge(true);
      } else if (!hitEdge && isTouchingEdge) {
        setIsTouchingEdge(false);
      }

      positionX.value = withTiming(newPositionX, { duration: 100 });
      positionY.value = withTiming(newPositionY, { duration: 100 });
    });

    return () => subscription.remove();
  }, [isTouchingEdge]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ball, animatedStyle]}></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    backgroundColor: "blue",
  },
});

export default GyroscopeDemo;

