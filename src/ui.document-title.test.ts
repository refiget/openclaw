import { describe, expect, it } from "vitest";
import { buildDocumentTitle } from "../ui/src/ui/document-title.ts";

describe("buildDocumentTitle", () => {
  it("shows main for the main agent", () => {
    expect(
      buildDocumentTitle({
        assistantName: "Assistant",
        assistantAgentId: "main",
        sessionKey: "agent:main:main",
      }),
    ).toBe("OpenClaw - main");
  });

  it("uses the assistant name for named agents", () => {
    expect(
      buildDocumentTitle({
        assistantName: "Tony",
        assistantAgentId: "tony",
        sessionKey: "agent:tony:main",
      }),
    ).toBe("OpenClaw - Tony");
  });

  it("falls back to the agent id from the session key", () => {
    expect(
      buildDocumentTitle({
        assistantName: "Assistant",
        assistantAgentId: null,
        sessionKey: "agent:tony:main",
      }),
    ).toBe("OpenClaw - tony");
  });
});
