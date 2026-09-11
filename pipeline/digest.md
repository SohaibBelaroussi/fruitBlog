# Claude Agent SDK Digest

Anthropic's official library for building autonomous AI agents, powered by the same harness that runs Claude Code.

- **What it is**: A Python/TypeScript SDK that lets developers run the same agent loop powering Claude Code inside their own process/infrastructure — agents that can read files, run shell commands, search the web, edit code, and call MCP servers in a persistent loop until a task completes, rather than a single request/response. — [Agent SDK overview, Claude Code Docs](https://code.claude.com/docs/en/agent-sdk/overview)
- **How it differs from the plain Claude API**: It's suited for agents that need to act autonomously within a domain (especially code execution or file management), not just generate a single completion. — [MindStudio: What Is the Claude Agent SDK?](https://www.mindstudio.ai/blog/what-is-claude-agent-sdk-vs-claude-api)
- **What it's used for**: Developers are building financial compliance agents, cybersecurity agents, code debugging agents, legal document review, customer support escalation, and multi-step approval workflows; Anthropic itself uses it internally for GitHub issue triage and Slack automation. — [Engineering at Anthropic: Building agents with the Claude Agent SDK](https://anthropic.com/engineering/building-agents-with-the-claude-agent-sdk)
- **Source**: Open-source Python SDK repo maintained by Anthropic. — [GitHub: anthropics/claude-agent-sdk-python](https://github.com/anthropics/claude-agent-sdk-python)
