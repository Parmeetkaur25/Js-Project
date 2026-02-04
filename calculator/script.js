 let selectedTip = null;

        const billInput = document.getElementById('billAmount');
        const customTipInput = document.getElementById('customTip');
        const numPeopleInput = document.getElementById('numPeople');
        const tipButtons = document.querySelectorAll('.tip-btn');
        const customTipWrapper = document.getElementById('customTipWrapper');
        const calculateBtn = document.getElementById('calculateBtn');
        const resultsDiv = document.getElementById('results');
        const resetBtn = document.getElementById('resetBtn');

        tipButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                tipButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const tipValue = this.dataset.tip;
                
                if (tipValue === 'custom') {
                    customTipWrapper.style.display = 'block';
                    selectedTip = null;
                    customTipInput.focus();
                } else {
                    customTipWrapper.style.display = 'none';
                    selectedTip = parseFloat(tipValue);
                }
                
                hideError('tipError');
            });
        });

        customTipInput.addEventListener('input', function() {
            selectedTip = parseFloat(this.value) || null;
            hideError('tipError');
        });

        billInput.addEventListener('input', () => hideError('billError'));
        numPeopleInput.addEventListener('input', () => hideError('peopleError'));

        calculateBtn.addEventListener('click', calculateTip);

        billInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') calculateTip();
        });

        numPeopleInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') calculateTip();
        });

        customTipInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') calculateTip();
        });

        resetBtn.addEventListener('click', resetCalculator);

        function calculateTip() {
            let hasError = false;

            const billAmount = parseFloat(billInput.value);
            const numPeople = parseInt(numPeopleInput.value);

            if (!billAmount || billAmount <= 0) {
                showError('billError', billInput);
                hasError = true;
            }

            if (!selectedTip || selectedTip < 0) {
                showError('tipError');
                hasError = true;
            }

            if (!numPeople || numPeople < 1) {
                showError('peopleError', numPeopleInput);
                hasError = true;
            }

            if (hasError) return;

            const tipAmount = billAmount * (selectedTip / 100);
            const totalAmount = billAmount + tipAmount;
            const tipPerPerson = tipAmount / numPeople;
            const totalPerPerson = totalAmount / numPeople;

            document.getElementById('tipAmount').textContent = '₹' + tipAmount.toFixed(2);
            document.getElementById('totalAmount').textContent = '₹' + totalAmount.toFixed(2);
            document.getElementById('tipPerPerson').textContent = '₹' + tipPerPerson.toFixed(2);
            document.getElementById('totalPerPerson').textContent = '₹' + totalPerPerson.toFixed(2);

            const breakdownText = `
                Original Bill: ₹${billAmount.toFixed(2)}<br>
                Tip (${selectedTip}%): ₹${tipAmount.toFixed(2)}<br>
                Total: ₹${totalAmount.toFixed(2)}<br>
                ${numPeople > 1 ? `Split ${numPeople} ways` : 'No split needed'}
            `;
            document.getElementById('breakdownText').innerHTML = breakdownText;

            resultsDiv.classList.add('show');
            resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        function showError(errorId, inputElement = null) {
            const errorElement = document.getElementById(errorId);
            errorElement.classList.add('show');
            if (inputElement) {
                inputElement.classList.add('error');
            }
        }

        function hideError(errorId) {
            const errorElement = document.getElementById(errorId);
            errorElement.classList.remove('show');
            
            if (errorId === 'billError') billInput.classList.remove('error');
            if (errorId === 'peopleError') numPeopleInput.classList.remove('error');
        }

        function resetCalculator() {
            billInput.value = '';
            customTipInput.value = '';
            numPeopleInput.value = '1';
            selectedTip = null;
            
            tipButtons.forEach(btn => btn.classList.remove('active'));
            customTipWrapper.style.display = 'none';
            resultsDiv.classList.remove('show');
            
            billInput.classList.remove('error');
            numPeopleInput.classList.remove('error');
            document.querySelectorAll('.error-message').forEach(msg => msg.classList.remove('show'));
            
            billInput.focus();
        }