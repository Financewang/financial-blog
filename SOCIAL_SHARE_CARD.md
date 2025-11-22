# 社交分享卡片功能说明文档

## 📅 更新时间
2025-11-22

## 🎯 功能概述

这是一个为文章页面设计的**社交分享卡片生成器**，用户点击分享按钮后，不是简单地复制链接，而是生成一张精美的分享卡片，包含文章信息和二维码，可以直接保存并分享到社交媒体。

---

## ✨ 核心特性

### 1. 精美的视觉设计
- **深色渐变背景**：黑色到深灰的渐变，营造高端质感
- **金色品牌元素**：符合新湾咨询的品牌色调
- **二维码识别**：自动生成当前文章链接的二维码
- **响应式设计**：完美适配所有设备（桌面/平板/手机）

### 2. 强大的功能
- **Canvas 绘制**：使用 Canvas API 绘制高质量图片（1200x630px）
- **一键下载**：保存为 PNG 图片，方便分享
- **快速复制**：一键复制文章链接到剪贴板
- **平台标记**：区分微信/微博分享，显示不同颜色标记

### 3. 优雅的交互
- **弹跳动画**：模态框弹出时的弹跳效果
- **加载反馈**：卡片生成过程中的加载提示
- **Toast 提示**：操作成功后的友好提示
- **多种关闭方式**：点击遮罩、关闭按钮、ESC 键

---

## 📂 文件结构

### 新增文件

```
js/
├── share-card.js          # 分享卡片生成器主逻辑
css/
├── share-card.css         # 分享卡片样式
```

### 修改文件

```
articles/
├── article1.html          # 集成分享功能
├── article2.html          # 集成分享功能
└── article3.html          # 集成分享功能
```

---

## 🎨 卡片设计规格

### 尺寸
- **宽度**：1200px
- **高度**：630px
- **格式**：PNG
- **用途**：社交媒体分享（符合 Open Graph 标准）

### 布局结构

```
┌────────────────────────────────────────────────────────────┐
│  新湾咨询集团                                  [装饰圆点]  │
│  钱淼淼平台 · 业财赋能专家                                 │
│  ──────────────────────────────────────────────────────── │
│                                                             │
│  文章标题                                    ┌──────────┐  │
│  （自动换行，最多3行）                        │          │  │
│                                             │  二维码   │  │
│  [平台标记：微信分享/微博分享]                 │          │  │
│                                             └──────────┘  │
│                                                             │
│  扫码阅读完整文章                                          │
│  qianmiaomiao.cn                                          │
│  ─────────────────                                        │
└────────────────────────────────────────────────────────────┘
```

### 配色方案

```css
/* 背景渐变 */
background: linear-gradient(#0A0A0A → #1A1A1A → #0A0A0A)

/* 文字颜色 */
品牌名称: #D4AF37 (金色)
文章标题: #FFFFFF (白色)
描述文字: rgba(255, 255, 255, 0.7) (半透明白色)
网站地址: rgba(255, 255, 255, 0.5) (更淡的白色)

/* 平台标记颜色 */
微信: #07C160 (微信绿)
微博: #E6162D (微博红)

/* 二维码容器 */
背景: #FFFFFF (白色)
边框: #D4AF37 (金色，3px)
```

---

## 🔧 技术实现

### 1. JavaScript 核心类

```javascript
class ShareCardGenerator {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.cardWidth = 1200;
        this.cardHeight = 630;
        this.init();
    }

    // 主要方法：
    generateCard(platform)      // 生成分享卡片
    drawBackground()            // 绘制背景
    drawBrandInfo()             // 绘制品牌信息
    drawArticleInfo()           // 绘制文章信息
    drawQRCode(url)             // 绘制二维码
    downloadCard()              // 下载卡片
    copyLink()                  // 复制链接
}
```

### 2. Canvas 绘制流程

```javascript
// 1. 绘制背景渐变
const gradient = ctx.createLinearGradient(0, 0, width, height);
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// 2. 绘制文字（支持自动换行）
ctx.font = 'bold 52px "Noto Sans SC"';
ctx.fillStyle = '#FFFFFF';
ctx.fillText(title, x, y);

// 3. 生成二维码（使用 qrcode.js）
const qrcode = new QRCode(container, {
    text: url,
    width: 300,
    height: 300,
    correctLevel: QRCode.CorrectLevel.H
});

// 4. 绘制二维码到 Canvas
ctx.drawImage(qrImage, x, y, 300, 300);

// 5. 导出为图片
const dataURL = canvas.toDataURL('image/png');
```

### 3. 依赖库

#### qrcode.js（通过 CDN 引入）
```html
<script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
```

**功能**：生成高质量二维码
**版本**：1.0.0
**纠错级别**：H（最高）

---

## 📱 用户使用流程

### 步骤 1：点击分享按钮
```
文章底部 → [分享到微信] 或 [分享到微博]
```

### 步骤 2：查看分享卡片
```
弹出模态框 → 显示精美的分享卡片预览
```

### 步骤 3：保存或分享
```
选项 A：点击"下载分享卡片" → 保存到本地 → 分享到社交媒体
选项 B：点击"复制链接" → 复制文章 URL → 直接分享链接
```

### 步骤 4：他人扫码访问
```
朋友看到分享卡片 → 扫描二维码 → 访问文章页面
```

---

## 🎯 使用场景

### 1. 微信朋友圈分享
- 下载分享卡片
- 发布到朋友圈
- 配上简短文案
- 朋友扫码阅读

### 2. 微博分享
- 下载分享卡片
- 上传到微博
- @相关用户
- 扩大传播范围

### 3. 企业内部分享
- 保存高质量卡片
- 发送到企业微信群
- 员工扫码学习
- 统一品牌形象

### 4. 营销推广
- 批量生成文章卡片
- 制作宣传物料
- 打印二维码海报
- 线下扫码引流

---

## 💡 设计亮点

### 1. 品牌一致性
- 使用新湾咨询的金色主题色
- 深色背景符合品牌调性
- Logo 和品牌名称突出显示
- 专业、高端的视觉形象

### 2. 信息层次清晰
```
第一层：品牌信息（新湾咨询集团 + 钱淼淼平台）
第二层：文章标题（大字号，醒目）
第三层：平台标记（颜色区分）
第四层：二维码（右侧，独立区域）
第五层：扫码提示 + 网站地址（底部）
```

### 3. 视觉引导
- **金色分割线**：分隔品牌信息和内容
- **装饰圆点**：增加设计感
- **金色边框**：突出二维码区域
- **渐变光效**：营造高端氛围

### 4. 社交媒体优化
- **1200x630px**：符合 Facebook/LinkedIn 标准
- **PNG 格式**：高质量，支持透明
- **二维码大小**：300x300px，易于扫描
- **纠错级别 H**：即使部分遮挡也能识别

---

## 🔍 技术细节

### 1. 文字自动换行

```javascript
wrapText(ctx, text, maxWidth) {
    const words = text.split('');
    const lines = [];
    let currentLine = '';
    
    for (let word of words) {
        const testLine = currentLine + word;
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth && currentLine.length > 0) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    lines.push(currentLine);
    return lines.slice(0, 3); // 最多3行
}
```

### 2. 异步二维码生成

```javascript
async drawQRCode(url) {
    // 创建临时容器
    const tempDiv = document.createElement('div');
    tempDiv.style.display = 'none';
    document.body.appendChild(tempDiv);
    
    // 生成二维码
    const qrcode = new QRCode(tempDiv, {
        text: url,
        width: 300,
        height: 300,
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // 等待生成完成
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 获取图片并绘制
    const qrImage = tempDiv.querySelector('img');
    ctx.drawImage(qrImage, x, y, 300, 300);
    
    // 清理
    document.body.removeChild(tempDiv);
}
```

### 3. 图片下载

```javascript
downloadCard() {
    const link = document.createElement('a');
    link.download = `新湾咨询-${Date.now()}.png`;
    link.href = this.canvas.toDataURL('image/png');
    link.click();
}
```

### 4. 链接复制（兼容性处理）

```javascript
copyLink() {
    const url = window.location.href;
    
    if (navigator.clipboard) {
        // 现代浏览器
        navigator.clipboard.writeText(url);
    } else {
        // 旧浏览器
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
    }
    
    this.showToast('链接已复制到剪贴板');
}
```

---

## 🎨 CSS 动画效果

### 1. 模态框弹出动画

```css
@keyframes modalSlideIn {
    0% {
        transform: scale(0.7) translateY(100px);
        opacity: 0;
    }
    50% {
        transform: scale(1.05) translateY(-10px);
    }
    100% {
        transform: scale(1) translateY(0);
        opacity: 1;
    }
}
```

### 2. 按钮波纹效果

```css
.share-actions button::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.share-actions button:active::after {
    width: 300px;
    height: 300px;
}
```

### 3. Toast 提示动画

```css
.share-toast {
    transform: translateX(-50%) translateY(-20px);
    opacity: 0;
    transition: all 0.3s ease;
}

.share-toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
}
```

---

## 📊 性能优化

### 1. 懒加载
- 模态框 HTML 在页面加载时创建
- Canvas 只在需要时绘制
- 二维码按需生成

### 2. 内存管理
```javascript
// 绘制完成后清理临时 DOM
document.body.removeChild(tempDiv);

// 关闭模态框时释放资源
closeModal() {
    this.canvas.getContext('2d').clearRect(0, 0, width, height);
}
```

### 3. 响应式图片
```css
.share-card-container canvas {
    width: 100%;  /* 移动端自适应 */
    height: auto;
}
```

---

## 🔧 自定义配置

### 修改卡片尺寸

```javascript
// js/share-card.js 第 9-10 行
this.cardWidth = 1200;   // 修改为其他宽度
this.cardHeight = 630;   // 修改为其他高度
```

### 修改配色方案

```javascript
// 背景渐变
gradient.addColorStop(0, '#YOUR_COLOR_1');
gradient.addColorStop(1, '#YOUR_COLOR_2');

// 品牌颜色
ctx.fillStyle = '#YOUR_BRAND_COLOR';

// 平台颜色
const platformColor = platform === 'wechat' ? '#YOUR_WECHAT_COLOR' : '#YOUR_WEIBO_COLOR';
```

### 修改文字内容

```javascript
// 品牌名称
ctx.fillText('您的公司名称', 60, 80);

// 子标题
ctx.fillText('您的品牌标语', 60, 130);

// 扫码提示
ctx.fillText('您的提示文字', 60, height - 80);
```

---

## 📱 响应式适配

### 桌面端（> 768px）
- 模态框宽度：800px
- 卡片完整显示
- 操作按钮横向排列

### 平板端（≤ 768px）
- 模态框宽度：90%
- 卡片自适应缩放
- 操作按钮纵向排列

### 手机端（≤ 480px）
- 模态框宽度：calc(100% - 20px)
- 字体大小适当缩小
- 关闭按钮尺寸调整

---

## 🐛 常见问题

### Q1: 二维码不显示？
**A**: 检查 qrcode.js 是否正确加载：
```html
<script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
```

### Q2: 下载的图片模糊？
**A**: Canvas 尺寸已设置为 1200x630px（高清），如需更高分辨率：
```javascript
this.cardWidth = 2400;  // 2倍尺寸
this.cardHeight = 1260;
```

### Q3: 中文字体不显示？
**A**: 确保已引入中文字体：
```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap" rel="stylesheet">
```

### Q4: 模态框无法关闭？
**A**: 检查 JavaScript 是否正确加载：
```html
<script src="../js/share-card.js"></script>
```

---

## 🚀 未来优化方向

### 1. 功能增强
- [ ] 支持自定义卡片模板
- [ ] 添加更多社交平台（抖音、LinkedIn）
- [ ] 支持视频封面生成
- [ ] 添加数据统计（扫码次数）

### 2. 性能优化
- [ ] Canvas 离屏渲染
- [ ] 二维码缓存机制
- [ ] 图片压缩优化
- [ ] Web Worker 后台生成

### 3. 用户体验
- [ ] 卡片样式选择器
- [ ] 实时预览编辑
- [ ] 一键分享到多平台
- [ ] 历史分享记录

---

## 📈 数据追踪建议

### 添加埋点统计

```javascript
// 统计分享按钮点击
document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // 发送统计数据
        gtag('event', 'share_click', {
            'platform': platform,
            'article_title': title
        });
    });
});

// 统计下载次数
downloadCard() {
    // 发送统计数据
    gtag('event', 'card_download', {
        'article_url': window.location.href
    });
    // ... 下载逻辑
}
```

---

## ✨ 总结

这个社交分享卡片功能完美解决了传统链接分享的痛点：

### 传统方式的问题
❌ 链接不直观，用户不愿意点击  
❌ 缺少视觉吸引力  
❌ 无法体现品牌形象  
❌ 转化率低

### 新方案的优势
✅ 精美的视觉卡片，吸引眼球  
✅ 二维码扫描，便捷访问  
✅ 品牌信息突出，提升认知度  
✅ 高转化率，易于传播

---

**文档更新日期**：2025-11-22  
**功能状态**：✅ 已完成并测试  
**下一步**：推送到 GitHub，部署到生产环境
