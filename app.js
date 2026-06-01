// Web3 Portfolio Command Center Logic

document.addEventListener('DOMContentLoaded', () => {
    // STATE VARIABLES
    let isConnected = false;
    let exp = 0;
    let level = 1;
    let completedSteps = [1]; // Start with step 1 completed

    // DOM ELEMENTS
    const walletBtn = document.getElementById('walletBtn');
    const walletText = document.getElementById('walletText');
    const expVal = document.getElementById('expVal');
    const expBar = document.getElementById('expBar');
    
    // 1. WALLET CONNECTION SIMULATOR
    walletBtn.addEventListener('click', () => {
        if (!isConnected) {
            isConnected = true;
            walletText.textContent = '0x71C9...3e9B';
            walletBtn.classList.remove('btn-primary');
            walletBtn.classList.add('btn-secondary');
            addExp(10);
            showNotify('wallet', 'Connected to Mock Ethereum Mainnet. Received +10 EXP!', 'success');
        } else {
            isConnected = false;
            walletText.textContent = 'Connect Wallet';
            walletBtn.classList.remove('btn-secondary');
            walletBtn.classList.add('btn-primary');
            showNotify('wallet', 'Disconnected wallet.', 'success');
        }
    });

    // Helper to send notifications
    function showNotify(type, text, statusClass) {
        // Find existing status or output somewhere
        console.log(`[Web3 Notification] ${type}: ${text}`);
    }

    // 2. ROADMAP PROGRESSIVE EXP ACCUMULATOR
    function addExp(amount) {
        exp += amount;
        if (exp >= 100) {
            level += 1;
            exp = exp % 100;
            alert(`🎉 Level Up! You are now Level ${level} Web3 Developer! Keep going!`);
        }
        expVal.textContent = `${exp} / 100`;
        expBar.style.width = `${exp}%`;
    }

    const startStepBtns = document.querySelectorAll('.start-step-btn');
    startStepBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const stepNum = parseInt(e.target.getAttribute('data-step'));
            if (stepNum === 1) {
                addExp(20);
                e.target.textContent = 'Module Reviewed ✓';
                e.target.disabled = true;
            } else if (stepNum === 2) {
                addExp(30);
                document.querySelector('[data-step="2"]').classList.add('completed');
                e.target.textContent = 'Module Unlocked ✓';
                e.target.disabled = true;
            } else if (stepNum === 3) {
                addExp(50);
                document.querySelector('[data-step="3"]').classList.add('completed');
                e.target.textContent = 'Audits Unlocked ✓';
                e.target.disabled = true;
            }
        });
    });

    // 3. GAS & ETH PRICE AUTO-FLUCUATION
    const gasVal = document.getElementById('gasVal');
    const gasLow = document.getElementById('gasLow');
    const gasFast = document.getElementById('gasFast');
    
    setInterval(() => {
        const baseGas = Math.floor(Math.random() * 15) + 15; // 15-30
        gasVal.childNodes[0].nodeValue = `${baseGas} `;
        gasLow.textContent = Math.floor(baseGas * 0.9);
        gasFast.textContent = Math.floor(baseGas * 1.3);
    }, 4000);

    // 4. NFT MINTER SIMULATION
    const mintNftBtn = document.getElementById('mintNftBtn');
    const nftNameInput = document.getElementById('nftName');
    const nftArt = document.getElementById('nftArt');
    const mintStatus = document.getElementById('mintStatus');

    mintNftBtn.addEventListener('click', () => {
        const name = nftNameInput.value.trim() || 'Nexus Cyber #001';
        
        mintStatus.className = 'status-msg status-loading';
        mintStatus.textContent = '🔄 Generating cryptographic asset hash & broadcasting transaction...';
        
        // Dynamic Art Update
        nftArt.style.background = `linear-gradient(${Math.random() * 360}deg, #9d4edd, #00f2fe)`;
        nftArt.innerHTML = `<span style="font-size: 1.1rem; color: #000; font-weight: bold; text-shadow: 0 0 10px rgba(255,255,255,0.7);">${name}</span>`;

        setTimeout(() => {
            mintStatus.className = 'status-msg status-success';
            const randomTx = '0x' + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('');
            mintStatus.innerHTML = `
                <strong>🚀 Transaction Success!</strong><br>
                Asset: "${name}" successfully minted to block.<br>
                <span style="font-size:0.75rem; word-break: break-all; color: var(--primary);">Tx: ${randomTx}</span>
            `;
            addExp(25);
        }, 2200);
    });

    // 5. LIQUIDITY TOKEN SWAP CALCULATOR & SIMULATION
    const swapPayAmt = document.getElementById('swapPayAmt');
    const swapReceiveAmt = document.getElementById('swapReceiveAmt');
    const swapPayToken = document.getElementById('swapPayToken');
    const swapReceiveToken = document.getElementById('swapReceiveToken');
    const swapBtn = document.getElementById('swapBtn');
    const swapStatus = document.getElementById('swapStatus');
    const ethToUsdcRate = 3421.80;

    function recalculateSwap() {
        const amount = parseFloat(swapPayAmt.value) || 0;
        const pay = swapPayToken.value;
        const rec = swapReceiveToken.value;

        if (pay === rec) {
            swapReceiveAmt.value = amount.toFixed(2);
        } else if (pay === 'ETH' && rec === 'USDC') {
            swapReceiveAmt.value = (amount * ethToUsdcRate).toFixed(2);
        } else if (pay === 'USDC' && rec === 'ETH') {
            swapReceiveAmt.value = (amount / ethToUsdcRate).toFixed(6);
        }
    }

    swapPayAmt.addEventListener('input', recalculateSwap);
    swapPayToken.addEventListener('change', recalculateSwap);
    swapReceiveToken.addEventListener('change', recalculateSwap);

    swapBtn.addEventListener('click', () => {
        swapStatus.className = 'status-msg status-loading';
        swapStatus.textContent = '🔄 Fetching liquidity pools & routing trade pathways...';

        setTimeout(() => {
            swapStatus.className = 'status-msg status-success';
            swapStatus.textContent = `✓ Successfully swapped ${swapPayAmt.value} ${swapPayToken.value} for ${swapReceiveAmt.value} ${swapReceiveToken.value}!`;
            addExp(15);
        }, 1500);
    });

    // 6. FREELANCE & STARTUP IDEA GENERATOR
    const ideas = [
        {
            title: "Decentralized Crowdfunding Platform for Web3 Indie Builders",
            desc: "A platform allowing users to pool funds for software features. If features are delivered, smart contract releases funds.",
            stack: "HTML5/Vanilla CSS, ethers.js integration, Solidity on Arbitrum/Optimism.",
            revenue: "Take 1.5% platform fee on all successful fundings."
        },
        {
            title: "Web3 NFT Gatekeeper for Digital Content Portals",
            desc: "A simple microservice or SaaS plugin that websites can integrate to lock premium blogs, videos, or files behind specific NFT ownership.",
            stack: "Vanilla JS SDK, ERC-721/1155 smart contracts, Netlify/Vercel hosting.",
            revenue: "Subscription pricing for content creators, plus tiny royalty cuts on gated NFT secondary transactions."
        },
        {
            title: "Automated Smart Contract Gas & Security Audit Checker",
            desc: "A clean landing page where users upload a Solidity contract and it runs static analysis checks (like Slither) to identify gas leaks or security flaws.",
            stack: "Python Backend (Slither Wrapper API), beautiful glass frontend built with vanilla HTML/CSS.",
            revenue: "Free basic report. Custom detailed human-review audits starting at $499 per contract."
        },
        {
            title: "Local Loyalty Points Tokenization System",
            desc: "Help local coffee shops or businesses replace paper stamp cards with digital token points that customers can hold, trade, or redeem using simple Web3 QR codes.",
            stack: "ERC-20 standard smart contract, simple mobile-first Web3 dashboard.",
            revenue: "Custom deployment fee ($1,500 setup) + monthly maintenance SaaS retainer."
        }
    ];

    const genIdeaBtn = document.getElementById('genIdeaBtn');
    const ideaOutput = document.getElementById('ideaOutput');

    genIdeaBtn.addEventListener('click', () => {
        const idx = Math.floor(Math.random() * ideas.length);
        const selected = ideas[idx];
        
        ideaOutput.innerHTML = `
            <div style="text-align: left; width: 100%;">
                <h4 style="color: var(--primary); font-family: var(--font-mono); margin-bottom: 8px;">💡 ${selected.title}</h4>
                <p style="font-size: 0.95rem; margin-bottom: 12px; color: var(--text-primary);">${selected.desc}</p>
                <div style="font-size: 0.85rem; color: var(--text-secondary);">
                    <strong>🔧 Recommended Stack:</strong> ${selected.stack}<br>
                    <strong>💰 Revenue Model:</strong> ${selected.revenue}
                </div>
            </div>
        `;
        addExp(10);
    });

    // 7. COPY TO CLIPBOARD INTERACTION
    const copyAddressBtn = document.getElementById('copyAddressBtn');
    const donationAddressText = document.getElementById('donationAddress').textContent;

    copyAddressBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(donationAddressText).then(() => {
            copyAddressBtn.textContent = 'Copied! ✓';
            copyAddressBtn.style.background = 'var(--yellow)';
            setTimeout(() => {
                copyAddressBtn.textContent = 'Copy Address';
                copyAddressBtn.style.background = 'var(--primary)';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
});
