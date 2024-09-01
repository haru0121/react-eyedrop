import { HookOptions } from './types';
declare const initialStateColors: {
    rgb: string;
    hex: string;
};
type ReturnValue = [typeof initialStateColors, () => void, () => void];
export declare const useEyeDrop: ({ once, pickRadius, cursorActive, cursorInactive, cursorAwait, customProps, onPickStart, onPickEnd, onPickCancel, onExtractColor, onChange, }?: HookOptions) => ReturnValue;
export {};
