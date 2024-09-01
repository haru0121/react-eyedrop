import * as React from 'react';
import { OnChangeEyedrop } from './types';
type Props = {
    onChange: (changes: OnChangeEyedrop) => void;
    wrapperClasses?: string;
    buttonClasses?: string;
    customComponent?: React.FC<any>;
    once?: boolean;
    proxy?: string;
    isCORS?: boolean;
    cursorActive?: string;
    cursorInactive?: string;
    cursorAwait?: string;
    onInit?: () => void;
    onPickStart?: () => void;
    onPickEnd?: () => void;
    onExtractColor?: () => void;
    colorsPassThrough?: string;
    pickRadius?: number;
    disabled?: boolean;
    children?: React.ReactNode;
    customProps?: {
        [key: string]: any;
    };
};
export declare const EyeDropper: (props: Props) => React.JSX.Element;
export {};
