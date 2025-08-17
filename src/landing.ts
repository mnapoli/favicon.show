export const landingPageHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>favicon.show - Terminal Interface</title>
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
    </style>
</head>
<body class="bg-black text-green-400 terminal-font scanlines min-h-screen overflow-hidden tracking-wider">
    <div class="crt-screen terminal-border border border-green-500/30 bg-green-950/40 mx-2 my-2 md:mx-8 md:my-8 h-[calc(100vh-1rem)] md:h-[calc(100vh-4rem)] rounded-lg overflow-hidden">
        <!-- Terminal Header -->
        <div class="bg-green-900 bg-opacity-30 px-2 md:px-4 py-2 border-b border-green-400 flex items-center">
            <div class="flex space-x-1 md:space-x-2">
                <div class="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                <div class="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                <div class="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
            </div>
            <div class="flex-1 text-center text-xs md:text-sm">favicon.show - Terminal v1.0</div>
            <div class="text-xs opacity-60 hidden md:block">SYS/READY</div>
        </div>
        
        <!-- Terminal Content -->
        <div class="crt-distortion crt-flicker p-3 md:p-6 h-full overflow-y-auto">
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
                            <img src="https://favicon.show/letter/X" class="w-6 h-6 self-start sm:self-center">
                            <code class="vt323-font text-yellow-300 text-sm md:text-lg lg:text-xl break-all">&lt;img src="https://favicon.show/letter/X"&gt;</code>
                        </div>
                    </div>
                    
                    <!-- Example -->
                    <div class="border border-green-600 bg-green-950 bg-opacity-20 p-3 md:p-4 rounded">
                        <div class="text-green-300 mb-2 text-xs md:text-sm">CUSTOM COLOR:</div>
                        <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4">
                            <img src="https://favicon.show/letter/X?color=FF6B6B" class="w-6 h-6 self-start sm:self-center">
                            <code class="vt323-font text-yellow-300 text-sm md:text-lg lg:text-xl break-all">&lt;img src="https://favicon.show/letter/X?color=FF6B6B"&gt;</code>
                        </div>
                    </div>
                </div>
                
                <!-- Footer prompt -->
                <div class="mt-8 md:mt-12">
                    <div class="flex items-center space-x-2">
                        <span class="text-green-500">$</span>
                        <span class="terminal-cursor"></span>
                    </div>
                </div>
                
                <!-- Author -->
                <div class="mt-6 pt-4 border-t border-green-600 border-opacity-20">
                    <div class="text-xs opacity-50 text-center">
                        Created by <a href="https://mnapoli.fr" target="_blank" rel="noopener" class="text-green-400 hover:text-green-300 underline">Matthieu Napoli</a>
                    </div>
                </div>
                
                <div class="h-4 md:h-8"></div>
            </div>
        </div>
    </div>
</body>
</html>`;