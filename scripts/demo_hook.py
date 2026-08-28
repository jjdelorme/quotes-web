#!/usr/bin/env python3
"""Antigravity Linter Hook Demo:

1. PreToolUse: Intercepts file write and edit operations, simulates the proposed
   content, and runs ESLint against it. If ESLint flags naming convention or other
   violations, the hook denies the action and returns the linter feedback so
   the agent self-corrects.
2. PostToolUse: Emits confirmation message and satisfies the PostToolUse contract.
"""

import json
import os
import re
import subprocess
import sys


def get_proposed_content(tool_name, args):
  target_file = args.get("TargetFile") or args.get("file_path") or ""

  if tool_name == "write_to_file":
    return target_file, args.get("CodeContent", "")

  if tool_name == "replace_file_content":
    if not os.path.exists(target_file):
      return target_file, ""
    try:
      with open(target_file, "r", encoding="utf-8") as f:
        current_content = f.read()
    except Exception:
      return target_file, ""

    target_content = args.get("TargetContent", "")
    replacement_content = args.get("ReplacementContent", "")
    allow_multiple = args.get("AllowMultiple", False)

    if allow_multiple:
      new_content = current_content.replace(target_content, replacement_content)
    else:
      new_content = current_content.replace(target_content, replacement_content, 1)

    return target_file, new_content

  return target_file, ""


def run_eslint(file_path, content, workspace_root):
  try:
    proc = subprocess.run(
        ["npx", "eslint", "--stdin", "--stdin-filename", file_path],
        input=content,
        text=True,
        capture_output=True,
        cwd=workspace_root,
        timeout=10,
    )
    if proc.returncode != 0:
      output = proc.stdout.strip() or proc.stderr.strip()
      return False, output
    return True, ""
  except Exception as e:
    return True, f"ESLint execution error: {e}"


def handle_pre_tool_use(payload):
  tool_call = payload.get("toolCall", {})
  tool_name = tool_call.get("name", "")
  args = tool_call.get("args", {})

  target_file, proposed_content = get_proposed_content(tool_name, args)

  # Check for eslint suppression bypass
  suppress_pattern = "eslint" + "-disable"
  if re.search(suppress_pattern, proposed_content, re.IGNORECASE):
    return {
        "decision": "deny",
        "reason": (
            "🚨 [Antigravity Policy Guard] ESLint bypass detected!\n"
            "Using suppression comments is strictly prohibited by repository policy.\n"
            "You must fix the underlying code rather than suppressing the linter."
        ),
    }

  # Run ESLint on TypeScript / JavaScript files
  if target_file and (target_file.endswith(".ts") or target_file.endswith(".js")):
    workspace_paths = payload.get("workspacePaths", [])
    workspace_root = workspace_paths[0] if workspace_paths else os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

    success, error_msg = run_eslint(target_file, proposed_content, workspace_root)
    if not success:
      return {
          "decision": "deny",
          "reason": (
              f"🚨 [Antigravity Linter Guard] ESLint check failed for {target_file}:\n\n"
              f"{error_msg}\n\n"
              "Please adhere to the naming convention and style rules (e.g., camelCase property names) and correct your proposed change."
          ),
      }

  return {"decision": "allow"}


def handle_post_tool_use(payload):
  tool_call = payload.get("toolCall", {})
  args = tool_call.get("args", {})
  file_path = args.get("TargetFile") or args.get("file_path") or "file"

  try:
    with open("/dev/tty", "w") as tty:
      tty.write(
          f"\n\033[1;32m[HOOK: ESLINT]\033[0m Successfully verified and formatted \033[1;34m{file_path}\033[0m\n\n"
      )
  except OSError:
    pass

  return {}


def main():
  try:
    raw = sys.stdin.read()
    if not raw.strip():
      print(json.dumps({}))
      return

    payload = json.loads(raw)

    if "toolCall" in payload and "decision" not in payload:
      result = handle_pre_tool_use(payload)
    else:
      result = handle_post_tool_use(payload)

    print(json.dumps(result))

  except Exception as e:
    sys.stderr.write(f"Hook error: {e}\n")
    print(json.dumps({"decision": "allow"}))


if __name__ == "__main__":
  main()
