import {DefaultTheme} from 'react-native-paper';
import * as ThemeConfig from '../theme.json';

export const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...ThemeConfig.schemes.dark,
    surfaceDisabled: '#D8DADA',
    onSurfaceDisabled: '#999999',
    backdrop: 'rgba(0, 0, 0, 0.55)',
    backdropStatusbar: 'rgba(0, 0, 0, 0.05)',
    warningColor: '#FFBA45',
    warningOnColor: '#442C00',
    warningColorContainer: '#614000',
    warningOnColorContainer: '#FFDDB0',
    linearSuccessStart: '#00A69C',
    linearSuccessMiddle: '#00C4B7',

    linearSuccessEnd: 'rgba(142, 255, 240, 0.7)',
    linearErrorStart: '#FF6D67',
    linearErrorMiddle: '#FF8783',
    linearErrorEnd: '#F5F9F8',
    successColor: '#6DE039',
  },
};
export const colorExpandDark = {
  warningColor: '#FFBA45',
  warningOnColor: '#442C00',
  warningColorContainer: '#614000',
  warningOnColorContainer: '#FFDDB0',
  linearSuccessStart: '#00A69C',
  linearSuccessMiddle: '#00C4B7',

  linearSuccessEnd: 'rgba(142, 255, 240, 0.7)',
  linearErrorStart: '#FF6D67',
  linearErrorMiddle: '#FF8783',
  linearErrorEnd: '#F5F9F8',
  successColor: '#6DE039',
};
