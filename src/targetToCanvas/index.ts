import { imageToCanvas } from './imageToCanvas'
import * as _html2canvas from 'html2canvas'
import { TARGET_NOT_HTML_ELEMENT_ERROR } from '../constants/errors'

const html2canvas = _html2canvas as any as (element: HTMLElement, options?: Partial<_html2canvas.Options>) => Promise<HTMLCanvasElement>;

export const targetToCanvas = async (_target: HTMLElement,isCORS?:boolean,proxy?:string): Promise<{
  targetCanvas: HTMLCanvasElement,
  targetPickXOffset: number,
  targetPickYOffset: number
}> => {
  let target = _target;

  // Remember original target element position
  let originalClientTop = target.getBoundingClientRect().top;
  let originalClientLeft = target.getBoundingClientRect().left;

  // Make sure svg color picking work
  for (let i = 0; i < 20; i++) {
    if (target instanceof HTMLElement) {
      break;
    }
    target = (target as HTMLElement)?.parentElement;

    // Element inside svg ex. path, will have target.offset(X|Y) referenced from outer svg tag not the path itself
    // This will make sure we got correct target pixel on svg element
    if (target.tagName === "svg") {
      originalClientTop = target.getBoundingClientRect().top;
      originalClientLeft = target.getBoundingClientRect().left;
    }
  }

  if (!(target instanceof HTMLElement)) {
    throw TARGET_NOT_HTML_ELEMENT_ERROR;
  }

  // Compute offset after if target element position is changed
  const newClientTop = target.getBoundingClientRect().top;
  const newClientLeft = target.getBoundingClientRect().left;

  let targetPickXOffset = 0;
  let targetPickYOffset = 0;
  if (originalClientLeft > newClientLeft) {
    targetPickXOffset = originalClientLeft - newClientLeft;
  }
  if (originalClientTop > newClientTop) {
    targetPickYOffset = originalClientTop - newClientTop;
  }

  if (target instanceof HTMLImageElement) {
    // This approach is not workable with transparent image, but it is tradeoff for better performance
    const targetCanvas = await imageToCanvas(target);
    return {
      targetCanvas,
      targetPickXOffset,
      targetPickYOffset,
    };
  }

  // Make sure to have 1:1 scale so that it will pick correct color
  const html2canvasOptions = {
    scale: 1,
    useCORS: isCORS,
    logging: false,
  } as Partial<_html2canvas.Options>
  if(proxy){
    html2canvasOptions.proxy = proxy
  }
  const targetCanvas = await html2canvas(target, html2canvasOptions);
  return {
    targetCanvas,
    targetPickXOffset,
    targetPickYOffset,
  };
}