import { ComponentRef } from '@angular/core';

interface MarvelModalActionConfig {
  confirm?: {
    label: string;
    actionType?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'none';
    actionColor?: 'theme' | 'error' | 'warning' | 'success' | 'question';
    keepOnAction?: boolean;
    action?: Function;
  };
  cancel?: {
    label: string;
    actionType?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'none';
    actionColor?: 'theme' | 'error' | 'warning' | 'success' | 'question';
    keepOnAction?: boolean;
    action?: Function;
  };
  firstAction?: {
    label: string;
    icon?: string;
    iconPosition?: 'left' | 'right';
    actionType?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'none';
    actionColor?: 'theme' | 'error' | 'warning' | 'success' | 'question';
    keepOnAction?: boolean;
    action?: Function;
  };
  secondAction?: {
    label: string;
    icon?: string;
    iconPosition?: 'left' | 'right';
    actionType?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'none';
    actionColor?: 'theme' | 'error' | 'warning' | 'success' | 'question';
    keepOnAction?: boolean;
    action?: Function;
  };
  thirdAction?: {
    label: string;
    icon?: string;
    iconPosition?: 'left' | 'right';
    actionType?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'none';
    actionColor?: 'theme' | 'error' | 'warning' | 'success' | 'question';
    keepOnAction?: boolean;
    action?: Function;
  };
}

export interface MarvelModalConfig {
  color?: 'theme' | 'error' | 'warning' | 'success' | 'question';
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  hideClose?: boolean;
  action?: MarvelModalActionConfig;
  data?: any;
}

export interface MarvelModalRefs<T> {
  id: string;
  component: ComponentRef<T>;
}
