# AGENTS.md

## Cursor Cloud specific instructions

This repository is currently an empty scaffold — it contains only a `README.md`. There is no source code, no dependency file, no build system, and no application to run.

### Environment

- Node.js v22 and npm v10 are available in the VM.
- Python 3.12, git 2.43 are available.

### When code is added

Once source code and a dependency manifest (e.g. `package.json`, `requirements.txt`) are added, the update script should be updated via `SetupVmEnvironment` to install dependencies. Similarly, this file should be updated with build/run/test/lint commands relevant to the new codebase.
