/**
 * Seasonal Content Manager
 * Manages the display of seasonal content based on the current day of the year.
 * Supports testing with ?testDate=YYYY-MM-DD URL parameter.
 */

(function() {
    'use strict';

    // Add js-enabled class to HTML element as early as possible
    document.documentElement.classList.add('js-enabled');

    /**
     * Get the day of year (1-366) from a date, accounting for leap years
     * @param {Date} date - The date to calculate from
     * @returns {number} Day of year (1-366)
     */
    function getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        
        return dayOfYear;
    }

    /**
     * Check if a year is a leap year
     * @param {number} year - The year to check
     * @returns {boolean} True if leap year
     */
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    /**
     * Get the adjusted day of year matching PHP's logic:
     * - Days are numbered 1-366 (not 0-365)
     * - In leap years, after Feb 28 (day 59), add 1 to align with non-leap year dates
     * @param {Date} date - The date to calculate from
     * @returns {number} Adjusted day of year (1-366)
     */
    function getAdjustedDayOfYear(date) {
        let day = getDayOfYear(date);
        const year = date.getFullYear();
        const leap = isLeapYear(year);
        
        // Adjust for leap year: if leap year and after Feb 28 (day 59), add 1
        if (leap && day > 59) {
            day = day + 1;
        }
        
        return day;
    }

    /**
     * Get the date to use for determining seasonal content
     * Checks URL for testDate parameter, otherwise uses current date
     * @returns {Date} The date to use
     */
    function getEffectiveDate() {
        const urlParams = new URLSearchParams(window.location.search);
        const testDate = urlParams.get('testDate');
        
        if (testDate) {
            const date = new Date(testDate);
            if (!isNaN(date.getTime())) {
                console.log(`Using test date: ${testDate} (Day ${getAdjustedDayOfYear(date)})`);
                return date;
            } else {
                console.warn(`Invalid testDate parameter: ${testDate}. Using current date.`);
            }
        }
        
        return new Date();
    }

    /**
     * Show the appropriate seasonal content based on the day of year
     */
    function showSeasonalContent() {
        const urlParams = new URLSearchParams(window.location.search);
        const showAll = urlParams.has('showAll');
        
        // If showAll parameter is present, show all content and exit
        if (showAll) {
            const sections = document.querySelectorAll('.seasonal-content');
            sections.forEach(section => {
                section.style.display = 'block';
            });
            console.log('Showing all seasonal content (showAll mode)');
            return;
        }
        
        const date = getEffectiveDate();
        const dayOfYear = getAdjustedDayOfYear(date);
        
        console.log(`Date: ${date.toDateString()}, Day of Year: ${dayOfYear}`);
        
        // Get all seasonal content sections
        const sections = document.querySelectorAll('.seasonal-content');
        let foundMatch = false;
        
        sections.forEach(section => {
            const startDay = parseInt(section.getAttribute('data-day-start'), 10);
            const endDay = parseInt(section.getAttribute('data-day-end'), 10);
            
            // Check if current day falls within this section's range
            if (dayOfYear >= startDay && dayOfYear <= endDay) {
                section.style.display = 'block';
                console.log(`Showing content for days ${startDay}-${endDay}`);
                foundMatch = true;
            } else {
                section.style.display = 'none';
            }
        });
        
        if (!foundMatch) {
            console.warn(`No matching seasonal content found for day ${dayOfYear}`);
        }
        
        // Add visual indicator if in test mode
        if (new URLSearchParams(window.location.search).has('testDate')) {
            addTestModeIndicator(date, dayOfYear);
        }
    }

    /**
     * Add a visual indicator when in test mode
     * @param {Date} date - The test date being used
     * @param {number} dayOfYear - The day of year
     */
    function addTestModeIndicator(date, dayOfYear) {
        const existingIndicator = document.getElementById('test-mode-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        const indicator = document.createElement('div');
        indicator.id = 'test-mode-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #ff9800;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            z-index: 10000;
        `;
        indicator.innerHTML = `
            <strong>Test Mode</strong><br>
            Date: ${date.toLocaleDateString('en-GB')}<br>
            Day: ${dayOfYear}
        `;
        document.body.appendChild(indicator);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showSeasonalContent);
    } else {
        showSeasonalContent();
    }

    // Expose functions for testing in console
    window.seasonalContent = {
        getDayOfYear,
        getAdjustedDayOfYear,
        isLeapYear,
        showSeasonalContent
    };

})();
