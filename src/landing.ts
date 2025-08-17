export const landingPageHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>favicon.show - Universal Favicon URL | Get any website's favicon</title>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="Universal favicon discovery service. Get any website's favicon with a simple URL. Fast, reliable, and includes smart fallbacks with letter tiles. Perfect for developers.">
    <meta name="keywords" content="favicon, icon, website icon, favicon service, favicon API, letter tiles, web development, favicon discovery, website favicon, favicon generator">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://favicon.show/">
    <meta property="og:title" content="favicon.show - Universal Favicon URL">
    <meta property="og:description" content="Get any website's favicon with a simple URL. Fast, reliable, with smart fallbacks. Perfect for developers building web applications.">
    <meta property="og:image" content="https://favicon.show/meta-image.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="favicon.show - Universal Favicon URL">
    <meta property="og:site_name" content="favicon.show">
    <meta property="og:locale" content="en_US">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://favicon.show/">
    <meta name="twitter:title" content="favicon.show - Universal Favicon URL">
    <meta name="twitter:description" content="Get any website's favicon with a simple URL. Fast, reliable, with smart fallbacks.">
    <meta name="twitter:image" content="https://favicon.show/meta-image.png">
    <meta name="twitter:image:alt" content="favicon.show - Universal Favicon URL">
    <meta name="twitter:creator" content="@matthieunapoli">
    
    <!-- Favicon and App Icons -->
    <link rel="icon" type="image/svg+xml" href="https://favicon.show/letter/F?color=074006">
    <link rel="apple-touch-icon" href="https://favicon.show/letter/F?color=074006">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://favicon.show/">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="/terminal.css">
    <script defer data-domain="favicon.show" src="https://plausible.io/js/script.js"></script>
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
                <div class="text-2xl sm:text-3xl sm:text-5xl md:text-6xl font-bold mb-2 flex items-start space-x-2 sm:space-x-3 md:space-x-6">
                    <div>▓▓▓</div>
                    <div class="pt-2.5">FAVICON.SHOW</div>
                    <div>▓▓▓</div>
                </div>
                <div class="text-sm sm:text-base sm:text-lg md:text-xl opacity-80">
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
                            <code class="vt323-font text-yellow-300 text-sm sm:text-lg md:text-xl break-all">&lt;img src="https://favicon.show/github.com"&gt;</code>
                        </div>
                    </div>
                    
                    <!-- Example -->
                    <div class="border border-green-600 bg-green-950 bg-opacity-20 p-3 md:p-4 rounded">
                        <div class="text-green-300 mb-2 text-xs md:text-sm">CUSTOM FALLBACK:</div>
                        <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4">
                            <img src="https://favicon.show/nonexistent-domain-12345.com?letter=X" class="w-6 h-6 self-start sm:self-center">
                            <code class="vt323-font text-yellow-300 text-sm sm:text-lg md:text-xl break-all">&lt;img src="https://favicon.show/example.com?letter=X"&gt;</code>
                        </div>
                    </div>
                    
                    <!-- Example -->
                    <div class="border border-green-600 bg-green-950 bg-opacity-20 p-3 md:p-4 rounded">
                        <div class="text-green-300 mb-2 text-xs md:text-sm">LETTER TILE:</div>
                        <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4">
                            <img src="https://favicon.show/letter/A" class="w-6 h-6 self-start sm:self-center">
                            <code class="vt323-font text-yellow-300 text-sm sm:text-lg md:text-xl break-all">&lt;img src="https://favicon.show/letter/A"&gt;</code>
                        </div>
                    </div>
                    
                    <!-- Example -->
                    <div class="border border-green-600 bg-green-950 bg-opacity-20 p-3 md:p-4 rounded">
                        <div class="text-green-300 mb-2 text-xs md:text-sm">CUSTOM COLOR:</div>
                        <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4">
                            <img src="https://favicon.show/letter/B?color=FF6B6B" class="w-6 h-6 self-start sm:self-center">
                            <code class="vt323-font text-yellow-300 text-sm sm:text-lg md:text-xl break-all">&lt;img src="https://favicon.show/letter/B?color=FF6B6B"&gt;</code>
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
    
    <script src="/terminal.js"></script>
</body>
</html>`;