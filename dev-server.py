#!/usr/bin/env python3
"""
Development server for Tsukino Prescript PWA
Serves files with no-cache headers to prevent browser caching during development
"""

import http.server
import socketserver
import os
from urllib.parse import unquote

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add no-cache headers to prevent browser caching
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, format, *args):
        # Only log errors, not every request
        if args and len(args) > 0 and str(args[0]).startswith('4') or str(args[0]).startswith('5'):
            super().log_message(format, *args)

if __name__ == '__main__':
    port = 8000
    with socketserver.TCPServer(('', port), NoCacheHTTPRequestHandler) as httpd:
        print(f'🚀 Development server running at http://localhost:{port}')
        print('📝 No-cache headers enabled - changes will be visible immediately')
        print('🛑 Press Ctrl+C to stop')
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\n👋 Server stopped')