#!/usr/bin/env python3
"""
MAW Robotics local server with shared submissions API.
"""

import http.server
import json
import os
import re
import socket
import socketserver
import sys
import threading
from urllib.parse import urlparse

socketserver.TCPServer.allow_reuse_address = True

PORT = 8080
HOST = "0.0.0.0"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
SUBMISSIONS_FILE = os.path.join(DATA_DIR, "submissions.json")
SUBMISSION_KEYS = {
    "leaseForm",
    "buyForm",
    "inquiryForm",
    "servicingForm",
    "complaintForm",
    "feedbackForm",
}
DATA_LOCK = threading.Lock()


def get_local_ip():
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.connect(("8.8.8.8", 80))
        ip = sock.getsockname()[0]
        sock.close()
        return ip
    except Exception:
        return "127.0.0.1"


def ensure_storage():
    os.makedirs(DATA_DIR, exist_ok=True)
    if not os.path.exists(SUBMISSIONS_FILE):
        payload = {key: [] for key in SUBMISSION_KEYS}
        with open(SUBMISSIONS_FILE, "w", encoding="utf-8") as file:
            json.dump(payload, file, ensure_ascii=False, indent=2)


def load_submissions():
    ensure_storage()
    with DATA_LOCK:
        with open(SUBMISSIONS_FILE, "r", encoding="utf-8") as file:
            data = json.load(file)
    for key in SUBMISSION_KEYS:
        data.setdefault(key, [])
    return data


def save_submissions(data):
    ensure_storage()
    for key in SUBMISSION_KEYS:
        data.setdefault(key, [])
    with DATA_LOCK:
        with open(SUBMISSIONS_FILE, "w", encoding="utf-8") as file:
            json.dump(data, file, ensure_ascii=False, indent=2)


class MyRequestHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, fmt, *args):
        print(f"[{self.log_date_time_string()}] {fmt % args}")

    def _send_json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def _read_json_body(self):
        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length) if length > 0 else b"{}"
        try:
            return json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError:
            return None

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/submissions":
            return self._send_json(200, load_submissions())
        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path != "/api/submissions":
            self.send_error(404, "API endpoint not found")
            return

        payload = self._read_json_body()
        if payload is None:
            self._send_json(400, {"ok": False, "error": "Invalid JSON"})
            return

        form_id = payload.get("formId")
        record = payload.get("record")
        if form_id not in SUBMISSION_KEYS or not isinstance(record, dict):
            self._send_json(400, {"ok": False, "error": "Invalid formId or record"})
            return

        data = load_submissions()
        data.setdefault(form_id, []).append(record)
        save_submissions(data)
        self._send_json(201, {"ok": True})

    def do_DELETE(self):
        parsed = urlparse(self.path)
        match = re.match(r"^/api/submissions/([A-Za-z0-9_\\-]+)/([0-9]+)$", parsed.path)
        if not match:
            self.send_error(404, "API endpoint not found")
            return

        form_id, index_raw = match.group(1), match.group(2)
        if form_id not in SUBMISSION_KEYS:
            self._send_json(400, {"ok": False, "error": "Invalid formId"})
            return

        index = int(index_raw)
        data = load_submissions()
        items = data.get(form_id, [])

        if index < 0 or index >= len(items):
            self._send_json(404, {"ok": False, "error": "Record not found"})
            return

        items.pop(index)
        data[form_id] = items
        save_submissions(data)
        self._send_json(200, {"ok": True})


class ThreadingTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    daemon_threads = True


def main():
    os.chdir(BASE_DIR)
    ensure_storage()

    try:
        with ThreadingTCPServer((HOST, PORT), MyRequestHandler) as httpd:
            local_ip = get_local_ip()
            print("\n" + "=" * 70)
            print("  MAW ROBOTICS WEBSITE SERVER")
            print("=" * 70)
            print("\nServer Status: RUNNING")
            print(f"Port: {PORT}")
            print("\nAccess the website using:")
            print(f"  From this computer:")
            print(f"    - http://localhost:{PORT}")
            print(f"    - http://127.0.0.1:{PORT}")
            print("\n  From other computers on your network:")
            print(f"    - http://{local_ip}:{PORT}")
            print("\nShare this link with others:")
            print(f"    http://{local_ip}:{PORT}")
            print(f"\nWebsite Directory: {os.getcwd()}")
            print("\nPress CTRL+C to stop the server")
            print("=" * 70 + "\n")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\nServer stopped successfully")
        sys.exit(0)
    except OSError as exc:
        print(f"\nError: Cannot bind to port {PORT}")
        print(f"Message: {exc}")
        print("\nTry closing the current server first, or use a different port")
        sys.exit(1)


if __name__ == "__main__":
    main()
