import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import useAuthStore from '../stores/useAuthStore';
import {NavigationProp} from '@react-navigation/native';

export default async function onFacebookButtonPress(
  navigation: NavigationProp<any>,
) {
  await LoginManager.logInWithPermissions(['public_profile', 'email']);

  const data = await AccessToken.getCurrentAccessToken();

  if (data) {
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth()
      .signInWithCredential(facebookCredential)
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
}
