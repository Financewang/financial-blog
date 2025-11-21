// ==================== 时钟功能 ====================
function updateClock() {
    const now = new Date();
    
    // 更新时间
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    const timeElement = document.getElementById('time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
    
    // 更新日期
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const dateString = `${year}年${month}月`;
    
    const dateElement = document.getElementById('date');
    if (dateElement) {
        dateElement.textContent = dateString;
    }
}

// 每秒更新时钟
setInterval(updateClock, 1000);
updateClock(); // 立即执行一次

// ==================== 日历功能 ====================
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

function renderCalendar(year, month) {
    const calendarElement = document.getElementById('calendar');
    const calendarTitle = document.getElementById('calendarTitle');
    
    if (!calendarElement || !calendarTitle) return;
    
    // 更新标题
    calendarTitle.textContent = `${year}年${month + 1}月`;
    
    // 清空日历
    calendarElement.innerHTML = '';
    
    // 添加星期标题
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    weekDays.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day header';
        dayElement.textContent = day;
        calendarElement.appendChild(dayElement);
    });
    
    // 获取当月第一天是星期几
    const firstDay = new Date(year, month, 1).getDay();
    
    // 获取当月有多少天
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // 获取上个月有多少天
    const prevMonthDays = new Date(year, month, 0).getDate();
    
    // 添加上个月的日期
    for (let i = firstDay - 1; i >= 0; i--) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day other-month';
        dayElement.textContent = prevMonthDays - i;
        calendarElement.appendChild(dayElement);
    }
    
    // 添加当月的日期
    const today = new Date();
    const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        if (isCurrentMonth && day === today.getDate()) {
            dayElement.classList.add('today');
        }
        
        calendarElement.appendChild(dayElement);
    }
    
    // 计算需要填充的下个月日期
    const totalCells = calendarElement.children.length - 7; // 减去星期标题
    const remainingCells = 42 - totalCells - 7; // 6行×7列 - 已有单元格 - 星期标题
    
    // 添加下个月的日期
    for (let day = 1; day <= remainingCells; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day other-month';
        dayElement.textContent = day;
        calendarElement.appendChild(dayElement);
    }
}

// 上一月
const prevMonthBtn = document.getElementById('prevMonth');
if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentYear, currentMonth);
    });
}

// 下一月
const nextMonthBtn = document.getElementById('nextMonth');
if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentYear, currentMonth);
    });
}

// 初始化日历
renderCalendar(currentYear, currentMonth);

// ==================== 导航交互 ====================
const navItems = document.querySelectorAll('.sidebar-nav li');

navItems.forEach(item => {
    item.addEventListener('click', function() {
        // 移除所有active类
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // 添加active到当前项
        this.classList.add('active');
        
        // 这里可以添加页面切换逻辑
        const itemText = this.querySelector('span').textContent;
        console.log('导航至: ' + itemText);
    });
});

// ==================== 文章卡片动画 ====================
const articleCards = document.querySelectorAll('.article-card');

articleCards.forEach(card => {
    card.addEventListener('click', function(e) {
        // 如果点击的是"阅读全文"链接，允许正常跳转
        if (e.target.classList.contains('read-more') || e.target.closest('.read-more')) {
            // 不阻止默认行为，让链接正常工作
            return;
        }
        
        // 如果点击卡片其他区域，也跳转到文章详情页
        const readMoreLink = this.querySelector('.read-more');
        if (readMoreLink) {
            window.location.href = readMoreLink.getAttribute('href');
        }
    });
    
    // 添加hover效果提示
    card.style.cursor = 'pointer';
});

// ==================== 写文章按钮 ====================
const writeBtn = document.querySelector('.write-btn');
if (writeBtn) {
    writeBtn.addEventListener('click', () => {
        // 添加按钮点击动画
        writeBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            writeBtn.style.transform = 'translateY(-2px)';
        }, 100);
        
        console.log('点击写文章按钮');
        // 这里可以添加跳转到写文章页面的逻辑
        alert('写文章功能开发中...\n\n提示：可以集成Markdown编辑器，实现在线写作功能。');
    });
}

// ==================== 二维码弹窗 ====================
const qrModal = document.getElementById('qrModal');
const qrModalImage = document.getElementById('qrModalImage');
const qrModalTitle = document.getElementById('qrModalTitle');
const qrModalDesc = document.getElementById('qrModalDesc');
const closeQrModal = document.getElementById('closeQrModal');

// 打开二维码弹窗
function openQrModal(imageSrc, title, desc) {
    qrModalImage.src = imageSrc;
    qrModalTitle.textContent = title;
    qrModalDesc.textContent = desc;
    qrModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 禁止背景滚动
}

// 关闭二维码弹窗
function closeQrModalFunc() {
    qrModal.classList.remove('active');
    document.body.style.overflow = ''; // 恢复滚动
}

// 点击关闭按钮
if (closeQrModal) {
    closeQrModal.addEventListener('click', closeQrModalFunc);
}

// 点击遮罩层关闭
if (qrModal) {
    qrModal.querySelector('.qr-modal-overlay').addEventListener('click', closeQrModalFunc);
}

// 按ESC键关闭
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && qrModal.classList.contains('active')) {
        closeQrModalFunc();
    }
});

// ==================== 社交链接点击 ====================
const socialLinks = document.querySelectorAll('.social-link');

socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const socialName = this.querySelector('.social-name').textContent;
        const qrImage = this.getAttribute('data-qr');
        
        // 添加点击动画
        this.style.transform = 'translateX(8px) scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'translateX(4px)';
        }, 100);
        
        console.log('点击: ' + socialName);
        
        // 显示二维码弹窗
        if (qrImage) {
            let title = '';
            let desc = '';
            
            if (socialName.includes('微信')) {
                title = '微信公众号';
                desc = '使用微信扫码关注「老汪的Financial笔记」';
            } else if (socialName.includes('小红书')) {
                title = '小红书';
                desc = '使用小红书扫码关注 @老汪的Financial笔记';
            }
            
            openQrModal(qrImage, title, desc);
        }
    });
});

// ==================== 工具列表点击 ====================
const toolItems = document.querySelectorAll('.tool-list li');

toolItems.forEach(tool => {
    tool.addEventListener('click', function() {
        const toolName = this.querySelector('span').textContent;
        
        // 添加点击动画
        this.style.transform = 'translateX(8px) scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'translateX(4px)';
        }, 100);
        
        console.log('点击工具: ' + toolName);
        
        // 显示工具信息
        alert(`${toolName}\n\n此功能即将推出，敬请期待！\n\n提示：可以在这里集成Excel模板下载、在线计算器等实用工具。`);
    });
});

// ==================== 平滑滚动 ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== 页面加载动画 ====================
window.addEventListener('load', () => {
    // 为所有卡片添加淡入动画
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            requestAnimationFrame(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        }, index * 50);
    });
});

// ==================== 响应式菜单（移动端） ====================
// 如果需要在移动端添加汉堡菜单，可以在这里实现
const mobileBreakpoint = 1024;

function handleResize() {
    const width = window.innerWidth;
    
    if (width <= mobileBreakpoint) {
        console.log('移动端模式');
        // 可以在这里添加移动端特定的逻辑
    } else {
        console.log('桌面模式');
    }
}

// 监听窗口大小变化
window.addEventListener('resize', handleResize);
handleResize(); // 初始化时执行一次

// ==================== 键盘快捷键 ====================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K: 聚焦搜索（如果有搜索功能）
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('快捷键: 搜索');
        // 这里可以添加搜索功能
    }
    
    // Ctrl/Cmd + N: 写新文章
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        console.log('快捷键: 写新文章');
        writeBtn?.click();
    }
});

// ==================== 左侧导航社交链接 ====================
const socialNavLinks = document.querySelectorAll('.social-nav-link');

socialNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const qrImage = this.getAttribute('data-qr');
        const title = this.getAttribute('data-title');
        const desc = this.getAttribute('data-desc');
        
        console.log('点击左侧导航: ' + title);
        
        // 显示二维码弹窗
        if (qrImage && title && desc) {
            openQrModal(qrImage, title, desc);
        }
    });
});

// ==================== 控制台欢迎信息 ====================
console.log('%c老汪的Financial笔记', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%c财务人的实战笔记 | 让数字讲出商业故事', 'color: #48bb78; font-size: 14px;');
console.log('%c\n欢迎来到我的博客！\n如有任何问题或建议，欢迎通过公众号联系我。', 'color: #718096; font-size: 12px;');
console.log('\n💡 提示：按 Ctrl/Cmd + N 快速创建新文章\n');