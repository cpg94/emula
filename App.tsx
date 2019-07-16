import React, { FunctionComponent } from 'react';
import consoles from './console.json'
import { StyleSheet, View, Button } from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';

const App: FunctionComponent<null> = () => {
  const openIntent = async (core_name: string, rom_path: string) => {
    try {
        const options = {
          type: 'Activity',
          className: 'com.retroarch.browser.retroactivity.RetroActivityFuture',
          packageName: 'com.retroarch',
          extra: {
            CONFIGFILE: '/storage/emulated/0/Android/data/com.retroarch/files/retroarch.cfg',
            LIBRETRO: `/data/user/0/com.retroarch/cores/${core_name}`,
            ROM: rom_path
          }
        }
        await IntentLauncher.startActivityAsync('android.intent.action.MAIN', options)
    } catch (error) {
      throw error
    }
  }

    return (
      <View style={styles.container}>
        {consoles.map(({ console, core_name, rom_path }) => (
          <Button key={core_name} title={console} onPress={() => openIntent(core_name, rom_path)}/>
        ))}
      </View>
    )
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