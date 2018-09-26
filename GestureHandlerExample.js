import React from 'react';
import { Animated, Image } from 'react-native';
import { GestureHandler } from 'expo';

const { PanGestureHandler, PinchGestureHandler, RotationGestureHandler, State } = GestureHandler;

const pinchRef = React.createRef();
const rotateRef = React.createRef();
const panRef = React.createRef();

export default class GestureHandlerExample extends React.Component {
  constructor(props) {
    super(props);
    this.baseScale = new Animated.Value(1);
    this.pinchScale = new Animated.Value(1);
    this.scale = Animated.multiply(this.baseScale, this.pinchScale);
    this.lastScale = 1;
    this.pan = new Animated.ValueXY({ x: 0, y: 0 });
    this.rotation = new Animated.Value(0);
    this.onPan = Animated.event([
      { nativeEvent: { translationX: this.pan.x, translationY: this.pan.y } },
    ]);
    this.onPinch = Animated.event([{ nativeEvent: { scale: this.pinchScale } }]);
    this.onRotate = Animated.event([{ nativeEvent: { rotation: this.rotation } }]);
  }

  onStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      this.pan.x.extractOffset();
      this.pan.y.extractOffset();
      this.rotation.extractOffset();
      if (nativeEvent.scale) {
        this.lastScale *= nativeEvent.scale;
        this.baseScale.setValue(this.lastScale);
        this.pinchScale.setValue(1);
      }
    }
  };

  render() {
    const { pan, rotation } = this;
    return (
      <RotationGestureHandler
        ref={rotateRef}
        simultaneousHandlers={[pinchRef, panRef]}
        onGestureEvent={this.onRotate}
        onHandlerStateChange={this.onStateChange}
      >
        <PinchGestureHandler
          ref={pinchRef}
          simultaneousHandlers={[panRef, rotateRef]}
          onGestureEvent={this.onPinch}
          onHandlerStateChange={this.onStateChange}
        >
          <PanGestureHandler
            ref={panRef}
            simultaneousHandlers={[pinchRef, rotateRef]}
            onGestureEvent={this.onPan}
            onHandlerStateChange={this.onStateChange}
          >
            <Animated.View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                transform: [
                  { scale: this.scale },
                  {
                    rotate: rotation.interpolate({
                      inputRange: [-100, 100],
                      outputRange: ['-100rad', '100rad'],
                    }),
                  },
                  { translateX: pan.x },
                  { translateY: pan.y },
                ],
              }}
            >
              <Image source={require('./assets/map.png')} />
            </Animated.View>
          </PanGestureHandler>
        </PinchGestureHandler>
      </RotationGestureHandler>
    );
  }
}
