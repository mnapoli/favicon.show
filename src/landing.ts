export const landingPageHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>favicon.show - Universal Favicon Discovery Service | Get Any Website's Favicon</title>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="Universal favicon discovery service. Get any website's favicon with a simple URL. Fast, reliable, and includes smart fallbacks with letter tiles. Perfect for developers.">
    <meta name="keywords" content="favicon, icon, website icon, favicon service, favicon API, letter tiles, web development, favicon discovery, website favicon, favicon generator">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://favicon.show/">
    <meta property="og:title" content="favicon.show - Universal Favicon Discovery Service">
    <meta property="og:description" content="Get any website's favicon with a simple URL. Fast, reliable, with smart fallbacks. Perfect for developers building web applications.">
    <meta property="og:image" content="https://favicon.show/letter/F?color=074006">
    <meta property="og:image:width" content="128">
    <meta property="og:image:height" content="128">
    <meta property="og:image:alt" content="favicon.show logo - letter F in green">
    <meta property="og:site_name" content="favicon.show">
    <meta property="og:locale" content="en_US">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:url" content="https://favicon.show/">
    <meta name="twitter:title" content="favicon.show - Universal Favicon Discovery Service">
    <meta name="twitter:description" content="Get any website's favicon with a simple URL. Fast, reliable, with smart fallbacks.">
    <meta name="twitter:image" content="https://favicon.show/letter/F?color=074006">
    <meta name="twitter:image:alt" content="favicon.show service logo">
    <meta name="twitter:creator" content="@matthieunapoli">
    
    <!-- Favicon and App Icons -->
    <link rel="icon" type="image/svg+xml" href="https://favicon.show/letter/F?color=074006">
    <link rel="apple-touch-icon" href="https://favicon.show/letter/F?color=074006">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://favicon.show/">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Workbench:wght@400;600;700&family=VT323&display=swap');
        
        .terminal-font {
            font-family: 'Workbench', 'Courier New', monospace;
        }
        
        .vt323-font {
            font-family: 'VT323', 'Courier New', monospace;
            font-size: 1.1em;
            letter-spacing: 0.05em;
        }
        
        .terminal-cursor::after {
            content: '█';
            animation: blink 1s infinite;
            color: #00ff00;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        .terminal-border {
            box-shadow: 
                inset 0 0 20px rgba(0, 255, 0, 0.1),
                0 0 20px rgba(0, 255, 0, 0.05);
        }
        
        .crt-screen {
            position: relative;
            transform: perspective(1000px) rotateX(0deg);
            border-radius: 20px;
            overflow: hidden;
        }
        
        .crt-screen::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.7) 100%),
                linear-gradient(
                    90deg,
                    transparent 72%,
                    rgba(255,0,0,0.15) 74%,
                    rgba(0,255,0,0.15) 76%,
                    rgba(0,0,255,0.15) 78%,
                    transparent 80%
                );
            background-size: 100% 100%, 3px 3px;
            pointer-events: none;
            z-index: 1000;
        }
        
        .crt-screen::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 1px,
                    rgba(0,255,0,0.08) 1px,
                    rgba(0,255,0,0.08) 3px
                );
            pointer-events: none;
            z-index: 999;
        }
        
        .crt-flicker {
            animation: flicker 0.1s infinite linear alternate;
        }
        
        @keyframes flicker {
            0% { opacity: 1; }
            94% { opacity: 1; }
            95% { opacity: 0.92; }
            96% { opacity: 0.98; }
            97% { opacity: 0.95; }
            98% { opacity: 0.89; }
            99% { opacity: 0.97; }
            100% { opacity: 1; }
        }
        
        .crt-distortion {
            filter: 
                contrast(1.3)
                brightness(1.15)
                drop-shadow(0 0 5px rgba(0,255,0,0.6))
                drop-shadow(2px 0 3px rgba(255,0,0,0.2))
                drop-shadow(-2px 0 3px rgba(0,0,255,0.2));
            transform: scaleX(0.995) scaleY(1.008);
        }
        
        .scanlines {
            background: 
                linear-gradient(
                    transparent 48%, 
                    rgba(0, 255, 0, 0.08) 50%,
                    transparent 52%
                );
            background-size: 100% 3px;
        }
        
        .terminal-input {
            background: transparent;
            border: none;
            outline: none;
            color: #00ff00;
            font-family: inherit;
            caret-color: transparent;
            box-shadow: none;
        }
        
        .terminal-input:focus {
            outline: none;
            border: none;
            box-shadow: none;
            ring: none;
        }
        
        .terminal-output {
            white-space: pre-wrap;
            margin: 0.5rem 0;
        }
        
        /* Hide scrollbars */
        .crt-distortion {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE and Edge */
        }
        
        .crt-distortion::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
        }
    </style>
</head>
<body class="bg-black text-green-400 terminal-font scanlines min-h-screen overflow-hidden tracking-wider">
    <div class="crt-screen terminal-border border border-green-500/30 bg-green-950/40 mx-2 my-2 md:mx-8 md:my-8 h-[calc(100vh-1rem)] md:h-[calc(100vh-4rem)] rounded-lg overflow-hidden flex flex-col">
        <!-- Terminal Header -->
        <div class="bg-green-900 bg-opacity-30 px-2 md:px-4 py-2 border-b border-green-400 flex items-center">
            <div class="flex-1 text-center text-xs md:text-sm">favicon.show - Terminal v1.0</div>
            <div class="text-xs opacity-60 hidden md:block">SYS/READY</div>
        </div>
        
        <!-- Terminal Content -->
        <div class="crt-distortion crt-flicker p-3 md:p-6 flex-1 overflow-y-auto">
            <!-- Boot sequence -->
            <div class="mb-8">
                <div class="text-xs opacity-60 mb-2">FAVICON SYSTEM ONLINE...</div>
                <div class="text-xs opacity-60 mb-2">INITIALIZING TERMINAL...</div>
                <div class="text-xs opacity-60 mb-4">READY FOR INPUT</div>
            </div>
            
            <!-- Title -->
            <div class="mb-6 md:mb-8">
                <div class="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-6">
                    <div class="hidden sm:block">▓▓▓</div>
                    <div class="pt-0 sm:pt-2 text-center sm:text-left">FAVICON.SHOW</div>
                    <div class="hidden sm:block">▓▓▓</div>
                </div>
                <div class="text-sm sm:text-base md:text-lg lg:text-xl opacity-80 text-center sm:text-left">
                    > Universal favicon discovery service
                </div>
            </div>
            
            <!-- Command prompt style -->
            <div class="space-y-4 mb-6 md:mb-8">
                <div class="text-xs md:text-sm opacity-60">
                    $ favicon --status
                </div>
                <div class="pl-2 md:pl-4 text-xs md:text-sm">
                    SERVICE: Favicon extraction and delivery<br>
                    STATUS: OPERATIONAL<br>
                    PLATFORM: Cloudflare Workers + KV<br>
                    FALLBACK ALPHABET: LOADED<br>
                </div>
            </div>
            
            <!-- Examples -->
            <div class="space-y-4 md:space-y-6">
                <div class="text-xs md:text-sm opacity-60">
                    $ favicon --examples
                </div>
                
                <div class="pl-2 md:pl-4 space-y-3 md:space-y-4">
                    <!-- Example -->
                    <div class="border border-green-600 bg-green-950 bg-opacity-20 p-3 md:p-4 rounded">
                        <div class="text-green-300 mb-2 text-xs md:text-sm">BASIC USAGE:</div>
                        <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4">
                            <img src="https://favicon.show/github.com" class="w-6 h-6 self-start sm:self-center">
                            <code class="vt323-font text-yellow-300 text-sm md:text-lg lg:text-xl break-all">&lt;img src="https://favicon.show/github.com"&gt;</code>
                        </div>
                    </div>
                    
                    <!-- Example -->
                    <div class="border border-green-600 bg-green-950 bg-opacity-20 p-3 md:p-4 rounded">
                        <div class="text-green-300 mb-2 text-xs md:text-sm">CUSTOM FALLBACK:</div>
                        <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4">
                            <img src="https://favicon.show/nonexistent-domain-12345.com?letter=X" class="w-6 h-6 self-start sm:self-center">
                            <code class="vt323-font text-yellow-300 text-sm md:text-lg lg:text-xl break-all">&lt;img src="https://favicon.show/example.com?letter=X"&gt;</code>
                        </div>
                    </div>
                    
                    <!-- Example -->
                    <div class="border border-green-600 bg-green-950 bg-opacity-20 p-3 md:p-4 rounded">
                        <div class="text-green-300 mb-2 text-xs md:text-sm">LETTER TILE:</div>
                        <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4">
                            <img src="https://favicon.show/letter/A" class="w-6 h-6 self-start sm:self-center">
                            <code class="vt323-font text-yellow-300 text-sm md:text-lg lg:text-xl break-all">&lt;img src="https://favicon.show/letter/A"&gt;</code>
                        </div>
                    </div>
                    
                    <!-- Example -->
                    <div class="border border-green-600 bg-green-950 bg-opacity-20 p-3 md:p-4 rounded">
                        <div class="text-green-300 mb-2 text-xs md:text-sm">CUSTOM COLOR:</div>
                        <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4">
                            <img src="https://favicon.show/letter/B?color=FF6B6B" class="w-6 h-6 self-start sm:self-center">
                            <code class="vt323-font text-yellow-300 text-sm md:text-lg lg:text-xl break-all">&lt;img src="https://favicon.show/letter/B?color=FF6B6B"&gt;</code>
                        </div>
                    </div>
                </div>
                
                <!-- Interactive Terminal -->
                <div class="mt-8 md:mt-12" id="terminal-area">
                    <div id="terminal-output"></div>
                    <div class="flex items-center space-x-2">
                        <span class="text-green-500">$</span>
                        <div class="flex-1 relative">
                            <span id="terminal-text" class="text-sm md:text-base invisible absolute left-0 top-0 whitespace-pre"></span>
                            <input 
                                type="text" 
                                id="terminal-input" 
                                class="terminal-input w-full text-sm md:text-base"
                                autocomplete="off"
                                spellcheck="false"
                                maxlength="100"
                            >
                            <span id="terminal-cursor" class="terminal-cursor absolute top-0" style="left: 0;"></span>
                        </div>
                    </div>
                </div>
                
                <!-- Author -->
                <div class="mt-6 pt-4 border-t border-green-600 border-opacity-20">
                    <div class="text-xs opacity-50 text-center">
                        Created by <a href="https://mnapoli.fr" target="_blank" rel="noopener" class="text-green-400 hover:text-green-300 underline">Matthieu Napoli</a>
                    </div>
                </div>
                
                <div class="h-10 md:h-12"></div>
            </div>
        </div>
    </div>
    
    <script>
        // Terminal functionality
        const terminalInput = document.getElementById('terminal-input');
        const terminalOutput = document.getElementById('terminal-output');
        const terminalText = document.getElementById('terminal-text');
        const terminalCursor = document.getElementById('terminal-cursor');
        
        // Update cursor position based on input text
        function updateCursorPosition() {
            const text = terminalInput.value;
            terminalText.textContent = text;
            const textWidth = terminalText.offsetWidth;
            terminalCursor.style.left = textWidth + 'px';
        }
        
        // Simulated file system
        let currentPath = '/home/favicon';
        
        const fileSystem = {
            '/': {
                type: 'dir',
                contents: ['bin', 'home', 'etc', 'var', 'tmp']
            },
            '/bin': {
                type: 'dir',
                contents: ['clear', 'date', 'hello', 'help', 'ls', 'pwd', 'whoami', 'ps', 'top', 'ping', 'hack', 'neofetch', 'coffee', 'tea', 'vim', 'emacs', 'nano', 'curl', 'cat', 'uptime']
            },
            '/home': {
                type: 'dir',
                contents: ['favicon']
            },
            '/home/favicon': {
                type: 'dir',
                contents: ['readme.md', 'status.txt', 'examples.html', '.bashrc', 'logs']
            },
            '/home/favicon/logs': {
                type: 'dir',
                contents: ['access.log', 'error.log', 'favicon.log']
            },
            '/etc': {
                type: 'dir',
                contents: ['hosts', 'config.conf', 'favicon.conf']
            },
            '/var': {
                type: 'dir',
                contents: ['cache', 'log']
            },
            '/var/cache': {
                type: 'dir',
                contents: ['favicons', 'metadata']
            },
            '/tmp': {
                type: 'dir',
                contents: ['favicon_temp_123.ico', 'upload_buffer.tmp']
            },
            // Files
            '/home/favicon/readme.md': {
                type: 'file',
                content: "# favicon.show\\n\\nUniversal favicon discovery service\\nCreated by Matthieu Napoli\\nhttps://mnapoli.fr\\n\\nCommands available in /bin:\\n- Use 'ls /bin' to see all available commands\\n- Try 'neofetch' for system info\\n- Type 'help' for basic commands"
            },
            '/home/favicon/status.txt': {
                type: 'file',
                content: "SERVICE: Favicon extraction and delivery\\nSTATUS: OPERATIONAL\\nPLATFORM: Cloudflare Workers + KV\\nUPTIME: 99.9%\\nCACHE HIT RATIO: 87.3%"
            },
            '/home/favicon/examples.html': {
                type: 'file',
                content: "<img src=\\"https://favicon.show/github.com\\">\\n<img src=\\"https://favicon.show/example.com?letter=X\\">\\n<img src=\\"https://favicon.show/letter/A\\">\\n<img src=\\"https://favicon.show/letter/B?color=FF6B6B\\">"
            },
            '/home/favicon/.bashrc': {
                type: 'file',
                content: "# Favicon terminal configuration\\nexport PS1='$ '\\nalias ll='ls -la'\\nalias la='ls -a'\\necho 'Welcome to favicon.show terminal!'"
            },
            '/etc/hosts': {
                type: 'file',
                content: "127.0.0.1 localhost\\n127.0.0.1 favicon.show\\n::1 localhost"
            },
            '/etc/config.conf': {
                type: 'file',
                content: "# Favicon service configuration\\nmax_cache_size=1GB\\ndefault_fallback=letter\\nworker_timeout=30s"
            },
            '/home/favicon/logs/access.log': {
                type: 'file',
                content: "2025-08-17 13:30:15 GET /github.com 200 0.023s\\n2025-08-17 13:30:16 GET /letter/A 200 0.015s\\n2025-08-17 13:30:17 GET /example.com?letter=X 200 0.031s"
            },
            '/home/favicon/logs/error.log': {
                type: 'file',
                content: "2025-08-17 12:15:30 WARN: Favicon not found for invalid-domain-xyz.com\\n2025-08-17 12:20:45 INFO: Falling back to letter tile for missing-favicon.test"
            }
        };
        
        function resolvePath(path) {
            if (path.startsWith('/')) {
                return path;
            }
            if (currentPath === '/') {
                return '/' + path;
            }
            return currentPath + '/' + path;
        }
        
        function getFileSystemEntry(path) {
            const resolved = resolvePath(path);
            return fileSystem[resolved];
        }
        
        function listDirectory(path) {
            const entry = getFileSystemEntry(path);
            if (!entry || entry.type !== 'dir') {
                return "ls: cannot access '" + path + "': No such file or directory";
            }
            return entry.contents.join('\\n');
        }
        
        function readFile(path) {
            const entry = getFileSystemEntry(path);
            if (!entry) {
                return "cat: " + path + ": No such file or directory";
            }
            if (entry.type === 'dir') {
                return "cat: " + path + ": Is a directory";
            }
            return entry.content;
        }
        
        function changeDirectory(path) {
            if (!path) {
                currentPath = '/home/favicon';
                return '';
            }
            
            let newPath;
            if (path === '..') {
                const parts = currentPath.split('/');
                if (parts.length > 2) {
                    parts.pop();
                    newPath = parts.join('/') || '/';
                } else {
                    newPath = '/';
                }
            } else if (path === '.') {
                return '';
            } else {
                newPath = resolvePath(path);
            }
            
            const entry = fileSystem[newPath];
            if (!entry || entry.type !== 'dir') {
                return "cd: " + path + ": No such file or directory";
            }
            
            currentPath = newPath;
            return '';
        }
        
        const commands = {
            'favicon --version': () => "favicon version 1.0.0\\nCopyright (c) 2025 Matthieu Napoli",
            
            'favicon --help': () => \`favicon - Universal favicon discovery service

USAGE:
    favicon [OPTIONS] <domain>

OPTIONS:
    --version    Show version information
    --help       Show this help message
    --status     Show service status
    --examples   Show usage examples

EXAMPLES:
    favicon github.com
    favicon example.com?letter=X
    favicon letter/X?color=FF6B6B

For more information, visit https://favicon.show\`,

            'favicon --status': () => \`SERVICE: Favicon extraction and delivery
STATUS: OPERATIONAL
PLATFORM: Cloudflare Workers + KV
FALLBACK ALPHABET: LOADED
UPTIME: 99.9%
CACHE HIT RATIO: 87.3%\`,

            'favicon --examples': () => \`BASIC USAGE:
<img src="https://favicon.show/github.com">

CUSTOM FALLBACK:
<img src="https://favicon.show/example.com?letter=X">

LETTER TILE:
<img src="https://favicon.show/letter/X">

CUSTOM COLOR:
<img src="https://favicon.show/letter/X?color=FF6B6B">\`,

            'help': () => "Available commands: favicon --help, favicon --version, favicon --status, clear, whoami, date, uptime, ls, cd, cat, pwd\\nTry 'ls /bin' to see all available commands!",
            
            'clear': () => {
                terminalOutput.innerHTML = '';
                return null; // Use null to indicate special handling
            },
            
            'whoami': () => "root",
            
            'date': () => new Date().toString(),
            
            'uptime': () => "favicon.show has been online for 42 days, 13:37",
            
            'ls': () => listDirectory(currentPath),
            
            'pwd': () => currentPath,
            
            'ps': () => "PID    COMMAND\\n1337   favicon-worker\\n1338   cache-manager\\n1339   dns-resolver",
            
            'top': () => "Tasks: 3 total, 3 running\\nCpu(s): 0.3%us, 0.1%sy\\nMem: 42MB used, 958MB free\\n\\nPID  USER  %CPU  %MEM  COMMAND\\n1337 root   0.2   4.2  favicon-worker\\n1338 root   0.1   2.1  cache-manager",
            
            'neofetch': () => \`                 favicon.show
                 ──────────────
OS               Cloudflare Workers
Kernel           V8 JavaScript Engine
Uptime           42 days, 13 hours, 37 mins
Shell            favicon-terminal v1.0
Resolution       Universal Favicon Discovery
Terminal         retro-crt
CPU              Edge Computing (Global)
Memory           42MB / 1GB
Storage          KV Namespace (Distributed)\`
        };
        
        function executeCommand(cmd) {
            const trimmed = cmd.trim();
            const parts = trimmed.split(' ');
            const command = parts[0].toLowerCase();
            const args = parts.slice(1);
            
            // Handle file system commands
            if (command === 'ls') {
                const path = args.length > 0 ? args[0] : currentPath;
                return listDirectory(path);
            }
            
            if (command === 'cd') {
                const path = args.length > 0 ? args[0] : null;
                return changeDirectory(path);
            }
            
            if (command === 'cat') {
                if (args.length === 0) {
                    return "cat: missing file operand";
                }
                return readFile(args[0]);
            }
            
            // Handle favicon commands with arguments
            const lowerCmd = trimmed.toLowerCase();
            if (lowerCmd.startsWith('favicon ') && !lowerCmd.includes('--')) {
                const domain = lowerCmd.substring(8).trim();
                if (domain) {
                    return \`Error: favicon command requires a flag (--help, --version, --status, --examples)\\nTry: favicon --help\`;
                }
            }
            
            // Check exact commands
            if (commands[lowerCmd]) {
                return commands[lowerCmd]();
            }
            
            // Handle partial matches
            if (lowerCmd === 'favicon') {
                return "Error: favicon command requires arguments\\nTry: favicon --help";
            }
            
            // Easter egg responses
            const easterEggs = {
                'hello': 'Hello! Welcome to favicon.show terminal!',
                'hi': 'Hi there! Type "help" for available commands.',
                'exit': 'Cannot exit the matrix... I mean, terminal.',
                'sudo': 'With great power comes great responsibility.',
                'rm -rf /': 'Permission denied. Nice try though! 😄',
                'hack': 'Hacking... [████████████] 100% Complete.\\nAccess Granted to Favicon Database.',
                'matrix': 'There is no spoon... only favicons.',
                'coffee': '☕ Coffee.exe not found. Try tea?',
                'tea': '🫖 Brewing virtual tea... Ready!',
                'ping': 'PONG! favicon.show is alive and kicking.',
                'vim': 'To exit vim, first exit reality.',
                'emacs': 'Emacs is a great operating system, lacking only a decent editor.',
                'nano': 'Nano is perfectly fine. Fight me.',
                'curl favicon.show': 'You\\'re already here! 🎉'
            };
            
            if (easterEggs[lowerCmd]) {
                return easterEggs[lowerCmd];
            }
            
            // Unknown command
            return \`Command not found: \${cmd}\\nType "help" for available commands.\`;
        }
        
        function addOutput(command, output) {
            // Special handling for clear command - don't add any output
            if (output === null && command.toLowerCase() === 'clear') {
                return;
            }
            
            const outputDiv = document.createElement('div');
            outputDiv.className = 'terminal-output text-xs md:text-sm';
            
            if (output && output.trim()) {
                outputDiv.innerHTML = \`<span class="text-green-500">$ \${command}</span>\\n<span class="opacity-80">\${output}</span>\`;
            } else {
                // Show command even with no output (like cd)
                outputDiv.innerHTML = \`<span class="text-green-500">$ \${command}</span>\`;
            }
            
            terminalOutput.appendChild(outputDiv);
            
            // Scroll terminal output area to bottom
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            
            // Only scroll the page if user has scrolled up and there's significant content
            setTimeout(() => {
                const terminalArea = document.getElementById('terminal-area');
                const terminalRect = terminalArea.getBoundingClientRect();
                
                // Only auto-scroll if terminal is partially out of view
                if (terminalRect.bottom > window.innerHeight) {
                    terminalArea.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            }, 100);
        }
        
        terminalInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const command = this.value.trim();
                if (command) {
                    const output = executeCommand(command);
                    addOutput(command, output);
                }
                this.value = '';
                updateCursorPosition();
            }
        });
        
        // Update cursor position on input changes
        terminalInput.addEventListener('input', updateCursorPosition);
        terminalInput.addEventListener('keyup', updateCursorPosition);
        terminalInput.addEventListener('click', updateCursorPosition);
        
        // Focus input when clicking anywhere in terminal area
        document.getElementById('terminal-area').addEventListener('click', function() {
            terminalInput.focus();
        });
        
        // Global keyboard capture - focus input on any keypress
        document.addEventListener('keydown', function(e) {
            // Don't interfere with special keys or if already focused
            if (document.activeElement === terminalInput) return;
            
            // Don't capture if user is typing in another input/textarea
            if (document.activeElement.tagName === 'INPUT' || 
                document.activeElement.tagName === 'TEXTAREA') return;
            
            // Don't capture special keys
            if (e.ctrlKey || e.altKey || e.metaKey || 
                e.key === 'F5' || e.key === 'Tab' || 
                e.key.startsWith('F') || 
                e.key === 'Escape') return;
            
            // Focus terminal input and let the character be typed
            terminalInput.focus();
        });
        
        // Auto-focus on page load (with slight delay to ensure DOM is ready)
        window.addEventListener('load', function() {
            setTimeout(() => {
                terminalInput.focus();
                updateCursorPosition();
            }, 100);
        });
        
        // Also focus immediately if DOM is already ready
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                terminalInput.focus();
                updateCursorPosition();
            }, 50);
        });
    </script>
</body>
</html>`;