"use client";

import { ChatProvider } from "./contexts/ChatContext";
import { ErrorProvider } from "./contexts/ErrorContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { SecretProvider } from "./contexts/SecretContext";
import PageContent from "./PageContent";

export default function Home() {
  return (
    <ErrorProvider>
      <SecretProvider>
        <ChatProvider>
          <LoadingProvider>
            <PageContent />
          </LoadingProvider>
        </ChatProvider>
      </SecretProvider>
    </ErrorProvider>
  );
}