import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ScreenOrientation } from 'expo'
import * as IntentLauncher from 'expo-intent-launcher';
import * as DocumentPicker from 'expo-document-picker';


class App extends Component<{}, {}> {
  // Lock screen orientation to landscape as soon as App mounts
  async componentWillMount(){
    try {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
    } catch (error) {
      throw error
    } 
  }

//   Extra
// LIBRETRO:/data/data/com.retroarch/cores/some_core.so
// Extra
// ROM:/path/to/some_rom.gbc
// Package
// com.retroarch
// Class
// com.retroarch.browser.retroactivity.RetroActivityFuture
// Target    type?: string;
    // category?: string;
    // extra?: object;
    // data?: string;
    // flags?: number;
    // packageName?: string;
    // className?: string;
// Activity

  openIntent = async () => {
    try {
      const { uri } = await DocumentPicker.getDocumentAsync()
      setTimeout(async () => {
        const options = {
          type: 'Activity',
          className: 'com.retroarch.browser.retroactivity.RetroActivityFuture',
          packageName: 'com.retroarch',
          extra: {
            CONFIGFILE: '/storage/emulated/0/Android/data/com.retroarch/files/retroarch.cfg',
            LIBRETRO: '/data/user/0/com.retroarch/cores/fceumm_libretro_android.so',
            ROM: '/storage/emulated/0/roms/1943 - The Battle of Midway (U).zip'
          }
        }
        await IntentLauncher.startActivityAsync('android.intent.action.MAIN', options)
      }, 5000)
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