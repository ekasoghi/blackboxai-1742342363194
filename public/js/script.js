// DOM Elements
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const userMenuBtn = document.getElementById('userMenuBtn');
const notificationBtn = document.getElementById('notificationBtn');

// State Management
let isAuthenticated = false;
let userData = null;

// Show login modal on page load if not authenticated
document.addEventListener('DOMContentLoaded', () => {
    if (!isAuthenticated) {
        showLoginModal();
    }
    loadDashboardData();
});

// Login Modal Functions
function showLoginModal() {
    loginModal.classList.remove('hidden');
}

function hideLoginModal() {
    loginModal.classList.add('hidden');
}

// Login Form Handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            isAuthenticated = true;
            userData = data.data.user;
            localStorage.setItem('token', data.data.token);
            hideLoginModal();
            loadDashboardData();
        } else {
            alert('Login failed: ' + data.message);
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    }
});

// Dashboard Data Loading
async function loadDashboardData() {
    try {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Load Summary Data
        const summaryResponse = await fetch('/api/erp/dashboard', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const summaryData = await summaryResponse.json();

        if (summaryData.success) {
            updateDashboardSummary(summaryData.data.summary);
            updateRecentOrders(summaryData.data.recentOrders);
            updateAlerts(summaryData.data.alerts);
        }
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

// Update Dashboard UI
function updateDashboardSummary(summary) {
    document.getElementById('totalRevenue').textContent = summary.totalRevenue;
    document.getElementById('totalOrders').textContent = summary.totalOrders;
    document.getElementById('activeUsers').textContent = summary.activeUsers;
}

function updateRecentOrders(orders) {
    const tableBody = document.getElementById('recentOrdersTable');
    tableBody.innerHTML = '';

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-200';
        row.innerHTML = `
            <td class="py-4">${order.id}</td>
            <td class="py-4">${order.customer}</td>
            <td class="py-4">${order.amount}</td>
            <td class="py-4">
                <span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function updateAlerts(alerts) {
    const alertsContainer = document.getElementById('alertsContainer');
    alertsContainer.innerHTML = '';

    alerts.forEach(alert => {
        const alertElement = document.createElement('div');
        alertElement.className = `alert alert-${alert.type.toLowerCase()} fade-in`;
        alertElement.innerHTML = `
            <i class="fas fa-${getAlertIcon(alert.type)}"></i>
            <span>${alert.message}</span>
        `;
        alertsContainer.appendChild(alertElement);
    });
}

function getAlertIcon(type) {
    switch (type.toLowerCase()) {
        case 'warning':
            return 'exclamation-triangle';
        case 'info':
            return 'info-circle';
        case 'success':
            return 'check-circle';
        default:
            return 'bell';
    }
}

// Navigation Handling
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', async (e) => {
        e.preventDefault();
        const module = e.target.textContent.trim().toLowerCase();
        
        try {
            const response = await fetch(`/api/erp/${module}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            
            if (data.success) {
                // Update UI based on the module
                updateModuleContent(module, data.data);
            }
        } catch (error) {
            console.error(`Error loading ${module} data:`, error);
        }
    });
});

// Module Content Updates
function updateModuleContent(module, data) {
    // Update page title
    document.querySelector('header h2').textContent = 
        module.charAt(0).toUpperCase() + module.slice(1);

    // Clear main content area
    const mainContent = document.querySelector('main > div.grid');
    mainContent.innerHTML = '';

    // Add module-specific content
    switch (module) {
        case 'inventory':
            renderInventoryModule(data);
            break;
        case 'orders':
            renderOrdersModule(data);
            break;
        case 'hr':
            renderHRModule(data);
            break;
        case 'analytics':
            renderAnalyticsModule(data);
            break;
        case 'reports':
            renderReportsModule(data);
            break;
        default:
            renderDashboard(data);
    }
}

// Responsive Menu Toggle
const menuToggle = document.createElement('button');
menuToggle.className = 'md:hidden p-4';
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('header').prepend(menuToggle);

menuToggle.addEventListener('click', () => {
    const sidebar = document.querySelector('aside');
    sidebar.classList.toggle('active');
});

// Initialize tooltips and other UI elements
function initializeUI() {
    // Add tooltip functionality
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', showTooltip);
        tooltip.addEventListener('mouseleave', hideTooltip);
    });

    // Add dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', toggleDropdown);
    });
}

// Error Handling
function showError(message) {
    const errorAlert = document.createElement('div');
    errorAlert.className = 'alert alert-error fade-in';
    errorAlert.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(errorAlert);

    setTimeout(() => {
        errorAlert.remove();
    }, 5000);
}

// Initialize the application
initializeUI();
