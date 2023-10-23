import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {NavigationProp} from '@react-navigation/native';
import {createErrorAlert} from '../helpers/AlertHelper';

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
}
