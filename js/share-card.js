/**
 * 社交分享卡片生成器
 * 功能：生成精美的分享卡片，包含文章信息和二维码
 */

class ShareCardGenerator {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.qrCanvas = null;
        this.cardWidth = 1200;
        this.cardHeight = 630;
        this.init();
    }

    init() {
        // 创建模态框 HTML 结构
        this.createModal();
        // 绑定事件
        this.bindEvents();
    }

    createModal() {
        const modalHTML = `
            <div id="shareCardModal" class="share-modal">
                <div class="share-modal-overlay" onclick="shareCard.closeModal()"></div>
                <div class="share-modal-content">
                    <button class="share-modal-close" onclick="shareCard.closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="share-modal-header">
                        <h3>分享文章</h3>
                        <p class="share-hint">长按保存图片，分享到社交媒体</p>
                    </div>
                    <div class="share-card-container">
                        <canvas id="shareCardCanvas" width="1200" height="630"></canvas>
                    </div>
                    <div class="share-actions">
                        <button class="btn-download" onclick="shareCard.downloadCard()">
                            <i class="fas fa-download"></i>
                            <span>下载分享卡片</span>
                        </button>
                        <button class="btn-copy-link" onclick="shareCard.copyLink()">
                            <i class="fas fa-link"></i>
                            <span>复制链接</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // 添加到 body
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer.firstElementChild);
        
        // 获取 canvas 元素
        this.canvas = document.getElementById('shareCardCanvas');
        this.ctx = this.canvas.getContext('2d');
    }

    bindEvents() {
        // ESC 键关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // 绑定所有分享按钮
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = btn.title.includes('微信') ? 'wechat' : 'weibo';
                this.generateCard(platform);
            });
        });
    }

    async generateCard(platform) {
        const articleTitle = document.querySelector('.article-title-main')?.textContent || '文章标题';
        const articleDescription = document.querySelector('.article-meta-info')?.textContent || '';
        const articleUrl = window.location.href;
        
        // 显示模态框
        this.openModal();
        
        // 绘制卡片背景
        this.drawBackground();
        
        // 绘制品牌信息
        await this.drawBrandInfo();
        
        // 绘制文章信息
        this.drawArticleInfo(articleTitle, platform);
        
        // 生成二维码
        await this.drawQRCode(articleUrl);
        
        // 绘制装饰元素
        this.drawDecorations();
    }

    drawBackground() {
        const ctx = this.ctx;
        
        // 深色渐变背景
        const gradient = ctx.createLinearGradient(0, 0, this.cardWidth, this.cardHeight);
        gradient.addColorStop(0, '#0A0A0A');
        gradient.addColorStop(0.5, '#1A1A1A');
        gradient.addColorStop(1, '#0A0A0A');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.cardWidth, this.cardHeight);
        
        // 金色光效
        const glowGradient = ctx.createRadialGradient(
            this.cardWidth * 0.3, this.cardHeight * 0.3, 0,
            this.cardWidth * 0.3, this.cardHeight * 0.3, 400
        );
        glowGradient.addColorStop(0, 'rgba(212, 175, 55, 0.1)');
        glowGradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
        
        ctx.fillStyle = glowGradient;
        ctx.fillRect(0, 0, this.cardWidth, this.cardHeight);
    }

    async drawBrandInfo() {
        const ctx = this.ctx;
        
        // 网站名称
        ctx.fillStyle = '#D4AF37';
        ctx.font = 'bold 48px Inter, "Noto Sans SC", sans-serif';
        ctx.fillText('新湾咨询集团', 60, 80);
        
        // 子标题
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '28px Inter, "Noto Sans SC", sans-serif';
        ctx.fillText('钱淼淼平台 · 业财赋能专家', 60, 130);
        
        // 分割线
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(60, 170);
        ctx.lineTo(1140, 170);
        ctx.stroke();
    }

    drawArticleInfo(title, platform) {
        const ctx = this.ctx;
        
        // 文章标题
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 52px "Noto Sans SC", sans-serif';
        
        // 自动换行处理
        const maxWidth = 700;
        const lines = this.wrapText(ctx, title, maxWidth);
        const lineHeight = 70;
        let y = 260;
        
        lines.forEach(line => {
            ctx.fillText(line, 60, y);
            y += lineHeight;
        });
        
        // 平台标记
        const platformText = platform === 'wechat' ? '微信分享' : '微博分享';
        const platformColor = platform === 'wechat' ? '#07C160' : '#E6162D';
        
        ctx.fillStyle = platformColor;
        ctx.font = 'bold 24px Inter, sans-serif';
        ctx.fillText(platformText, 60, y + 40);
        
        // 扫码提示
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '24px "Noto Sans SC", sans-serif';
        ctx.fillText('扫码阅读完整文章', 60, this.cardHeight - 80);
        
        // 网站地址
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '20px Inter, sans-serif';
        ctx.fillText('qianmiaomiao.cn', 60, this.cardHeight - 40);
    }

    async drawQRCode(url) {
        const ctx = this.ctx;
        
        // 创建临时 div 用于生成二维码
        const tempDiv = document.createElement('div');
        tempDiv.style.display = 'none';
        document.body.appendChild(tempDiv);
        
        // 使用 QRCode 库生成二维码
        const qrcode = new QRCode(tempDiv, {
            text: url,
            width: 300,
            height: 300,
            colorDark: '#0A0A0A',
            colorLight: '#FFFFFF',
            correctLevel: QRCode.CorrectLevel.H
        });
        
        // 等待二维码生成
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const qrImage = tempDiv.querySelector('img');
        
        if (qrImage) {
            // 绘制白色背景
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(this.cardWidth - 380, 200, 320, 320);
            
            // 绘制金色边框
            ctx.strokeStyle = '#D4AF37';
            ctx.lineWidth = 3;
            ctx.strokeRect(this.cardWidth - 380, 200, 320, 320);
            
            // 绘制二维码
            ctx.drawImage(qrImage, this.cardWidth - 370, 210, 300, 300);
        }
        
        // 清理临时元素
        document.body.removeChild(tempDiv);
    }

    drawDecorations() {
        const ctx = this.ctx;
        
        // 金色装饰圆点
        const dots = [
            { x: this.cardWidth - 100, y: 150, r: 8 },
            { x: this.cardWidth - 120, y: 180, r: 6 },
            { x: this.cardWidth - 80, y: 180, r: 5 }
        ];
        
        dots.forEach(dot => {
            ctx.fillStyle = 'rgba(212, 175, 55, 0.6)';
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // 渐变装饰线
        const lineGradient = ctx.createLinearGradient(60, this.cardHeight - 20, 600, this.cardHeight - 20);
        lineGradient.addColorStop(0, 'rgba(212, 175, 55, 0)');
        lineGradient.addColorStop(0.5, 'rgba(212, 175, 55, 0.5)');
        lineGradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
        
        ctx.strokeStyle = lineGradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(60, this.cardHeight - 20);
        ctx.lineTo(600, this.cardHeight - 20);
        ctx.stroke();
    }

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

    openModal() {
        const modal = document.getElementById('shareCardModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('shareCardModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    downloadCard() {
        const link = document.createElement('a');
        link.download = `新湾咨询-${Date.now()}.png`;
        link.href = this.canvas.toDataURL('image/png');
        link.click();
        
        // 提示
        this.showToast('分享卡片已保存到本地');
    }

    copyLink() {
        const url = window.location.href;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                this.showToast('链接已复制到剪贴板');
            });
        } else {
            // 兼容旧浏览器
            const input = document.createElement('input');
            input.value = url;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            this.showToast('链接已复制到剪贴板');
        }
    }

    showToast(message) {
        // 创建提示框
        const toast = document.createElement('div');
        toast.className = 'share-toast';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);
        
        // 显示动画
        setTimeout(() => toast.classList.add('show'), 10);
        
        // 3秒后移除
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }
}

// 页面加载完成后初始化
let shareCard;
document.addEventListener('DOMContentLoaded', function() {
    shareCard = new ShareCardGenerator();
});
