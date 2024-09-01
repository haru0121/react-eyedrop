"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.targetToCanvas = void 0;
const imageToCanvas_1 = require("./imageToCanvas");
const _html2canvas = require("html2canvas");
const errors_1 = require("../constants/errors");
const html2canvas = _html2canvas;
const targetToCanvas = (_target, isCORS) => __awaiter(void 0, void 0, void 0, function* () {
    let target = _target;
    // Remember original target element position
    let originalClientTop = target.getBoundingClientRect().top;
    let originalClientLeft = target.getBoundingClientRect().left;
    // Make sure svg color picking work
    for (let i = 0; i < 20; i++) {
        if (target instanceof HTMLElement) {
            break;
        }
        target = target === null || target === void 0 ? void 0 : target.parentElement;
        // Element inside svg ex. path, will have target.offset(X|Y) referenced from outer svg tag not the path itself
        // This will make sure we got correct target pixel on svg element
        if (target.tagName === "svg") {
            originalClientTop = target.getBoundingClientRect().top;
            originalClientLeft = target.getBoundingClientRect().left;
        }
    }
    if (!(target instanceof HTMLElement)) {
        throw errors_1.TARGET_NOT_HTML_ELEMENT_ERROR;
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
        const targetCanvas = yield (0, imageToCanvas_1.imageToCanvas)(target);
        return {
            targetCanvas,
            targetPickXOffset,
            targetPickYOffset,
        };
    }
    // Make sure to have 1:1 scale so that it will pick correct color
    const targetCanvas = yield html2canvas(target, { logging: false, scale: 1, useCORS: isCORS });
    return {
        targetCanvas,
        targetPickXOffset,
        targetPickYOffset,
    };
});
exports.targetToCanvas = targetToCanvas;
