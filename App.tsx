import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { ScreenOrientation } from 'expo'
import * as IntentLauncher from 'expo-intent-launcher';


class App extends Component<{}, {}> {
  async componentWillMount(){
    try {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
    } catch (error) {
      throw error
    } 
  }

  openIntent = async () => {
    try {
        const options = {
          type: 'Activity',
          className: 'com.retroarch.browser.retroactivity.RetroActivityFuture',
          packageName: 'com.retroarch',
        }
          await IntentLauncher.startActivityAsync('android.intent.action.MAIN', options)
    } catch (error) {
      throw error
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Button title="Open RetroArch" onPress={this.openIntent}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App