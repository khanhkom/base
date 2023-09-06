import {DefaultTheme, MD3Colors} from 'react-native-paper';
import {MD3Theme} from 'react-native-paper/src/types';
import * as ThemeConfig from '../theme.json';
export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...ThemeConfig.schemes.light,
    surfaceDisabled: '#D8DADA',
    onSurfaceDisabled: '#999999',
    backdrop: 'rgba(0, 0, 0, 0.55)',
    backdropStatusbar: 'rgba(0, 0, 0, 0.05)',
    warningColor: '#805600',
    warningOnColor: '#FFFFFF',
    warningColorContainer: '#FFDDB0',
    warningOnColorContainer: '#281800',
    linearSuccessStart: '#87E8DE',
    linearSuccessMiddle: '#A2EFE6',

    linearSuccessEnd: '#E6FFFB',
    linearErrorStart: '#FFA39E',
    linearErrorMiddle: '#F8BEBA',
    linearErrorEnd: '#EFF5F4',
    successColor: '#266D00',
  },
};
export const colorExpandLight = {
  warningColor: '#805600',
  warningOnColor: '#FFFFFF',
  warningColorContainer: '#FFDDB0',
  warningOnColorContainer: '#281800',
  linearSuccessStart: '#87E8DE',
  linearSuccessMiddle: '#A2EFE6',

  linearSuccessEnd: '#E6FFFB',
  linearErrorStart: '#FFA39E',
  linearErrorMiddle: '#F8BEBA',
  linearErrorEnd: '#EFF5F4',
  successColor: '#266D00',
};
export type IColorsTheme = typeof lightTheme.colors;
