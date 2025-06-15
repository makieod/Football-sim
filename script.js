document.addEventListener('DOMContentLoaded', () => {
    // قاعدة بيانات الفرق (اسم، قارة، قوة من 100، رابط الشعار)
    const teams = [
        // أوروبا
        { name: "ريال مدريد", continent: "Europe", strength: 95, logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png" },
        { name: "برشلونة", continent: "Europe", strength: 92, logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png" },
        { name: "مانشستر سيتي", continent: "Europe", strength: 96, logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png" },
        { name: "ليفربول", continent: "Europe", strength: 91, logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png" },
        { name: "بايرن ميونخ", continent: "Europe", strength: 94, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png" },
        { name: "باريس سان جيرمان", continent: "Europe", strength: 90, logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png" },

        // آسيا
        { name: "الهلال السعودي", continent: "Asia", strength: 85, logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Al-Hilal_FC_logo.svg/1200px-Al-Hilal_FC_logo.svg.png" },
        { name: "النصر السعودي", continent: "Asia", strength: 84, logo: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Al-Nassr_FC.png" },
        { name: "أوراوا ريد دايموندز", continent: "Asia", strength: 78, logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Urawa_Red_Diamonds_logo.svg/1200px-Urawa_Red_Diamonds_logo.svg.png" },
        { name: "السد القطري", continent: "Asia", strength: 80, logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Al-Sadd_SC_logo.svg/1200px-Al-Sadd_SC_logo.svg.png" },

        // أفريقيا
        { name: "الأهلي المصري", continent: "Africa", strength: 83, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Al_Ahly_SC_logo.svg/1200px-Al_Ahly_SC_logo.svg.png" },
        { name: "الوداد البيضاوي", continent: "Africa", strength: 80, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Wydad_Athletic_Club_logo.svg/1200px-Wydad_Athletic_Club_logo.svg.png" },
        { name: "ماميلودي صنداونز", continent: "Africa", strength: 79, logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Mamelodi_Sundowns_FC_logo.svg/1200px-Mamelodi_Sundowns_FC_logo.svg.png" },
        { name: "الترجي التونسي", continent: "Africa", strength: 81, logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/b/b3/Logo_Esp%C3%A9rance_sportive_de_Tunis.svg/1200px-Logo_Esp%C3%A9rance_sportive_de_Tunis.svg.png" },

        // أمريكا الجنوبية
        { name: "فلامينغو", continent: "South America", strength: 86, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Flamengo_logo.svg/1200px-Flamengo_logo.svg.png" },
        { name: "بوكا جونيورز", continent: "South America", strength: 84, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Boca_Juniors_logo18.svg/1200px-Boca_Juniors_logo18.svg.png" },
        { name: "ريفر بليت", continent: "South America", strength: 85, logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/River_Plate_logo.svg/1200px-River_Plate_logo.svg.png" },
        { name: "بالميراس", continent: "South America", strength: 87, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/1200px-Palmeiras_logo.svg.png" },

        // أمريكا الشمالية
        { name: "لوس أنجلوس FC", continent: "North America", strength: 79, logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/Los_Angeles_FC_logo.svg/1200px-Los_Angeles_FC_logo.svg.png" },
        { name: "كلوب أمريكا", continent: "North America", strength: 80, logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Club_Am%C3%A9rica_logo.svg/1200px-Club_Am%C3%A9rica_logo.svg.png" },
        { name: "انتر ميامي", continent: "North America", strength: 82, logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Inter_Miami_CF_logo.svg/1200px-Inter_Miami_CF_logo.svg.png" },
    ];

    const team1Select = document.getElementById('team1-select');
    const team2Select = document.getElementById('team2-select');
    const startMatchBtn = document.getElementById('start-match-btn');
    const playAgainBtn = document.getElementById('play-again-btn');
    const errorMessage = document.getElementById('error-message');

    const setupScreen = document.getElementById('setup-screen');
    const matchScreen = document.getElementById('match-screen');
    
    let intervalId;

    // ملء قوائم اختيار الفرق
    function populateSelectors() {
        const continents = {
            "Europe": "أوروبا",
            "Asia": "آسيا",
            "Africa": "أفريقيا",
            "South America": "أمريكا الجنوبية",
            "North America": "أمريكا الشمالية"
        };
        
        [team1Select, team2Select].forEach(select => {
            select.innerHTML = ''; // مسح القائمة قبل الملء
            for (const continentKey in continents) {
                const optgroup = document.createElement('optgroup');
                optgroup.label = continents[continentKey];
                teams.filter(t => t.continent === continentKey).forEach(team => {
                    const option = document.createElement('option');
                    option.value = team.name;
                    option.textContent = team.name;
                    optgroup.appendChild(option);
                });
                select.appendChild(optgroup);
            }
        });
        
        team2Select.selectedIndex = 1; // اختيار فريق مختلف افتراضيا
    }

    function getTeamByName(name) {
        return teams.find(team => team.name === name);
    }

    function logEvent(minute, message, type = 'info') {
        const eventsContainer = document.getElementById('match-events');
        const eventElement = document.createElement('p');
        eventElement.innerHTML = `<strong>'${minute}</strong>: ${message}`;
        eventElement.classList.add(`event-${type}`);
        eventsContainer.prepend(eventElement);
    }

    function startMatch() {
        const team1Name = team1Select.value;
        const team2Name = team2Select.value;

        if (team1Name === team2Name) {
            errorMessage.textContent = 'الرجاء اختيار فريقين مختلفين!';
            return;
        }
        errorMessage.textContent = '';

        setupScreen.classList.remove('active');
        matchScreen.classList.add('active');

        const team1 = getTeamByName(team1Name);
        const team2 = getTeamByName(team2Name);

        // تحديث واجهة المباراة
        document.getElementById('team1-logo').src = team1.logo;
        document.getElementById('team1-name').textContent = team1.name;
        document.getElementById('team2-logo').src = team2.logo;
        document.getElementById('team2-name').textContent = team2.name;
        document.getElementById('match-events').innerHTML = '';
        playAgainBtn.style.display = 'none';

        simulateMatch(team1, team2);
    }
    
    function simulateMatch(team1, team2) {
        let minute = 0;
        let score1 = 0;
        let score2 = 0;
        document.getElementById('score').textContent = `${score1} - ${score2}`;

        logEvent(0, `انطلقت المباراة بين ${team1.name} و ${team2.name}!`);

        intervalId = setInterval(() => {
            minute++;
            document.getElementById('match-timer').textContent = `${minute}'`;
            
            // حساب فرصة حدوث هجمة بناءً على قوة الفريقين
            const attackChance = (team1.strength + team2.strength) / 20; // عامل لتحديد كثافة الهجمات
            
            if (Math.random() * 100 < attackChance) {
                // تحديد الفريق المهاجم بناءً على القوة
                const attackingTeam = (Math.random() * (team1.strength + team2.strength) < team1.strength) ? team1 : team2;
                const defendingTeam = (attackingTeam === team1) ? team2 : team1;

                // حساب فرصة تسجيل الهدف
                const goalChance = (attackingTeam.strength / defendingTeam.strength) * 0.15; // فرصة أساسية للهدف

                if (Math.random() < goalChance) { // حدث تسجيل هدف
                    if (attackingTeam === team1) {
                        score1++;
                        logEvent(minute, `هدف! ${team1.name} يسجل الهدف!`, 'goal');
                    } else {
                        score2++;
                        logEvent(minute, `هدف! ${team2.name} يسجل الهدف!`, 'goal');
                    }
                    document.getElementById('score').textContent = `${score1} - ${score2}`;
                    document.getElementById('score').style.animation = 'score-pop 0.5s ease-out';
                    document.querySelector('.pitch').classList.add('goal-flash');
                    setTimeout(() => {
                        document.querySelector('.pitch').classList.remove('goal-flash');
                        document.getElementById('score').style.animation = '';
                    }, 700);

                } else { // فرصة ضائعة أو حدث آخر
                    const eventRandom = Math.random();
                    if (eventRandom < 0.7) { // فرصة ضائعة
                        logEvent(minute, `فرصة خطيرة ضائعة من ${attackingTeam.name}!`, 'chance');
                    } else if (eventRandom < 0.9) { // خطأ وبطاقة
                        const cardRandom = Math.random();
                        if(cardRandom < 0.1) { // بطاقة حمراء
                           logEvent(minute, `بطاقة حمراء! طرد لاعب من ${defendingTeam.name} بعد تدخل عنيف!`, 'card-red');
                        } else { // بطاقة صفراء
                           logEvent(minute, `بطاقة صفراء للاعب من ${defendingTeam.name}.`, 'card-yellow');
                        }
                    }
                }
            }

            if (minute >= 90) {
                endMatch(team1, team2, score1, score2);
            }
        }, 100); // سرعة المحاكاة: 100 ميلي ثانية لكل دقيقة في المباراة
    }
    
    function endMatch(team1, team2, score1, score2) {
        clearInterval(intervalId);
        let resultMessage;
        if (score1 > score2) {
            resultMessage = `نهاية المباراة! ${team1.name} يفوز على ${team2.name} بنتيجة ${score1} - ${score2}.`;
        } else if (score2 > score1) {
            resultMessage = `نهاية المباراة! ${team2.name} يفوز على ${team1.name} بنتيجة ${score2} - ${score1}.`;
        } else {
            resultMessage = `نهاية المباراة! تعادل إيجابي بين الفريقين بنتيجة ${score1} - ${score2}.`;
        }
        logEvent(90, resultMessage, 'info');
        document.getElementById('match-timer').textContent = "Full Time";
        playAgainBtn.style.display = 'block';
    }

    function resetGame() {
        matchScreen.classList.remove('active');
        setupScreen.classList.add('active');
    }

    // ربط الأحداث
    startMatchBtn.addEventListener('click', startMatch);
    playAgainBtn.addEventListener('click', resetGame);
    
    // بدء اللعبة
    populateSelectors();
});
