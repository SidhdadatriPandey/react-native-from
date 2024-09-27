declare module 'react-native-check-box' {
    import * as React from 'react';
    import { ViewStyle } from 'react-native';
  
    interface CheckBoxProps {
      isChecked: boolean;
      onClick: () => void;
      leftText?: string;
      leftTextStyle?: object;
      rightText?: string;
      rightTextStyle?: object;
      checkedImage?: React.ReactNode;
      unCheckedImage?: React.ReactNode;
      style?: ViewStyle;
      disabled?: boolean;
    }
  
    export default class CheckBox extends React.Component<CheckBoxProps> {}
  }
  
  declare module 'react-form-hook';