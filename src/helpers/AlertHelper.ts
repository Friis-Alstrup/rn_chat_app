import {Alert} from 'react-native';

export const createErrorAlert = (errorMessage: string) => {
  Alert.alert('Ups!', errorMessage, [{text: 'OK'}]);
};
