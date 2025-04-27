document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginPage = document.getElementById('loginPage');
    const offersPage = document.getElementById('offersPage');
    const paymentPage = document.getElementById('paymentPage');
    const successPage = document.getElementById('successPage');
    const errorPage = document.getElementById('errorPage');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const notification = document.getElementById('notification');
    const closeNotification = document.getElementById('closeNotification');
    
    const phoneNumberInput = document.getElementById('phoneNumber');
    const nextBtn = document.getElementById('nextBtn');
    const offerCards = document.querySelectorAll('.offer-card');
    const paymentAmount = document.getElementById('paymentAmount');
    const confirmBtn = document.getElementById('confirmBtn');
    const backToOffersBtn = document.getElementById('backToOffersBtn');
    const backToPaymentBtn = document.getElementById('backToPaymentBtn');
    const backToHomeBtn = document.getElementById('backToHomeBtn');
    const userNumber = document.getElementById('userNumber');
    
    // Deposit elements
    const depositBtn = document.getElementById('depositBtn');
    const depositModal = document.getElementById('depositModal');
    const closeDepositModal = document.getElementById('closeDepositModal');
    const closeDepositBtn = document.getElementById('closeDepositBtn');
    
    // Withdraw elements
    const withdrawBtn = document.getElementById('withdrawBtn');
    const withdrawModal = document.getElementById('withdrawModal');
    const closeWithdrawModal = document.getElementById('closeWithdrawModal');
    const withdrawNumber = document.getElementById('withdrawNumber');
    const withdrawAmount = document.getElementById('withdrawAmount');
    const submitWithdrawBtn = document.getElementById('submitWithdrawBtn');
    const retryWithdrawBtn = document.getElementById('retryWithdrawBtn');
    
    // Withdraw error elements
    const withdrawErrorModal = document.getElementById('withdrawErrorModal');
    const closeWithdrawErrorModal = document.getElementById('closeWithdrawErrorModal');
    const closeWithdrawErrorBtn = document.getElementById('closeWithdrawErrorBtn');
    
    // History elements
    const historyBtn = document.getElementById('historyBtn');
    const historyModal = document.getElementById('historyModal');
    const closeHistoryModal = document.getElementById('closeHistoryModal');
    const closeHistoryBtn = document.getElementById('closeHistoryBtn');
    
    // Format phone number input
    phoneNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = value.match(/.{1,4}/g).join('-');
        }
        e.target.value = value;
    });
    
    // Next button click handler
    nextBtn.addEventListener('click', function() {
        const phoneNumber = phoneNumberInput.value.replace(/\D/g, '');
        
        if (phoneNumber.length < 10) {
            showNotification('Nomor DANA tidak valid', false);
            phoneNumberInput.focus();
            return;
        }
        
        // Show loading
        loginPage.style.display = 'none';
        loadingIndicator.style.display = 'block';
        
        // Simulate API call
        setTimeout(function() {
            loadingIndicator.style.display = 'none';
            loginPage.style.display = 'none';
            offersPage.style.display = 'block';
            
            // Update user info
            userNumber.textContent = phoneNumberInput.value;
            withdrawNumber.value = phoneNumberInput.value;
            
            // Animate offer cards
            const cards = document.querySelectorAll('.offer-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.animationDelay = `${index * 0.1}s`;
                    card.classList.add('active');
                }, 100);
            });
            
            showNotification('Nomor DANA berhasil diverifikasi');
        }, 2000);
    });
    
    // Offer card click handler
    offerCards.forEach(card => {
        card.addEventListener('click', function() {
            const amount = parseInt(card.getAttribute('data-amount'));
            const profit = parseInt(card.getAttribute('data-profit'));
            
            // Format amount with thousand separator
            paymentAmount.textContent = `Rp${amount.toLocaleString('id-ID')}`;
            
            // Switch to payment page with animation
            offersPage.style.opacity = 0;
            offersPage.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                offersPage.style.display = 'none';
                paymentPage.style.display = 'block';
                paymentPage.style.opacity = 0;
                paymentPage.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    paymentPage.style.opacity = 1;
                    paymentPage.style.transform = 'translateX(0)';
                }, 50);
            }, 300);
        });
    });
    
    // Confirm payment button
    confirmBtn.addEventListener('click', function() {
        paymentPage.style.opacity = 0;
        paymentPage.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            paymentPage.style.display = 'none';
            errorPage.style.display = 'block';
            errorPage.style.opacity = 0;
            errorPage.style.transform = 'translateX(20px)';
            setTimeout(() => {
                errorPage.style.opacity = 1;
                errorPage.style.transform = 'translateX(0)';
            }, 50);
        }, 300);
    });
    
    // Back to offers button
    backToOffersBtn.addEventListener('click', function() {
        paymentPage.style.opacity = 0;
        paymentPage.style.transform = 'translateX(20px)';
        setTimeout(() => {
            paymentPage.style.display = 'none';
            offersPage.style.display = 'block';
            offersPage.style.opacity = 0;
            offersPage.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                offersPage.style.opacity = 1;
                offersPage.style.transform = 'translateX(0)';
            }, 50);
        }, 300);
    });
    
    // Back to payment button
    backToPaymentBtn.addEventListener('click', function() {
        errorPage.style.opacity = 0;
        errorPage.style.transform = 'translateX(20px)';
        setTimeout(() => {
            errorPage.style.display = 'none';
            paymentPage.style.display = 'block';
            paymentPage.style.opacity = 0;
            paymentPage.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                paymentPage.style.opacity = 1;
                paymentPage.style.transform = 'translateX(0)';
            }, 50);
        }, 300);
    });
    
    // Back to home button
    backToHomeBtn.addEventListener('click', function() {
        successPage.style.display = 'none';
        loginPage.style.display = 'block';
        phoneNumberInput.value = '';
        loginPage.style.opacity = 0;
        loginPage.style.transform = 'translateY(20px)';
        setTimeout(() => {
            loginPage.style.opacity = 1;
            loginPage.style.transform = 'translateY(0)';
        }, 50);
    });
    
    // Deposit button
    depositBtn.addEventListener('click', function() {
        depositModal.style.display = 'flex';
    });
    
    // Close deposit modal
    closeDepositModal.addEventListener('click', function() {
        depositModal.style.display = 'none';
    });
    
    closeDepositBtn.addEventListener('click', function() {
        depositModal.style.display = 'none';
    });
    
    // Withdraw button
    withdrawBtn.addEventListener('click', function() {
        withdrawModal.style.display = 'flex';
    });
    
    // Close withdraw modal
    closeWithdrawModal.addEventListener('click', function() {
        withdrawModal.style.display = 'none';
    });
    
    // Submit withdraw button
    submitWithdrawBtn.addEventListener('click', function() {
        const amount = withdrawAmount.value.replace(/\D/g, '');
        
        if (!amount || parseInt(amount) < 150000) {
            showNotification('Minimal penarikan Rp150.000', false);
            withdrawAmount.focus();
            return;
        }
        
        withdrawModal.style.display = 'none';
        withdrawErrorModal.style.display = 'flex';
    });
    
    // Retry withdraw button
    retryWithdrawBtn.addEventListener('click', function() {
        withdrawErrorModal.style.display = 'none';
        withdrawModal.style.display = 'flex';
    });
    
    // Close withdraw error modal
    closeWithdrawErrorModal.addEventListener('click', function() {
        withdrawErrorModal.style.display = 'none';
    });
    
    closeWithdrawErrorBtn.addEventListener('click', function() {
        withdrawErrorModal.style.display = 'none';
    });
    
    // History button
    historyBtn.addEventListener('click', function() {
        historyModal.style.display = 'flex';
    });
    
    // Close history modal
    closeHistoryModal.addEventListener('click', function() {
        historyModal.style.display = 'none';
    });
    
    closeHistoryBtn.addEventListener('click', function() {
        historyModal.style.display = 'none';
    });
    
    // Close notification
    closeNotification.addEventListener('click', function() {
        notification.classList.remove('show');
    });
    
    // Show notification function
    function showNotification(message, isSuccess = true) {
        const notificationTitle = isSuccess ? 'Sukses' : 'Error';
        const icon = isSuccess ? 'fa-check-circle' : 'fa-exclamation-circle';
        
        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <div class="notification-content">
                <div class="notification-title">${notificationTitle}</div>
                <div class="notification-message">${message}</div>
            </div>
            <div class="close-notification">&times;</div>
        `;
        
        notification.className = `notification ${isSuccess ? '' : 'error'}`;
        notification.classList.add('show');
        
        // Update close button event
        notification.querySelector('.close-notification').addEventListener('click', function() {
            notification.classList.remove('show');
        });
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
    
    // Initialize animations
    setTimeout(() => {
        loginPage.classList.add('active');
    }, 100);
    
    // Handle click outside modal
    window.onclick = function(event) {
        if (event.target.className === 'modal') {
            event.target.style.display = 'none';
        }
    }
});