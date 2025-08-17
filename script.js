// كود العداد التنازلي المبسط
console.log('تم تحميل ملف JavaScript');

// تاريخ الزفاف - 11 نوفمبر 2025 الساعة 4 مساءً
const weddingDate = new Date('2025-11-11T16:00:00').getTime();

// متغير عام للعداد
let countdownInterval;

// متغيرات عناصر العداد
let daysEl, hoursEl, minutesEl, secondsEl;

// دالة لتهيئة عناصر العداد
function initCountdownElements() {
    daysEl = document.getElementById('days');
    hoursEl = document.getElementById('hours');
    minutesEl = document.getElementById('minutes');
    secondsEl = document.getElementById('seconds');
    
    console.log('تم تهيئة عناصر العداد:', { daysEl, hoursEl, minutesEl, secondsEl });
    
    return daysEl && hoursEl && minutesEl && secondsEl;
}

// دالة لتحديث عناصر العد التنازلي مع تأثير بصري
function updateCountdownElement(element, value) {
    const formattedValue = value.toString().padStart(2, '0');
    if (element.textContent !== formattedValue) {
        element.classList.add('countdown-update');
        element.textContent = formattedValue;
        setTimeout(() => {
            element.classList.remove('countdown-update');
        }, 500);
    } else {
        element.textContent = formattedValue;
    }
}

// تحديث العد التنازلي بشكل مباشر
function updateCountdown() {
    // التحقق من وجود عناصر العداد
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
        console.log('عناصر العداد غير موجودة، محاولة تهيئتها...');
        if (!initCountdownElements()) {
            console.error('فشل في العثور على عناصر العداد!');
            return; // الخروج من الدالة إذا لم يتم العثور على العناصر
        }
    }
    
    // الحصول على الوقت الحالي
    const now = new Date().getTime();
    
    // حساب الوقت المتبقي
    const distance = weddingDate - now;
    
    // حسابات الوقت
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    console.log('العد التنازلي:', { days, hours, minutes, seconds });
    
    // عرض النتيجة بشكل مباشر مع تنسيق الأرقام وإضافة تأثير بصري
    updateCountdownElement(daysEl, days);
    updateCountdownElement(hoursEl, hours);
    updateCountdownElement(minutesEl, minutes);
    updateCountdownElement(secondsEl, seconds);
    
    // إذا انتهى العد التنازلي
    if (distance < 0) {
        clearInterval(countdownInterval);
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        
        // إضافة رسالة عند انتهاء العد التنازلي
        const countdownSection = document.querySelector('.countdown-section');
        if (countdownSection) {
            const completedMessage = document.createElement('p');
            completedMessage.textContent = 'اليوم هو يوم فرحنا!';
            completedMessage.classList.add('completed-message');
            countdownSection.appendChild(completedMessage);
        }
    }
}

// انتظر حتى يتم تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الصفحة بالكامل');
    
    // تهيئة عناصر العداد
    if (initCountdownElements()) {
        // تشغيل العداد فوراً
        updateCountdown();
        
        // إلغاء العداد السابق إذا كان موجوداً
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        
        // تعيين عداد جديد لتحديث العد التنازلي كل ثانية
        countdownInterval = setInterval(updateCountdown, 1000);
    } else {
        console.error('فشل في تهيئة عناصر العداد');
    }
});

// إضافة معالج حدث لزر تشغيل/إيقاف الموسيقى
document.addEventListener('DOMContentLoaded', function() {
    console.log('تهيئة زر الموسيقى...');
    const musicToggle = document.getElementById('music-toggle');
    const audio = document.getElementById('background-music');
    const musicStatusText = document.getElementById('music-status');
    
    console.log('عناصر الموسيقى:', { 
        musicToggle: musicToggle ? 'موجود' : 'غير موجود', 
        audio: audio ? 'موجود' : 'غير موجود',
        musicStatusText: musicStatusText ? 'موجود' : 'غير موجود'
    });
    
    // تحديث حالة الزر عند تحميل الصفحة
    function updateMusicButtonState() {
        if (!musicToggle) return;
        
        if (audio && audio.paused) {
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i> <span>تشغيل</span>';
            if (musicStatusText) musicStatusText.textContent = 'الموسيقى متوقفة';
            console.log('تحديث حالة الموسيقى: متوقفة');
        } else {
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i> <span>إيقاف</span>';
            if (musicStatusText) musicStatusText.textContent = 'الموسيقى تعمل';
            console.log('تحديث حالة الموسيقى: تعمل');
        }
    }
    
    if (musicToggle && audio) {
        // محاولة تحميل الصوت مسبقًا
        audio.load();
        
        // تحديث حالة الزر عند التحميل
        updateMusicButtonState();
        
        // إضافة معالج الحدث للنقر
        musicToggle.addEventListener('click', function() {
            console.log('تم النقر على زر الموسيقى');
            if (audio.paused) {
                console.log('محاولة تشغيل الموسيقى...');
                audio.play().then(() => {
                    console.log('تم تشغيل الموسيقى بنجاح');
                    updateMusicButtonState();
                }).catch(error => {
                    console.error('فشل تشغيل الموسيقى:', error);
                    alert('لا يمكن تشغيل الموسيقى. يرجى التأكد من وجود ملف الصوت.');
                });
            } else {
                console.log('إيقاف الموسيقى...');
                audio.pause();
                updateMusicButtonState();
            }
        });
        
        // الاستماع لأحداث تشغيل وإيقاف الصوت
        audio.addEventListener('play', function() {
            console.log('حدث تشغيل الصوت');
            updateMusicButtonState();
        });
        
        audio.addEventListener('pause', function() {
            console.log('حدث إيقاف الصوت');
            updateMusicButtonState();
        });
        
        audio.addEventListener('error', function(e) {
            console.error('خطأ في تشغيل الصوت:', e);
            alert('حدث خطأ في تشغيل الموسيقى. يرجى التأكد من وجود ملف الصوت.');
        });
    } else {
        console.error('لم يتم العثور على عناصر الموسيقى المطلوبة!');
    }
});

// Show more buttons functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('تهيئة أزرار عرض المزيد...');
    
    // For Quran verses
    const showMoreVersesBtn = document.getElementById('show-more-verses');
    const moreVersesContent = document.getElementById('more-verses');
    
    console.log('أزرار الآيات:', { showMoreVersesBtn, moreVersesContent });
    
    if (showMoreVersesBtn && moreVersesContent) {
        // تأكد من أن المحتوى مخفي في البداية
        moreVersesContent.style.display = 'none';
        
        showMoreVersesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('تم النقر على زر عرض المزيد من الآيات');
            
            if (moreVersesContent.style.display === 'none' || moreVersesContent.style.display === '') {
                moreVersesContent.style.display = 'block';
                showMoreVersesBtn.textContent = 'عرض أقل';
                console.log('تم عرض المزيد من الآيات');
            } else {
                moreVersesContent.style.display = 'none';
                showMoreVersesBtn.textContent = 'عرض المزيد من الآيات';
                console.log('تم إخفاء الآيات الإضافية');
            }
        });
    } else {
        console.error('لم يتم العثور على عناصر الآيات!');
    }
    
    // For Hadith
    const showMoreHadithBtn = document.getElementById('show-more-hadith');
    const moreHadithContent = document.getElementById('more-hadith');
    
    console.log('أزرار الأحاديث:', { showMoreHadithBtn, moreHadithContent });
    
    if (showMoreHadithBtn && moreHadithContent) {
        // تأكد من أن المحتوى مخفي في البداية
        moreHadithContent.style.display = 'none';
        
        showMoreHadithBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('تم النقر على زر عرض المزيد من الأحاديث');
            
            if (moreHadithContent.style.display === 'none' || moreHadithContent.style.display === '') {
                moreHadithContent.style.display = 'block';
                showMoreHadithBtn.textContent = 'عرض أقل';
                console.log('تم عرض المزيد من الأحاديث');
            } else {
                moreHadithContent.style.display = 'none';
                showMoreHadithBtn.textContent = 'عرض المزيد من الأحاديث';
                console.log('تم إخفاء الأحاديث الإضافية');
            }
        });
    } else {
        console.error('لم يتم العثور على عناصر الأحاديث!');
    }
    
    // For Dua
    const showMoreDuaBtn = document.getElementById('show-more-dua');
    const moreDuaContent = document.getElementById('more-dua');
    
    console.log('أزرار الأدعية:', { showMoreDuaBtn, moreDuaContent });
    
    if (showMoreDuaBtn && moreDuaContent) {
        // تأكد من أن المحتوى مخفي في البداية
        moreDuaContent.style.display = 'none';
        
        showMoreDuaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('تم النقر على زر عرض المزيد من الأدعية');
            
            if (moreDuaContent.style.display === 'none' || moreDuaContent.style.display === '') {
                moreDuaContent.style.display = 'block';
                showMoreDuaBtn.textContent = 'عرض أقل';
                console.log('تم عرض المزيد من الأدعية');
            } else {
                moreDuaContent.style.display = 'none';
                showMoreDuaBtn.textContent = 'عرض المزيد من الأدعية';
                console.log('تم إخفاء الأدعية الإضافية');
            }
        });
    } else {
        console.error('لم يتم العثور على عناصر الأدعية!');
    }
});
    
// رسوم متحركة للطائرة
function animateAirplane() {
    const airplane = document.querySelector('.airplane');
    const randomDelay = Math.floor(Math.random() * 30000) + 30000; // 30-60 ثانية
    
    // إعادة تعيين الرسوم المتحركة
    airplane.style.animation = 'none';
    airplane.offsetHeight; // تشغيل إعادة التدفق
    airplane.style.animation = `fly ${randomDelay/1000}s linear`;
    
    setTimeout(animateAirplane, randomDelay);
}

// Initialize animations
animateAirplane();

// إضافة تمرير سلس لجميع الروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// تهيئة الموقع مع رسوم متحركة للتحميل
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});