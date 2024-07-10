import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const createCircleAnimation = () => {
  const x = useSharedValue(Math.random() * 100);
  const y = useSharedValue(Math.random() * 100);
  const r = useSharedValue(5 + Math.random() * 10);
  const duration = 2000 + Math.random() * 3000;

  useEffect(() => {
    x.value = withRepeat(
      withSequence(
        withTiming(Math.random() * 100, { duration, easing: Easing.linear }),
        withTiming(Math.random() * 100, { duration, easing: Easing.linear })
      ),
      -1,
      true
    );
    y.value = withRepeat(
      withSequence(
        withTiming(Math.random() * 100, { duration, easing: Easing.linear }),
        withTiming(Math.random() * 100, { duration, easing: Easing.linear })
      ),
      -1,
      true
    );
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    cx: x.value,
    cy: y.value,
    r: r.value,
  }));

  const color = getRandomColor();

  return { animatedProps, color };
};

export default function LoadingScreen ({visible}) {
  const circles = Array.from({ length: 10 }).map((_, i) => createCircleAnimation());

  return (
    <Modal
    transparent={true}
    animationType={'none'}
    visible={visible}
    onRequestClose={() => {}}>
    <View style={styles.container}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        {circles.map(({ animatedProps, color }, index) => (
          <AnimatedCircle
            key={index}
            fill={color}
            animatedProps={animatedProps}
          />
        ))}
      </Svg>
      <View style={styles.textContainer}>
        <Icon name="run" size={50} color="white" style={styles.icon} />
        <Text style={styles.text}>LOADING..</Text>
      </View>
    </View>
    </Modal>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: "center",
    height: 60,
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    width: "90%",
    marginBottom: 20,
    justifyContent: "space-around"
  },
  text: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center"
  }
});
