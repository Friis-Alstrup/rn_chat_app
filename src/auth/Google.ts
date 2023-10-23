import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {NavigationProp} from '@react-navigation/native';
import {createErrorAlert} from '../helpers/AlertHelper';

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
    .then(() => {
      // Navigate user to ChatList Screen
      navigation.navigate('ChatList');
    })
    .catch(error => {
      if (error.code === 'auth/account-exists-with-different-credential') {
        createErrorAlert(
          'Der findes allerede en konto med denne email-adresse, via en anden udbyder.',
        );
      } else {
        createErrorAlert(error.message);
      }
    });
}
