/*
 * @Description: 下载PDF, 完整导出一页
 * @Author: luzc
 * @Date: 2021-08-16 17:56:55
 */
import html2canvas, { Options } from 'html2canvas';
import { jsPDF as JsPDF } from 'jspdf';

export type OptProps = {
  element: HTMLElement;
  filename?: string;
  html2canvasOptions?: Partial<Options>;
  customHandle?<T = void>(canvas: HTMLCanvasElement): T;
  onSuccess?<T = void>(): T;
  onError?<T = void>(): T;
};

export default ({
  element,
  filename,
  html2canvasOptions,
  onSuccess,
  onError,
  customHandle,
}: OptProps): void => {
  if (!element) {
    throw new Error('element cannot be null or undefined');
  }

  if (!(typeof element.nodeType === 'number' &&
    typeof element.nodeName === 'string')) {
    throw new Error('element must be HTMLElement');
  }

  // TODO: iconfont symbol svg 无效
  const svgElements = document.querySelectorAll('svg');
  svgElements.forEach(item => {
    item.setAttribute('width', `${item.getBoundingClientRect().width}`);
    item.setAttribute('height', `${item.getBoundingClientRect().height}`);
    item.style.width = '';
    item.style.height = '';
  });

  html2canvas(element, {
    useCORS: true,
    allowTaint: true,
    ...(html2canvasOptions || {})
  })
    .then(canvas => {
      if (typeof customHandle === 'function') {
        customHandle(canvas);
        return;
      }

      const w = canvas.width;
      const h = canvas.height;

      const data = canvas.toDataURL('image/jpeg', 1.0);

      const pdf = w > h ? new JsPDF('l', 'px', [w, h]) : new JsPDF('p', 'px', [w, h]);
      pdf.addImage(data, 'jpeg', 0, 0, w, h);
      pdf.save(filename?.endsWith('.pdf') ? filename : `${filename}.pdf`);

      typeof onSuccess === 'function' && onSuccess();
    })
    .catch(err => {
      console.error(err);
      typeof onError === 'function' && onError();
    });
};
