当需要监听某个元素是否出现在视口中，一般做法是监听  `scroll`  事件，然后查询元素离视口顶部的距离，但是监听  `scroll`  事件存在性能问题。

当一次行需要加载大量图片列表时，如果一次性加载全部可能会导致页面卡顿或服务器压力。

而 **`IntersectionObserver`** 可以很好的解决这些问题

**`IntersectionObserver`**  接口是一个浏览器提供的 API，是用来观察目标元素与其祖先元素(或视口)之间的交叉情况。

## 使用方法

1. 首先通过 `new IntersectionObserver(callback, options);` 创建一个观察器，`callback`是可见性变化时的回调函数，`option`是配置对象(可选)
2. 通过`observer.observe(target)`开始观察

```js
var observer = new IntersectionObserver(lazyLoadImages, {
  root: null, // 根容器，null表示浏览器视口
  rootMargin: "0px 0px 100px 0px", // 提前加载的距离
  threshold: 0.1, // 交叉比例
});
//开始观察某个元素
observer.observe(target);
//停止观察某个元素
observer.unobserve(target);
//停止观察所有元素
observer.disconnect();
```

### 1. 回调函数(callback)

当目标元素的可见性发生变化时，触发回调函数。

```js
const lazyLoadImages = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const src = target.getAttribute("data-src");
      // 将真实图片赋值到 src 属性
      if (src) {
        target.src = src;
        target.classList.add("loaded"); // 添加样式可选
        target.removeAttribute("data-src");
      }
      observer.unobserve(target); // 停止观察已加载的图片
    }
  });
};
```

### 2.配置参数(options)

```js
{
	root: null, // 根容器，null表示浏览器视口
	rootMargin: '0px 0px 100px 0px', // 提前加载的距离
	threshold: 0.1, // 交叉比例
}
```

- root：指定目标元素与哪个容器的边界交叉。如果为 null，则表示与浏览器视口交叉。
- rootMargin：设置观察区域的扩展或收缩，格式为 "10px 20px 10px 20px"（顺序为上右下左）。
- threshold：一个数字或数组，指定目标元素的可见比例，当可见比例满足某个值时触发回调。例如：
  - 0: 元素刚刚进入视口。
  - 0.5: 元素 50% 可见时触发。
  - 1: 元素完全可见时触发。
  - [0.5, 1]：元素一半出现在视口中或者元素全部出现在视口中时，均会执行回调函数

### 3.IntersectionObserverEntry 对象

回调函数`lazyLoadImages`中的每个`entry`是一个 IntersectionObserverEntry 实例，包含以下重要属性：

- target：被观察的目标元素。
- isIntersecting：布尔值，表示目标是否与根交叉。
- intersectionRatio：目标与根交叉的比例（0 到 1）。
- intersectionRect：交叉区域的 DOMRect 对象。
- boundingClientRect：目标元素的边界信息。
- rootBounds：根元素的边界信息。
- time：触发时间戳。

## 示例

在 vue3 中观察图片列表进行滚动加载

```vue
<script setup>
import { reactive, ref, onMounted, onUnmounted } from "vue";

const imgSrcList = reactive(
  new Array(100).fill(0).map((_, index) => ({
    src: `https://unsplash.it/200/200?random=${index}`,
    isLoaded: false, // 标记图片是否加载
  }))
);

const observer = ref(null);

const lazyLoadImages = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const src = target.getAttribute("data-src");
      // 将真实图片赋值到 src 属性
      if (src) {
        target.src = src;
        target.classList.add("loaded"); // 添加样式可选
        target.removeAttribute("data-src");
      }
      observer.unobserve(target); // 停止观察已加载的图片
    }
  });
};

onMounted(() => {
  observer.value = new IntersectionObserver(lazyLoadImages, {
    root: null, // 根容器，null表示浏览器视口
    rootMargin: "0px 0px 100px 0px", // 提前加载的距离
    threshold: 0.1, // 交叉比例
  });
  const lazyImages = document.querySelectorAll("[data-src]");
  lazyImages.forEach((image) => observer.value.observe(image));
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});
</script>

<template>
  <div class="flex justify-between">
    <!-- 第一组图片 -->
    <div>
      <img
        v-for="(img, index) in imgSrcList"
        :key="index"
        :data-src="img.src"
        alt="Lazy Loaded Image"
        class="lazy-img"
      />
    </div>
  </div>
</template>

<style>
/* 样式 */

.lazy-img {
  width: 200px;
  height: 200px;
  background: #eee;
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
}

.lazy-img.loaded {
  opacity: 1;
}
</style>
```
