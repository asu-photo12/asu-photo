#!/usr/bin/env python3
"""No-cache HTTP server for local development."""
import http.server, os

DIR = os.path.dirname(os.path.abspath(__file__))

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        super().end_headers()

    def log_message(self, fmt, *args):
        pass  # suppress logs

if __name__ == '__main__':
    http.server.test(HandlerClass=NoCacheHandler, port=3456, bind='127.0.0.1')
