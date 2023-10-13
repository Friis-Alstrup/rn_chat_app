import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import useAuthStore from '../stores/useAuthStore';
import {NavigationProp} from '@react-navigation/native';

GoogleSignin.configure({
  webClientId:
    '617534986582-p1rb11vrfhpk0p5ta93am6pr0e0khm35.apps.googleusercontent.com',
});

export default async function onGoogleButtonPress(
  navigation: NavigationProp<any>,
) {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  await auth()
    .signInWithCredential(googleCredential)
    .then(userCredentials => {
      // Add UserCredentials to AuthStore
      useAuthStore.getState().login(userCredentials.user);

      // Navigate user to ChatList Screen
      navigation.navigate('ChatList');
    })
    .catch(error => {
      if (error.code === 'auth/account-exists-with-different-credential') {
        // TODO: show dialog if emails is in use.
      } else {
        // TODO: Show dialog with error message.
      }
    });
}
