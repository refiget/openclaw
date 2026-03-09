import { parseAgentSessionKey } from "../../../src/routing/session-key.js";
import { DEFAULT_ASSISTANT_NAME } from "./assistant-identity.ts";

const APP_TITLE_PREFIX = "OpenClaw";
const MAIN_AGENT_LABEL = "main";
const DEFAULT_TITLE = `${APP_TITLE_PREFIX} - ${MAIN_AGENT_LABEL}`;

export type DocumentTitleState = {
  assistantName: string;
  assistantAgentId: string | null;
  sessionKey: string;
};

function titleCaseAgentId(value: string): string {
  return value
    .split(/[-_]+/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function resolveAgentLabel(state: DocumentTitleState): string {
  const assistantName = state.assistantName.trim();
  const assistantAgentId = state.assistantAgentId?.trim() || null;
  const sessionAgentId = parseAgentSessionKey(state.sessionKey)?.agentId ?? null;
  const agentId = assistantAgentId || sessionAgentId || "main";

  if (agentId === "main") {
    return MAIN_AGENT_LABEL;
  }

  if (assistantName && assistantName !== DEFAULT_ASSISTANT_NAME) {
    return assistantName;
  }

  return titleCaseAgentId(agentId);
}

export function buildDocumentTitle(state: DocumentTitleState): string {
  const label = resolveAgentLabel(state);
  return label ? `${APP_TITLE_PREFIX} - ${label}` : DEFAULT_TITLE;
}

export function syncDocumentTitle(state: DocumentTitleState) {
  if (typeof document === "undefined") {
    return;
  }
  document.title = buildDocumentTitle(state);
}
