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
        content: "<img src=\"https://favicon.show/github.com\">\\n<img src=\"https://favicon.show/example.com?letter=X\">\\n<img src=\"https://favicon.show/letter/A\">\\n<img src=\"https://favicon.show/letter/B?color=FF6B6B\">"
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
    
    'favicon --help': () => `favicon - Universal favicon discovery service

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

For more information, visit https://favicon.show`,

    'favicon --status': () => `SERVICE: Favicon extraction and delivery
STATUS: OPERATIONAL
PLATFORM: Cloudflare Workers + KV
FALLBACK ALPHABET: LOADED
UPTIME: 99.9%
CACHE HIT RATIO: 87.3%`,

    'favicon --examples': () => `BASIC USAGE:
<img src="https://favicon.show/github.com">

CUSTOM FALLBACK:
<img src="https://favicon.show/example.com?letter=X">

LETTER TILE:
<img src="https://favicon.show/letter/X">

CUSTOM COLOR:
<img src="https://favicon.show/letter/X?color=FF6B6B">`,

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
    
    'neofetch': () => `                 favicon.show
                 ──────────────
OS               Cloudflare Workers
Kernel           V8 JavaScript Engine
Uptime           42 days, 13 hours, 37 mins
Shell            favicon-terminal v1.0
Resolution       Universal Favicon Discovery
Terminal         retro-crt
CPU              Edge Computing (Global)
Memory           42MB / 1GB
Storage          KV Namespace (Distributed)`
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
            return `Error: favicon command requires a flag (--help, --version, --status, --examples)\\nTry: favicon --help`;
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
        'curl favicon.show': 'You\'re already here! 🎉'
    };
    
    if (easterEggs[lowerCmd]) {
        return easterEggs[lowerCmd];
    }
    
    // Unknown command
    return `Command not found: ${cmd}\\nType "help" for available commands.`;
}

function addOutput(command, output) {
    // Special handling for clear command - don't add any output
    if (output === null && command.toLowerCase() === 'clear') {
        return;
    }
    
    const outputDiv = document.createElement('div');
    outputDiv.className = 'terminal-output text-xs md:text-sm';
    
    if (output && output.trim()) {
        outputDiv.innerHTML = `<span class="text-green-500">$ ${command}</span>\\n<span class="opacity-80">${output}</span>`;
    } else {
        // Show command even with no output (like cd)
        outputDiv.innerHTML = `<span class="text-green-500">$ ${command}</span>`;
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
    // Use preventScroll to avoid auto-scrolling when focusing
    terminalInput.focus({ preventScroll: true });
});

// Initialize cursor position without focusing
window.addEventListener('load', function() {
    setTimeout(() => {
        updateCursorPosition();
    }, 100);
});

// Also initialize if DOM is already ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        updateCursorPosition();
    }, 50);
});