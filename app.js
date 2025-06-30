// ใช้ DOMContentLoaded เพื่อให้แน่ใจว่า HTML โหลดเสร็จก่อน JS ทำงาน
document.addEventListener('DOMContentLoaded', function () {

    // --- โค้ดเดิม Portfolio: Typewriter ---
    const changingTextElement = document.querySelector('.changing-text');
    if (changingTextElement) { // ตรวจสอบว่า element มีจริง
        const textArray = ["gamer", "programer", "freelancer", "Otaku"];
        let textArrayIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 200;
        const deletingSpeed = 100;
        const pauseBetweenTexts = 2000;

        function type() {
            if (!changingTextElement) return; // หยุดถ้า element หายไป
            const currentText = textArray[textArrayIndex];
            if (!isDeleting && charIndex < currentText.length) {
                changingTextElement.textContent += currentText.charAt(charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            } else if (isDeleting && charIndex > 0) {
                changingTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(type, deletingSpeed); // เปลี่ยนจาก erase เป็น type
            } else if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, pauseBetweenTexts); // เปลี่ยนจาก erase เป็น type
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
                setTimeout(type, typingSpeed);
            }
        }
        type(); // เริ่มทำงาน
    }


    // --- โค้ดเดิม Portfolio: Dropdown Menu ---
    const hamburgIcon = document.querySelector('.hamburg');
    const cancelIcon = document.querySelector('.cancel');
    const dropdownMenu = document.querySelector('.dropdown');

    function hamburg() {
        if (dropdownMenu) dropdownMenu.classList.add('open');
    }
    function cancel() {
        if (dropdownMenu) dropdownMenu.classList.remove('open');
    }
    if (hamburgIcon) hamburgIcon.addEventListener('click', hamburg);
    if (cancelIcon) cancelIcon.addEventListener('click', cancel);
    // เพิ่ม: ปิด dropdown เมื่อคลิกลิงก์
    if (dropdownMenu) {
        const dropdownLinks = dropdownMenu.querySelectorAll('a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', cancel);
        });
    }


    // --- โค้ดเดิม Portfolio: Service Box Hover (ถ้ายังต้องการ) ---
    const serviceBoxes = document.querySelectorAll('.services .boxes .box');
    serviceBoxes.forEach(box => {
        box.addEventListener('mouseenter', function () { this.classList.add('hovered'); });
        box.addEventListener('mouseleave', function () { this.classList.remove('hovered'); });
    });


    // --- โค้ดเดิม Portfolio: Blinking Bar ---
    function createLastCharBlinkingEffect(elementSelector, blinkCharacter = '_', intervalTime = 500) {
        const element = document.querySelector(elementSelector);
        if (!element) {
            return;
        }
        let isBlinking = false; // ใช้ตัวแปรช่วย track สถานะ
        setInterval(() => {
            const currentText = element.textContent;
            const baseText = currentText.endsWith(blinkCharacter) ? currentText.slice(0, -1) : currentText;

            if (isBlinking) {
                element.textContent = baseText; // แสดงเฉพาะ text
            } else {
                element.textContent = baseText + blinkCharacter; // แสดง text + blink
            }
            isBlinking = !isBlinking; // สลับสถานะ
        }, intervalTime);
    }
    createLastCharBlinkingEffect('.fixed-bar', '│', 500);


    // --- โค้ดเดิม Portfolio: Back to Top Button ---
    let backToTopBtn = document.getElementById("backToTopBtn");
    let homeSection = document.getElementById("home"); // ใช้ home section แทน about
    let homeSectionOffsetTop = homeSection ? homeSection.offsetTop + (homeSection.offsetHeight / 2) : 200; // เลื่อนลงมากลางๆ home section ค่อยโชว์

    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (backToTopBtn) { // ตรวจสอบปุ่มก่อน
            if (document.body.scrollTop > homeSectionOffsetTop || document.documentElement.scrollTop > homeSectionOffsetTop) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        }
    }
    if (backToTopBtn) { // ตรวจสอบปุ่มก่อน add listener
        backToTopBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' }); // ใช้ window.scrollTo
        });
    }


    // --- โค้ด 3D Effect (Targeting Parent Wrapper) ---
    const wrapperFor3D = document.querySelector('.content-and-player-wrapper');

    if (wrapperFor3D) {
        wrapperFor3D.addEventListener('mousemove', (e) => {
            const rect = wrapperFor3D.getBoundingClientRect();
            const centerX = rect.left + rect.width / 3;
            const centerY = rect.top + rect.height / 3;
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const deltaX = (mouseX - centerX) / (rect.width / 2);
            const deltaY = (mouseY - centerY) / (rect.height / 2);
            const rotateX = deltaY * 8;
            const rotateY = deltaX * -8;
            wrapperFor3D.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        wrapperFor3D.addEventListener('mouseleave', () => {
            wrapperFor3D.style.transform = `perspective(600px) rotateX(0deg) rotateY(0deg)`;
        });
    } else {
        console.warn("Element '.content-and-player-wrapper' not found for 3D effect.");
    }
    // --- จบส่วน 3D Effect ---


    // --- ฟังก์ชันสำหรับดึงคำนำหน้าประเภทกิจกรรม ---
    function getActivityTypePrefix(type) {
        switch (type) {
            case 0: return 'Playing';
            case 2: return 'Listening to';
            case 3: return 'Watching';
            default: return '';
        }
    }

    // --- ฟังก์ชันสำหรับคำนวณและจัดรูปแบบเวลาที่ผ่านไป ---
    function formatElapsedTime(startTime) {
        const seconds = Math.floor((Date.now() - startTime) / 1000);
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s} elapsed`;
    }

    // --- ส่วนของการ์ดโปรไฟล์ Discord ---
    const discordCardContainer = document.querySelector('.discord-profile-card');
    let activityTimer = null; // สร้างตัวแปรสำหรับเก็บ timer นอก fetch

    if (discordCardContainer) {
        const userId = '1007237437627572275';
        const apiUrl = `https://api.ame.nattapat2871.online/v1/user/${userId}?t=${new Date().getTime()}`;

        fetch(apiUrl)
            .then(res => {
                if (!res.ok) throw new Error(`API returned status ${res.status}`);
                return res.json();
            })
            .then(data => {
                const user = data?.ame?.user;
                const profile = data?.ame;

                if (!user || !profile) throw new Error("Invalid data structure from API");

                // เคลียร์ Timer เก่าทุกครั้งที่โหลดข้อมูลใหม่ เพื่อป้องกันการทำงานซ้อน
                if (activityTimer) clearInterval(activityTimer);

                const avatarUrl = user.avatar.startsWith('a_') ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?size=128` : `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;
                const statusClass = profile.discord_status || 'offline';

                // ประกาศตัวแปรสำหรับเก็บ HTML แต่ละส่วน
                let decorationHtml = '';
                let activityHtml = '';
                let activityAssetHtml = '';
                let timestampHtml = '';

                if (user.avatar_decoration_data?.asset) {
                    decorationHtml = `<img src="https://cdn.discordapp.com/avatar-decoration-presets/${user.avatar_decoration_data.asset}.png" alt="Decoration" class="discord-avatar-decoration">`;
                }

                const activity = profile.activities?.find(act => act.type === 0 || act.type === 2 || act.type === 3 || act.type === 4) || null;

                if (activity) {
                    // สร้าง Activity Text
                    if (activity.type === 4 && activity.state) {
                        activityHtml = `<div class="discord-activity"><div>${activity.state}</div></div>`;
                    } else {
                        const prefix = getActivityTypePrefix(activity.type);
                        const nameLine = (prefix && activity.name) ? `<div>${prefix} - ${activity.name}</div>` : (activity.name ? `<div>${activity.name}</div>` : '');
                        const detailsLine = activity.details ? `<div>${activity.details}</div>` : '';
                        const stateLine = activity.state ? `<div>${activity.state}</div>` : '';
                        activityHtml = `<div class="discord-activity">${nameLine}${detailsLine}${stateLine}</div>`;
                    }

                    // สร้าง Activity Asset Image
                    if (activity.assets?.large_image) {
                        let imageUrl = activity.assets.large_image;
                        if (imageUrl.startsWith('mp:external/')) {
                            imageUrl = imageUrl.replace('mp:external/', 'https://media.discordapp.net/external/');
                        }
                        activityAssetHtml = `<img src="${imageUrl}" alt="Activity Asset" class="discord-activity-asset">`;
                    }

                    // สร้างและเริ่ม Timestamp
                    if (activity.timestamps?.start) {
                        const startTime = parseInt(activity.timestamps.start, 10);
                        timestampHtml = `<div class="discord-activity-timestamp"></div>`;

                        activityTimer = setInterval(() => {
                            const timestampElement = document.querySelector('.discord-activity-timestamp');
                            if (timestampElement) {
                                timestampElement.textContent = formatElapsedTime(startTime);
                            } else {
                                clearInterval(activityTimer);
                            }
                        }, 1000);
                    }
                }

                const cardHtml = `
                    <div class="discord-avatar-wrapper">
                        <img src="${avatarUrl}" alt="Avatar" class="discord-avatar">
                        ${decorationHtml}
                        <div class="discord-status ${statusClass}"></div>
                    </div>
                    <div class="discord-info-wrapper">
                        <div class="discord-username">@${user.username}</div>
                        ${activityHtml}
                        ${timestampHtml}
                    </div>
                    ${activityAssetHtml}
                `;
                discordCardContainer.innerHTML = cardHtml;

                // แสดงผลเวลาครั้งแรกทันที
                if (activity?.timestamps?.start) {
                    const timestampElement = document.querySelector('.discord-activity-timestamp');
                    if (timestampElement) {
                        timestampElement.textContent = formatElapsedTime(parseInt(activity.timestamps.start, 10));
                    }
                }
            })
            .catch(error => {
                console.error("Error fetching or displaying Discord profile:", error);
                discordCardContainer.innerHTML = `<div style="color:#f04747; padding: 16px; text-align: center;">Could not load Discord profile.</div>`;
            });
    }

    // --- ส่วนจัดการ Image/Video Switcher ---
    const imageElement = document.getElementById('ellipse-image');
    const videoElement = document.getElementById('ellipse-video');
    const ellipseContainer = document.getElementById('media-ellipse');
    let switcherIntervalId = null;

    if (imageElement && videoElement && ellipseContainer) {
        const switchIntervalTime = 5000;
        function switchMedia() {
            const currentActive = ellipseContainer.querySelector('.media-item.active');
            if (!currentActive) return;
            let nextActive;
            if (currentActive === imageElement) {
                nextActive = videoElement;
                videoElement.play().catch(e => console.warn("Video play error:", e));
            } else {
                nextActive = imageElement;
                videoElement.pause();
            }
            currentActive.classList.remove('active');
            nextActive.classList.add('active');
        }
        function startMediaSwitcher() {
            if (!switcherIntervalId) {
                switcherIntervalId = setInterval(switchMedia, switchIntervalTime);
                console.log("Image/Video switcher started.");
            }
        }
    } else {
        console.warn("Ellipse switcher elements not found. Switcher disabled.");
    }

    // --- ส่วนจัดการ Typing Title Effect ---
    const siteTitles = [
        "Welcome to",
        "Nattapat Jistom",
        "Portfolio",
        "Web Page developer",
    ];
    let titleWordIndex = 0;
    let titleLetterIndex = 0;
    let titleIsDeleting = false;
    const typingDelay = 180;
    const deletingDelay = 80;
    const pauseBeforeDelete = 2000;
    const pauseBeforeTyping = 500;
    const cursor = '│';

    function typeTitleEffect() {
        const currentWord = siteTitles[titleWordIndex];
        let displayedTitle = '';
        let nextTimeoutDelay = 0;

        if (titleIsDeleting) {
            displayedTitle = currentWord.substring(0, titleLetterIndex - 1);
            titleLetterIndex--;
            nextTimeoutDelay = deletingDelay;
            if (displayedTitle === '') {
                titleIsDeleting = false;
                titleWordIndex = (titleWordIndex + 1) % siteTitles.length;
                titleLetterIndex = 0;
                nextTimeoutDelay = pauseBeforeTyping;
            }
        } else {
            displayedTitle = currentWord.substring(0, titleLetterIndex + 1);
            titleLetterIndex++;
            nextTimeoutDelay = typingDelay;
            if (displayedTitle === currentWord) {
                titleIsDeleting = true;
                nextTimeoutDelay = pauseBeforeDelete;
            }
        }
        document.title = displayedTitle + cursor;
        setTimeout(typeTitleEffect, nextTimeoutDelay);
    }

    setTimeout(typeTitleEffect, 1500);

    // --- เริ่ม AOS animation ทันทีเมื่อโหลดหน้าเว็บ ---
    if (typeof AOS !== 'undefined') {
        AOS.init();
        console.log('AOS Initialized on page load.');
    } else {
        console.warn('AOS not found.');
    }

});