# 🚀 快速上传指南

## 📦 需要上传的文件（3个）

```
index.html          ✅ 修复合作伙伴 logo 路径
cases.html          ✅ 修复合作企业 logo 路径
css/main.css        ✅ 修复 Hero logo 重叠问题
```

---

## ⚡ 一键上传命令

在你的本地项目目录执行：

```bash
# 1. 添加修改的文件
git add index.html cases.html css/main.css

# 2. 提交更改
git commit -m "修复logo显示路径和首页logo重叠问题"

# 3. 推送到 GitHub
git push origin main
```

---

## ⏱️ 等待部署

- Vercel 会自动检测到更新
- 部署时间：约 **1-2 分钟**
- 部署完成后，刷新浏览器查看效果

---

## ✅ 验证清单

部署完成后，检查以下内容：

### 首页
- [ ] Hero 区域的钱淼淼 logo 不与导航栏重叠
- [ ] 合作伙伴区域显示6个企业 logo
- [ ] Logo 悬停效果正常

### 合作案例页
- [ ] 显示6个合作企业 logo（白色卡片）
- [ ] Logo 悬停变彩色+放大效果正常

---

## 🔧 如果还是看不到 logo

1. **强制刷新浏览器**：Ctrl + Shift + R（Windows）或 Cmd + Shift + R（Mac）
2. **检查图片路径**：确认 GitHub 上的图片在 `images/` 文件夹下（不是 `images/partners/`）
3. **检查文件名大小写**：`AIKOSHA.jpg` 的 A 是大写
4. **等待 Vercel 部署**：访问 Vercel 控制台查看部署状态

---

## 📁 图片文件位置

确保你的 GitHub 仓库中图片位置正确：

```
Financewang/financial-blog/
├── images/
│   ├── mcc-cisdi.jpg         ✅ 中冶赛迪
│   ├── guohu.jpg             ✅ 国鸽航空
│   ├── fivision.jpg          ✅ FMsion
│   ├── AIKOSHA.jpg           ✅ AIKOSHA（注意大写）
│   ├── meicun.jpg            ✅ 美村
│   ├── yuqing.jpg            ✅ 育清教育
│   └── qianmiaomiaoLogo.jpg  ✅ 钱淼淼主 Logo
```

---

**准备好了吗？开始上传！** 🎉
