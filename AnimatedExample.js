import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  Animated,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const forceJs = loops => {
  for (let i = 0; i < loops; i++) {
    const rand1 = Math.random();
    const rand2 = Math.random();
    setTimeout(() => {
      forceJs(rand1 ** rand2);
    }, 1);
  }
};
const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: 'rgb(250, 205, 51)',
    alignItems: 'center',
  },
  welcome: {
    position: 'absolute',
    top: 0,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'rgb(64, 19, 62)',
    zIndex: 1000,
  },
  sun: {
    position: 'absolute',
    top: 0.15 * windowHeight,
    width: 0.8 * windowWidth,
    height: 0.8 * windowWidth,
    borderRadius: (0.8 * windowWidth) / 2,
    backgroundColor: 'rgb(250, 228, 152)',
    borderColor: 'rgb(250, 213, 106)',
    borderWidth: 40,
  },
  loginView: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: '-15%',
    height: '85%',
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  input: {
    fontFamily: 'Helvetica',
    fontSize: 13,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(202, 202, 202)',
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  buttonView: {
    backgroundColor: 'rgb(250, 205, 51)',
    alignItems: 'center',
    width: '60%',
    justifyContent: 'center',
    borderRadius: 17.5,
    height: 35,
    marginVertical: 40,
  },
  buttonText: {
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 17,
  },
});

export default class AnimatedExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 0: Normal
      // 1: Keyboard opened
      animation: new Animated.Value(0),
    };
  }

  componentDidMount() {
    forceJs(1000);
    const { animation } = this.state;
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }

  render() {
    const { animation } = this.state;
    return (
      <View style={styles.bg}>
        <Animated.Text
          style={[
            styles.welcome,
            {
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.15 * windowHeight, 0.05 * windowHeight],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          Welcome!
        </Animated.Text>
        <Animated.View
          style={[
            styles.sun,
            {
              transform: [
                {
                  scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 3],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.loginView,
            {
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -0.15 * windowHeight],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          <Animated.View
            style={{
              position: 'absolute',
              alignItems: 'center',
              width: '100%',
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    /* Since we can't animate between justifyContent: center and flex-start,
                this initially aligns the items on center */
                    outputRange: [(0.7 * windowHeight - (35 + 40 + 69 * 2)) / 2, 50],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}
          >
            <TextInput style={styles.input} placeholder="USERNAME" />
            <TextInput style={styles.input} placeholder="PASSWORD" />
            <TouchableOpacity style={styles.buttonView}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}
