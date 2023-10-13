import {Text, StyleSheet, View, Button} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import onGoogleButtonPress from '../auth/Google';
import {ScreenProp} from '../types/ScreenProp';
import onFacebookButtonPress from '../auth/Facebook';

export default function LoginScreen({navigation}: ScreenProp): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Chat</Text>
      </View>
      <View style={styles.buttonSection}>
        <Button
          title="Log ind med Google"
          color="#ea4335"
          onPress={() => onGoogleButtonPress(navigation)}
        />
        <Button
          title="Log ind med Facebook"
          color="#0866ff"
          onPress={() => onFacebookButtonPress(navigation)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 200,
  },
  headerSection: {},
  title: {
    fontSize: 32,
    fontWeight: '500',
  },
  buttonSection: {
    width: 250,
    gap: 25,
  },
});