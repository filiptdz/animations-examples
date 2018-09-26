import React from 'react';
import { StyleSheet, Animated, Dimensions, PanResponder } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  chatHead: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

const throttle = i => {
  const value1 = Math.random() * i;
  const value2 = Math.random() * i;
  setTimeout(() => {
    throttle(value1 ** value2);
  }, 0.01);
};
export default class AnimatedChatHeads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: new Animated.Value(-25),
      pan: new Animated.ValueXY({ y: windowHeight * 0.1 + 25, x: windowWidth * 0.8 + 25 }),
      follow1: new Animated.ValueXY({ y: windowHeight * 0.1 + 25, x: windowWidth * 0.8 + 25 }),
      follow2: new Animated.ValueXY({ y: windowHeight * 0.1 + 25, x: windowWidth * 0.8 + 25 }),
    };
    Animated.spring(this.state.follow1, {
      toValue: this.state.pan,
      tension: 0.8,
      friction: 3,
    }).start();
    Animated.spring(this.state.follow2, {
      toValue: this.state.follow1,
      tension: 0.8,
      friction: 3,
    }).start();
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([
        null,
        { moveX: this.state.pan.x, moveY: this.state.pan.y },
      ]),
      onPanResponderRelease: () => {
        Animated.spring(this.state.pan, {
          toValue: { y: windowHeight * 0.1 + 25, x: windowWidth * 0.8 + 25 },
          tension: 0.8,
          friction: 3,
        }).start();
      },
    });
  }

  componentDidMount() {
    // for (let i = 0; i < 300; i++) {
    //   throttle(i);
    // }
  }

  render() {
    const { pan, width, follow1, follow2 } = this.state;
    return (
      <React.Fragment>
        <Animated.View
          style={[
            styles.chatHead,
            {
              backgroundColor: 'darkgreen',
              transform: [
                { translateX: Animated.add(follow2.x, width) },
                { translateY: Animated.add(follow2.y, width) },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.chatHead,
            {
              backgroundColor: 'magenta',
              transform: [
                { translateX: Animated.add(follow1.x, width) },
                { translateY: Animated.add(follow1.y, width) },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.chatHead,
            {
              backgroundColor: 'cyan',
              transform: [
                { translateX: Animated.add(pan.x, width) },
                { translateY: Animated.add(pan.y, width) },
              ],
            },
          ]}
          {...this._panResponder.panHandlers}
        />
      </React.Fragment>
    );
  }
}
