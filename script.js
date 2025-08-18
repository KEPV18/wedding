// script.js - كود مثالي، منظم، ويعمل بدون مشاكل
console.log('تم تحميل ملف JavaScript');

// ==================== إعدادات الزفاف ====================
const weddingDate = new Date('2025-11-15T15:00:00').getTime(); // 15 نوفمبر 2025 - 3 عصرًا

// ==================== المتغيرات العامة ====================
let countdownInterval;
let daysEl, hoursEl, minutesEl, secondsEl;
let audio, musicToggle, musicStatusText;

// ==================== عند تحميل الصفحة ====================
document.addEventListener('DOMContentLoaded', function () {
    console.log('تم تحميل الصفحة بالكامل');

    // --- تهيئة العناصر ---
    initElements();
    if (!validateElements()) return;

    // --- تشغيل العد التنازلي ---
    startCountdown();

    // --- تشغيل/إيقاف الموسيقى ---
    setupMusicControl();

    // --- أزرار عرض المزيد ---
    setupShowMoreButtons();

    // --- الطائرة المتحركة ---
    animateAirplane();

    // --- التمرير السلس ---
    setupSmoothScroll();
});

// ==================== دالة تهيئة العناصر ====================
function initElements() {
    daysEl = document.getElementById('days');
    hoursEl = document.getElementById('hours');
    minutesEl = document.getElementById('minutes');
    secondsEl = document.getElementById('seconds');

    audio = document.getElementById('background-music');
    musicToggle = document.getElementById('music-toggle');
    musicStatusText = document.getElementById('music-status');
}

// ==================== التحقق من وجود العناصر ====================
function validateElements() {
    const missing = [];
    if (!daysEl) missing.push('days');
    if (!hoursEl) missing.push('hours');
    if (!minutesEl) missing.push('minutes');
    if (!secondsEl) missing.push('seconds');
    if (!audio) missing.push('background-music');
    if (!musicToggle) missing.push('music-toggle');
    if (!musicStatusText) missing.push('music-status');

    if (missing.length > 0) {
        console.error('العناصر التالية غير موجودة:', missing);
        return false;
    }
    return true;
}

// ==================== العد التنازلي ====================
function startCountdown() {
    updateCountdown(); // أول تحديث فوري
    countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        displayTime(0, 0, 0, 0);
        showCompletedMessage();
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    displayTime(days, hours, minutes, seconds);
}

function displayTime(days, hours, minutes, seconds) {
    updateCountdownElement(daysEl, days);
    updateCountdownElement(hoursEl, hours);
    updateCountdownElement(minutesEl, minutes);
    updateCountdownElement(secondsEl, seconds);
}

function updateCountdownElement(element, value) {
    const formattedValue = value.toString().padStart(2, '0');
    if (element.textContent !== formattedValue) {
        element.classList.add('countdown-update');
        element.textContent = formattedValue;
        setTimeout(() => {
            element.classList.remove('countdown-update');
        }, 500);
    }
}

function showCompletedMessage() {
    const countdownSection = document.querySelector('.countdown-section');
    if (!document.querySelector('.completed-message')) {
        const msg = document.createElement('p');
        msg.textContent = 'اليوم هو يوم فرحنا! 🎉';
        msg.className = 'completed-message';
        countdownSection.appendChild(msg);
    }
}

// ==================== التحكم في الموسيقى ====================
function setupMusicControl() {
    // تحميل الصوت (مهم للسماح بالتشغيل لاحقًا)
    audio.load();

    // تحديث حالة الزر بناءً على حالة الصوت
    function updateButtonState() {
        if (audio.paused) {
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i> <span>تشغيل</span>';
            musicStatusText.textContent = 'الموسيقى متوقفة';
        } else {
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i> <span>إيقاف</span>';
            musicStatusText.textContent = 'الموسيقى تعمل';
        }
    }

    // تحديث الحالة أول مرة
    updateButtonState();

    // حدث النقر
    musicToggle.addEventListener('click', function () {
        if (audio.paused) {
            audio.play()
                .then(() => {
                    console.log('تم تشغيل الموسيقى بنجاح');
                    updateButtonState();
                })
                .catch(err => {
                    console.error('فشل تشغيل الصوت:', err);
                    alert('لم يتم تشغيل الصوت. من فضلك انقر مرة أخرى بعد تفاعل مع الصفحة.');
                });
        } else {
            audio.pause();
            updateButtonState();
        }
    });

    // الاستماع لأحداث الصوت
    audio.addEventListener('play', updateButtonState);
    audio.addEventListener('pause', updateButtonState);
    audio.addEventListener('error', () => {
        alert('خطأ في تحميل الملف الصوتي. تأكد من صحته.');
    });
}

// ==================== أزرار عرض المزيد ====================
function setupShowMoreButtons() {
    const buttons = [
        {
            btnId: 'show-more-verses',
            contentId: 'more-verses',
            textShow: 'عرض المزيد من الآيات',
            textHide: 'عرض أقل'
        },
        {
            btnId: 'show-more-hadith',
            contentId: 'more-hadith',
            textShow: 'عرض المزيد من الأحاديث',
            textHide: 'عرض أقل'
        },
        {
            btnId: 'show-more-dua',
            contentId: 'more-dua',
            textShow: 'عرض المزيد من الأدعية',
            textHide: 'عرض أقل'
        }
    ];

    buttons.forEach(({ btnId, contentId, textShow, textHide }) => {
        const btn = document.getElementById(btnId);
        const content = document.getElementById(contentId);

        if (!btn || !content) {
            console.warn(`العنصر ${btnId} أو ${contentId} غير موجود`);
            return;
        }

        // تأكد أن المحتوى مخفي
        content.style.display = 'none';

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (content.style.display === 'none') {
                content.style.display = 'block';
                btn.textContent = textHide;
            } else {
                content.style.display = 'none';
                btn.textContent = textShow;
            }
        });
    });
}

// ==================== حركة الطائرة ====================
function animateAirplane() {
    const airplane = document.querySelector('.airplane');
    if (!airplane) return;

    const fly = () => {
        airplane.style.animation = 'none';
        void airplane.offsetWidth; // إعادة التدفق (re-flow)
        airplane.style.animation = 'fly 45s linear'; // مدة عشوائية بين 45-60
    };

    fly(); // أول تشغيل
    setInterval(fly, 45000); // كل 45 ثانية
}

// ==================== التمرير السلس ====================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ==================== عند التحميل الكامل للصفحة ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});