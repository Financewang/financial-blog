# 社交分享卡片部署指南

## 🚀 快速部署（5分钟）

### 第一步：推送代码到 GitHub

```bash
# 查看修改状态
git status

# 添加所有新文件和修改
git add js/share-card.js
git add css/share-card.css
git add articles/article1.html
git add articles/article2.html
git add articles/article3.html
git add README.md
git add SOCIAL_SHARE_CARD.md
git add SHARE_CARD_DEPLOY_GUIDE.md

# 提交更改
git commit -m "✨ 新增社交分享卡片功能

- 点击分享按钮生成精美卡片（而不是复制链接）
- 使用 Canvas 绘制高质量分享卡片（1200x630px）
- 集成二维码生成，扫码直达文章页面
- 支持下载图片和复制链接
- 优雅的弹窗动画和交互体验
- 完整的响应式设计"

# 推送到远程仓库
git push origin main
```

---

### 第二步：等待 Vercel 自动部署

1. Vercel 会自动检测到 GitHub 提交
2. 触发自动构建和部署（约 2-3 分钟）
3. 部署完成后自动更新 qianmiaomiao.cn

---

### 第三步：测试功能

#### 桌面端测试
1. 访问任意文章页面：
   - https://qianmiaomiao.cn/articles/article1.html
   - https://qianmiaomiao.cn/articles/article2.html
   - https://qianmiaomiao.cn/articles/article3.html

2. 滚动到页面底部，找到分享按钮：
   ```
   分享到： [微信图标] [微博图标]
   ```

3. 点击 **微信图标** 或 **微博图标**

4. 应该看到：
   - ✅ 弹出精美的分享卡片预览
   - ✅ 卡片显示文章标题
   - ✅ 右侧有二维码
   - ✅ 底部有"下载分享卡片"和"复制链接"按钮

5. 测试下载功能：
   - 点击 **下载分享卡片**
   - 应该弹出 Toast 提示"分享卡片已保存到本地"
   - 检查下载文件夹，找到 `新湾咨询-{时间戳}.png`
   - 打开图片，确认质量清晰（1200x630px）

6. 测试复制功能：
   - 点击 **复制链接**
   - 应该弹出 Toast 提示"链接已复制到剪贴板"
   - 粘贴到记事本，确认是正确的文章 URL

7. 测试关闭功能：
   - 点击右上角 **X 按钮** → 模态框关闭
   - 再次打开，点击 **遮罩层** → 模态框关闭
   - 再次打开，按 **ESC 键** → 模态框关闭

#### 移动端测试
1. 使用手机访问文章页面

2. 点击分享按钮

3. 确认：
   - ✅ 模态框在小屏幕上正常显示
   - ✅ 卡片自适应缩放
   - ✅ 按钮纵向排列
   - ✅ 触摸操作流畅

4. 长按分享卡片图片，保存到手机相册

5. 使用微信扫描二维码，确认跳转到正确页面

---

## 🔍 问题排查

### 问题 1：点击分享按钮没有反应

**可能原因**：
- JavaScript 文件未正确加载
- 浏览器控制台有报错

**解决方案**：
```bash
# 1. 打开浏览器开发者工具（F12）
# 2. 查看 Console 标签是否有错误
# 3. 检查 Network 标签，确认以下文件加载成功：
#    - share-card.js
#    - share-card.css
#    - qrcode.min.js
```

---

### 问题 2：二维码不显示

**可能原因**：
- qrcode.js CDN 未加载

**解决方案**：
```html
<!-- 检查文章页面 HTML 是否包含： -->
<script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
```

如果 CDN 被墙，可以更换为国内 CDN：
```html
<script src="https://cdn.bootcdn.net/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
```

---

### 问题 3：下载的图片模糊

**可能原因**：
- Canvas 尺寸设置过小

**解决方案**：
```javascript
// 打开 js/share-card.js，修改第 9-10 行
this.cardWidth = 2400;   // 提高到 2 倍尺寸
this.cardHeight = 1260;
```

---

### 问题 4：中文字体显示为方块

**可能原因**：
- 字体未加载

**解决方案**：
```html
<!-- 检查文章页面是否包含 Noto Sans SC 字体： -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap" rel="stylesheet">
```

---

## 📱 分享到社交媒体的最佳实践

### 微信朋友圈分享

1. **下载分享卡片**
   - 点击"下载分享卡片"保存到本地

2. **发布到朋友圈**
   - 打开微信朋友圈
   - 点击相机图标，选择刚下载的图片
   - 配上文案，例如：
     ```
     干货分享 | 创业融资必读 📊
     
     详细解析 FA 机构选择技巧，
     扫码阅读完整文章 👇
     
     #创业 #融资 #业财赋能
     ```

3. **效果最大化**
   - 文案简短有力（50字以内）
   - 使用相关话题标签
   - 选择合适的发布时间（晚上 8-10 点）

---

### 微博分享

1. **下载分享卡片**

2. **发布微博**
   - 打开微博 App
   - 上传分享卡片图片
   - 编写文案，例如：
     ```
     【创业融资干货】

     找 FA 帮你对接投资人？先看这 20 家靠谱机构！

     详细分析了 FA 行业的坑和套路，创业者必读 💡

     扫码阅读完整文章 ↓
     
     #创业融资 #投资人 #FA机构 
     @新湾咨询集团
     ```

3. **提升曝光率**
   - 使用热门话题标签
   - @相关大V或官方账号
   - 鼓励评论转发

---

### 企业微信群分享

1. **保存分享卡片**

2. **发送到企业微信群**
   ```
   [图片：分享卡片]
   
   📢 本周精选文章
   
   创业融资找 FA？这 20 家机构靠谱，
   但要小心这些坑。
   
   扫码阅读 👆
   欢迎大家转发分享~
   ```

---

## 📊 数据监控建议

### 添加分享统计

如果想追踪分享效果，可以添加统计代码：

```javascript
// 在 js/share-card.js 的 downloadCard() 方法中添加
downloadCard() {
    // ... 原有代码 ...
    
    // 发送统计数据（如果有 Google Analytics）
    if (typeof gtag !== 'undefined') {
        gtag('event', 'share_card_download', {
            'event_category': 'engagement',
            'event_label': document.title,
            'value': 1
        });
    }
}
```

---

## 🎨 自定义卡片样式

### 修改品牌信息

打开 `js/share-card.js`，找到 `drawBrandInfo()` 方法：

```javascript
async drawBrandInfo() {
    const ctx = this.ctx;
    
    // 修改这里的文字
    ctx.fillText('您的公司名称', 60, 80);
    ctx.fillText('您的品牌标语', 60, 130);
}
```

### 修改配色

```javascript
// 修改背景渐变
gradient.addColorStop(0, '#您的颜色1');
gradient.addColorStop(1, '#您的颜色2');

// 修改品牌颜色
ctx.fillStyle = '#您的品牌色';
```

---

## ✅ 部署完成检查清单

- [ ] 代码已推送到 GitHub
- [ ] Vercel 自动部署成功
- [ ] 桌面端分享功能正常
- [ ] 移动端分享功能正常
- [ ] 二维码能正常扫描
- [ ] 下载功能正常
- [ ] 复制链接功能正常
- [ ] 所有动画效果流畅
- [ ] 已测试 Chrome、Safari、Firefox
- [ ] 已测试 iPhone 和 Android

---

## 🎉 部署成功！

恭喜您成功部署了社交分享卡片功能！

现在您的文章分享体验已经提升到了新的高度：
- ✅ 精美的视觉卡片
- ✅ 便捷的二维码扫描
- ✅ 一键下载和分享
- ✅ 专业的品牌形象

**下一步建议**：
1. 在微信朋友圈分享一篇文章，测试实际效果
2. 收集用户反馈，持续优化
3. 监控分享数据，评估传播效果

---

**文档版本**：1.0  
**更新日期**：2025-11-22  
**技术支持**：参考 SOCIAL_SHARE_CARD.md
