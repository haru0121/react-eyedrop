export declare const targetToCanvas: (_target: HTMLElement, isCORS?: boolean, proxy?: string) => Promise<{
    targetCanvas: HTMLCanvasElement;
    targetPickXOffset: number;
    targetPickYOffset: number;
}>;
