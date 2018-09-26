import React from 'react';
import { View, LayoutAnimation, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class LayoutAnimationExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minimized: false,
    };
  }

  render() {
    const { minimized } = this.state;
    return (
      <View style={styles.container}>
        <Button
          title="Toggle"
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState(p => ({ ...p, minimized: !p.minimized }));
          }}
        />
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <View style={{ backgroundColor: 'green', height: 50, flex: minimized ? 2 : 1 }} />
          <View style={{ backgroundColor: 'blue', height: 50, flex: minimized ? 0.5 : 1 }} />
          <View style={{ backgroundColor: 'red', height: 50, flex: 1 }} />
        </View>
      </View>
    );
  }
}
