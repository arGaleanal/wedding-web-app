import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppTheme } from '../store/utils/utils.selector';
import { setAppTheme } from '../store/utils/utils.action';

export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);

const ThemeProviderWrapper: React.FC = (props:any) => {
  const dispatch = useDispatch();
  const currentAppTheme = useSelector(selectAppTheme);
  const curThemeName = localStorage.getItem('appTheme') || currentAppTheme;
  dispatch(setAppTheme(curThemeName));
  const theme = themeCreator(curThemeName);

  return (
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
  );
};

export default ThemeProviderWrapper;
