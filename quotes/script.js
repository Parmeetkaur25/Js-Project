 const quotes = [
            { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "success" },
            { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "life" },
            { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "motivation" },
            { text: "It is never too late to be what you might have been.", author: "George Eliot", category: "motivation" },
            { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "success" },
            { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "motivation" },
            { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", category: "motivation" },
            { text: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost", category: "life" },
            { text: "The purpose of our lives is to be happy.", author: "Dalai Lama", category: "wisdom" },
            { text: "You only live once, but if you do it right, once is enough.", author: "Mae West", category: "life" },
            { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "success" },
            { text: "Don't let yesterday take up too much of today.", author: "Will Rogers", category: "wisdom" },
            { text: "You learn more from failure than from success. Don't let it stop you.", author: "Unknown", category: "motivation" },
            { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi", category: "motivation" },
            { text: "If you are working on something that you really care about, you don't have to be pushed.", author: "Steve Jobs", category: "success" },
            { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", category: "wisdom" },
            { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs", category: "life" },
            { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford", category: "motivation" },
            { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson", category: "wisdom" },
            { text: "Go confidently in the direction of your dreams! Live the life you've imagined.", author: "Henry David Thoreau", category: "motivation" },
            { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair", category: "motivation" },
            { text: "Success is not how high you have climbed, but how you make a positive difference to the world.", author: "Roy T. Bennett", category: "success" },
            { text: "What we think, we become.", author: "Buddha", category: "wisdom" },
            { text: "The mind is everything. What you think you become.", author: "Buddha", category: "wisdom" },
            { text: "The best revenge is massive success.", author: "Frank Sinatra", category: "success" },
            { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt", category: "wisdom" },
            { text: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll", category: "life" },
            { text: "Change your thoughts and you change your world.", author: "Norman Vincent Peale", category: "wisdom" },
            { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt", category: "motivation" },
            { text: "Act as if what you do makes a difference. It does.", author: "William James", category: "wisdom" },
            { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau", category: "success" },
            { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller", category: "success" },
            { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson", category: "success" },
            { text: "The road to success and the road to failure are almost exactly the same.", author: "Colin R. Davis", category: "success" },
            { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", category: "motivation" },
            { text: "The secret of success is to do the common thing uncommonly well.", author: "John D. Rockefeller Jr.", category: "success" },
            { text: "I never dreamed about success, I worked for it.", author: "Estée Lauder", category: "success" },
            { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill", category: "success" },
            { text: "The only way to achieve the impossible is to believe it is possible.", author: "Charles Kingsleigh", category: "motivation" },
            { text: "Opportunities don't happen. You create them.", author: "Chris Grosser", category: "success" },
            { text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", author: "Roy T. Bennett", category: "motivation" },
            { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown", category: "motivation" },
            { text: "Dream bigger. Do bigger.", author: "Unknown", category: "motivation" },
            { text: "Don't stop when you're tired. Stop when you're done.", author: "Unknown", category: "motivation" },
            { text: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown", category: "motivation" },
            { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery", category: "wisdom" },
            { text: "Little things make big days.", author: "Unknown", category: "life" },
            { text: "It's going to be hard, but hard does not mean impossible.", author: "Unknown", category: "motivation" },
            { text: "Great things never come from comfort zones.", author: "Unknown", category: "motivation" },
            { text: "Dream it. Wish it. Do it.", author: "Unknown", category: "motivation" }
        ];

        let currentQuote = null;
        let quotesGenerated = 0;
        let selectedCategory = 'all';
        let lastIndex = -1;

        const quoteDisplay = document.getElementById('quoteDisplay');
        const generateBtn = document.getElementById('generateBtn');
        const copyBtn = document.getElementById('copyBtn');
        const shareBtn = document.getElementById('shareBtn');
        const categoryTags = document.querySelectorAll('.category-tag');
        const tooltip = document.getElementById('tooltip');

        function getFilteredQuotes() {
            if (selectedCategory === 'all') {
                return quotes;
            }
            return quotes.filter(q => q.category === selectedCategory);
        }

        function generateQuote() {
            const filteredQuotes = getFilteredQuotes();
            
            if (filteredQuotes.length === 0) {
                quoteDisplay.innerHTML = '<div class="placeholder">No quotes in this category! 😔</div>';
                return;
            }

            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * filteredQuotes.length);
            } while (randomIndex === lastIndex && filteredQuotes.length > 1);
            
            lastIndex = randomIndex;
            currentQuote = filteredQuotes[randomIndex];

            quoteDisplay.innerHTML = `
                <div class="quote-text">"${currentQuote.text}"</div>
                <div class="quote-author">${currentQuote.author}</div>
            `;

            quotesGenerated++;
            document.getElementById('quotesGenerated').textContent = quotesGenerated;

            copyBtn.innerHTML = '<span>📋</span><span>Copy</span>';
            copyBtn.classList.remove('copied');
        }

        function copyQuote() {
            if (!currentQuote) {
                showTooltip('Generate a quote first!', copyBtn);
                return;
            }

            const quoteText = `"${currentQuote.text}" — ${currentQuote.author}`;
            navigator.clipboard.writeText(quoteText).then(() => {
                copyBtn.innerHTML = '<span>✓</span><span>Copied!</span>';
                copyBtn.classList.add('copied');
                showTooltip('Copied to clipboard!', copyBtn);
                
                setTimeout(() => {
                    copyBtn.innerHTML = '<span>📋</span><span>Copy</span>';
                    copyBtn.classList.remove('copied');
                }, 2000);
            }).catch(() => {
                showTooltip('Failed to copy', copyBtn);
            });
        }

        function shareQuote() {
            if (!currentQuote) {
                showTooltip('Generate a quote first!', shareBtn);
                return;
            }

            const quoteText = `"${currentQuote.text}" — ${currentQuote.author}`;
            
            if (navigator.share) {
                navigator.share({
                    title: 'Inspiring Quote',
                    text: quoteText
                }).catch(() => {});
            } else {
                copyQuote();
                showTooltip('Quote copied! Share it anywhere!', shareBtn);
            }
        }

        function showTooltip(message, element) {
            const rect = element.getBoundingClientRect();
            tooltip.textContent = message;
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.top - 45 + 'px';
            tooltip.classList.add('show');

            setTimeout(() => {
                tooltip.classList.remove('show');
            }, 2000);
        }

        categoryTags.forEach(tag => {
            tag.addEventListener('click', function() {
                categoryTags.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                selectedCategory = this.dataset.category;
                lastIndex = -1;
                
                const filteredCount = selectedCategory === 'all' ? quotes.length : quotes.filter(q => q.category === selectedCategory).length;
                document.getElementById('totalQuotes').textContent = filteredCount;
            });
        });

        generateBtn.addEventListener('click', generateQuote);
        copyBtn.addEventListener('click', copyQuote);
        shareBtn.addEventListener('click', shareQuote);

        document.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                generateQuote();
            }
        });

        document.getElementById('totalQuotes').textContent = quotes.length;