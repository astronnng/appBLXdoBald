#!/usr/bin/env python3
"""Bootstrap launcher: ensures requirements installed and starts the app.

Usage: python start.py
"""
from pathlib import Path
import subprocess
import sys


def install_requirements(req_file="requirements.txt") -> int:
    req = Path(req_file)
    if not req.exists():
        print(f"No {req_file} found — skipping install.")
        return 0
    cmd = [sys.executable, "-m", "pip", "install", "-r", str(req)]
    print("Installing dependencies:", " ".join(cmd))
    return subprocess.call(cmd)


def start_uvicorn() -> int:
    cmd = [sys.executable, "-m", "uvicorn", "src.server:app", "--reload"]
    print("Starting server:", " ".join(cmd))
    return subprocess.call(cmd)


def main() -> int:
    code = install_requirements()
    if code != 0:
        print("Dependency installation failed. Aborting.")
        return code
    return start_uvicorn()


if __name__ == "__main__":
    sys.exit(main())
