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


// ==================== توصيل بـ Supabase ====================
const SUPABASE_URL = 'https://tfpriseymwxfdoiunzpv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmcHJpc2V5bXd4ZmRvaXVuenB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NDAzNTEsImV4cCI6MjA3MTExNjM1MX0.ABd1Kl_lTV60sSzf-NY7PN0LFq5XIgajS9aerC9nSCM';

// استيراد مكتبة Supabase (من CDN)
const { createClient } = supabase;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==================== إرسال الرسالة ====================
async function submitMessage(name, message) {
    const { data, error } = await supabaseClient
        .from('messages')
        .insert([{ name, message }]);

    if (error) {
        console.error('خطأ في الإرسال:', error);
        return false;
    }
    return true;
}

// ==================== جلب الرسائل وعرضها ====================
async function loadMessages() {
    const { data, error } = await supabaseClient
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

    const messagesList = document.getElementById('messages-list');
    if (!messagesList) return;

    if (error) {
        messagesList.innerHTML = '<p style="color: red;">فشل تحميل الرسائل. حاول لاحقًا.</p>';
        console.error('خطأ في جلب الرسائل:', error);
        return;
    }

    if (data.length === 0) {
        messagesList.innerHTML = '<p>لا توجد رسائل بعد. كن أول من يرسل تهاني!</p>';
        return;
    }

    messagesList.innerHTML = '';
    data.forEach(msg => {
        const msgEl = document.createElement('div');
        msgEl.className = 'guest-message-item';
        msgEl.innerHTML = `
            <div class="message-header">
                <strong>${escapeHtml(msg.name)}</strong>
                <span class="message-time">${new Date(msg.created_at).toLocaleString('ar')}</span>
            </div>
            <p class="message-text">${escapeHtml(msg.message)}</p>
        `;
        messagesList.appendChild(msgEl);
    });
}

// ==================== منع XSS بسيط ====================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==================== معالجة إرسال النموذج ====================
document.getElementById('message-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('guest-name');
    const messageInput = document.getElementById('guest-message');
    const submitBtn = e.target.querySelector('.submit-btn');

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
        alert('من فضلك املأ الاسم والرسالة.');
        return;
    }

    // تعطيل الزر مؤقتًا
    submitBtn.disabled = true;
    submitBtn.textContent = 'جاري الإرسال...';

    const success = await submitMessage(name, message);

    if (success) {
        alert('تم إرسال رسالتك بنجاح! شكرًا لك ❤️');
        nameInput.value = '';
        messageInput.value = '';
        await loadMessages(); // تحديث القائمة
    } else {
        alert('فشل الإرسال. تأكد من الاتصال أو حاول لاحقًا.');
    }

    submitBtn.disabled = false;
    submitBtn.textContent = 'إرسال التمنية';
});

// ==================== تحميل الرسائل عند فتح الصفحة ====================
document.addEventListener('DOMContentLoaded', () => {
    // ... الكود القديم
    loadMessages(); // تحميل الرسائل بمجرد تحميل الصفحة
});