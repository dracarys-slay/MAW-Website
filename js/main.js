// MAW Robotics Website - Main JavaScript

const MAW_ADMIN_SETTINGS_KEY = 'mawAdminSettings';
const MAW_ADMIN_DEFAULT_SETTINGS = {
    email: 'admin@mawvriddhifuturetech.com',
    password: 'MAW_Admin@2026'
};

function normalizeHost(hostname) {
    return (hostname || '').toLowerCase().trim();
}

function isLocalHost(hostname) {
    const host = normalizeHost(hostname);
    return host === 'localhost' || host === '127.0.0.1' || host === '::1' || host === '[::1]';
}

function getAdminSettings() {
    try {
        const stored = JSON.parse(localStorage.getItem(MAW_ADMIN_SETTINGS_KEY) || '{}');
        const settings = {
            ...MAW_ADMIN_DEFAULT_SETTINGS,
            ...stored
        };

        if (!settings.email || !settings.password) {
            return { ...MAW_ADMIN_DEFAULT_SETTINGS };
        }

        return settings;
    } catch (error) {
        return { ...MAW_ADMIN_DEFAULT_SETTINGS };
    }
}

function saveAdminSettings(nextSettings) {
    const merged = {
        ...getAdminSettings(),
        ...nextSettings
    };

    localStorage.setItem(MAW_ADMIN_SETTINGS_KEY, JSON.stringify(merged));
    return merged;
}

function isAdminHostAllowed() {
    return true;
}

function updateAdminLinkVisibility() {
    const adminLinks = document.querySelectorAll('.admin-link');
    adminLinks.forEach((link) => {
        link.style.display = '';
        link.title = 'Admin Login';
    });
}

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for anchor links on the same page
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = href ? document.querySelector(href) : null;

        if (href && href !== '#' && target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Active navigation link while scrolling
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        const href = link.getAttribute('href') || '';
        link.classList.remove('active');

        if (href.startsWith('#') && href.slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form submission helper
function handleFormSubmit(formId, onSuccess) {
    const form = document.getElementById(formId);
    if (!form) {
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {};

        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                continue;
            }

            if (Object.prototype.hasOwnProperty.call(data, key)) {
                if (!Array.isArray(data[key])) {
                    data[key] = [data[key]];
                }
                data[key].push(value);
            } else {
                data[key] = value;
            }
        }

        form.querySelectorAll('input[type="file"]').forEach((input) => {
            const field = input.name || input.id;
            const files = Array.from(input.files || []).map((file) => file.name);
            data[field] = files.length ? files.join(', ') : 'Not provided';
        });

        Object.keys(data).forEach((key) => {
            if (Array.isArray(data[key])) {
                data[key] = data[key].join(', ');
            }
        });

        const submissions = JSON.parse(localStorage.getItem(formId) || '[]');
        const record = {
            ...data,
            timestamp: new Date().toLocaleString()
        };

        submissions.push(record);
        localStorage.setItem(formId, JSON.stringify(submissions));

        let savedToServer = false;
        try {
            const response = await fetch('/api/submissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    formId,
                    record
                })
            });
            savedToServer = response.ok;
        } catch (error) {
            savedToServer = false;
        }

        if (savedToServer) {
            showAlert('success', 'Form submitted successfully. MAW Robotics will contact you soon.');
        } else {
            showAlert('success', 'Form submitted locally. Server sync is currently unavailable.');
        }

        form.reset();

        if (typeof onSuccess === 'function') {
            onSuccess();
        }
    });
}

function showAlert(type, message, duration = 5000) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = message;

    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alert, container.firstChild);
        setTimeout(() => alert.remove(), duration);
    }
}

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function checkAdminAccess() {
    if (!sessionStorage.getItem('adminToken')) {
        window.location.href = 'admin.html';
    }
}

function exportToCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    if (!table) {
        return;
    }

    const csv = [];

    const headers = [];
    table.querySelectorAll('th').forEach((th) => {
        headers.push('"' + th.innerText.replace(/"/g, '""') + '"');
    });
    csv.push(headers.join(','));

    table.querySelectorAll('tbody tr').forEach((tr) => {
        const row = [];
        tr.querySelectorAll('td').forEach((td) => {
            row.push('"' + td.innerText.replace(/"/g, '""') + '"');
        });
        csv.push(row.join(','));
    });

    const csvContent = csv.join('\n');
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    link.download = filename + '.csv';
    link.click();
}

function printTable(tableId) {
    const table = document.getElementById(tableId);
    if (!table) {
        return;
    }

    const printWindow = window.open('', '', 'height=400,width=800');
    printWindow.document.write(table.outerHTML);
    printWindow.document.close();
    printWindow.print();
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NPR'
    }).format(amount);
}

function searchTable(inputId, tableId) {
    const searchInput = document.getElementById(inputId);
    if (!searchInput) {
        return;
    }

    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const table = document.getElementById(tableId);

        if (table) {
            table.querySelectorAll('tbody tr').forEach((row) => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        }
    });
}

function filterTable(filterSelectId, tableId, columnIndex) {
    const filterSelect = document.getElementById(filterSelectId);
    if (!filterSelect) {
        return;
    }

    filterSelect.addEventListener('change', (e) => {
        const filterValue = e.target.value.toLowerCase();
        const table = document.getElementById(tableId);

        if (table) {
            table.querySelectorAll('tbody tr').forEach((row) => {
                const cell = row.cells[columnIndex];
                if (cell) {
                    const cellText = cell.innerText.toLowerCase();
                    row.style.display = filterValue === '' || cellText.includes(filterValue) ? '' : 'none';
                }
            });
        }
    });
}

function addRealTimeValidation(inputSelector, validationFn) {
    document.querySelectorAll(inputSelector).forEach((input) => {
        input.addEventListener('input', (e) => {
            e.target.style.borderColor = validationFn(e.target.value) ? 'green' : 'red';
        });
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9\s\-\+\(\)]{10,}$/;
    return re.test(phone);
}

addRealTimeValidation('input[type="email"]', validateEmail);
addRealTimeValidation('input[type="tel"]', validatePhone);

function logout() {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminEmail');
    window.location.href = 'admin.html';
}

function trackPageView(pageName) {
    const analytics = JSON.parse(localStorage.getItem('pageAnalytics') || '{}');
    analytics[pageName] = (analytics[pageName] || 0) + 1;
    localStorage.setItem('pageAnalytics', JSON.stringify(analytics));
}

trackPageView(window.location.pathname);

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

function showNotification(title, message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `<strong>${title}</strong><p>${message}</p>`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ff6b6b' : type === 'success' ? '#51cf66' : '#0066ff'};
        color: white;
        padding: 20px;
        border-radius: 8px;
        z-index: 10000;
        max-width: 400px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

document.addEventListener('visibilitychange', () => {
    const state = document.hidden ? 'paused' : 'running';
    document.querySelectorAll('[class*="bounce"]').forEach((el) => {
        el.style.animationPlayState = state;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('[data-tooltip]');
    elements.forEach((el) => {
        el.title = el.getAttribute('data-tooltip');
    });

    saveAdminSettings({});
    updateAdminLinkVisibility();
});
