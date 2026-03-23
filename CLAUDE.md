# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a study/learning repository ("estudos" = studies in Portuguese). It is currently in early stages with no build system or test framework configured.

## Files

### install.cmd
Windows CMD bootstrap script for installing Claude Code CLI. It:
- Accepts `stable`, `latest`, or a specific version number as argument (defaults to `latest`)
- Detects architecture (x64 or ARM64) and downloads the appropriate binary from Google Cloud Storage
- Verifies the downloaded binary's SHA256 checksum via `certutil`
- Runs the installer, then cleans up the temporary binary

Usage:
```
install.cmd                  # installs latest
install.cmd stable           # installs stable channel
install.cmd 1.0.58           # installs specific version
```
