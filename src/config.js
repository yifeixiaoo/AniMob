export const HeaderTitle = 'AniMob'
export function getCurrentYearAndSeason() {
    const monthToSeason = {
        0: 'Winter',   // January
        1: 'Winter',   // February
        2: 'Winter',   // March
        3: 'Spring',   // April
        4: 'Spring',   // May
        5: 'Spring',   // June
        6: 'Summer',   // July
        7: 'Summer',   // August
        8: 'Summer',     // September
        9: 'Fall',     // October
        10: 'Fall',    // November
        11: 'Fall'   // December
    };

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    let currentSeason = monthToSeason[currentMonth];
    if (currentSeason === 'Winter' && currentMonth === 0) {
        return { year: currentYear - 1, season: currentSeason };
    }

    return { year: currentYear, season: currentSeason };
}