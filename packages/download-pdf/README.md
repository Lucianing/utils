# @luzc/download-pdf

⚠️ 待完善发布~~ ⚠️

## 使用

```bash
yarn add @luzc/download-pdf
```

在React中

```tsx
import { FC, useRef } from 'react'
import { downloadPDF } from '@luzc/download-pdf';

const Demo: FC => {
  const element = useRef<HTMLDivElement>();
  
  retrun (
    <>
      <div ref={element}>
        内容内容
      </div>
      <button 
        onClick={
          () => downloadPDF({
            element: element.current,
            filename: '测试'
          })
        }
      >导出</button>
    </>
  );
}
```

在Vue中

```vue
<template>
  <div>
    <div id="container">
      内容内容
    </div>
    <button 
      onClick={handleDownloadPDF}
    >导出</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { downloadPDF } from '@luzc/download-pdf';

export default defineComponent({
  methods: {
    handleDownloadPDF() {
      downloadPDF({
        element: document.getElementById('container') as HTMLElement,
        filename: '测试'
      });
    }
  }
});
</script>
```
