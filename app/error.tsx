'use client';

import { useEffect } from 'react';
import PageTitle from './_components/PageTitle';
import Linker from 'app/_components/Linker';
import ContentWrapper from './_components/ContentWrapper';
import MaxWidth from './_components/MaxWidth';
import { basePath } from 'BASE_PATH';

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    console.error('Error encountered:', error);
  }, [error]);

  return (
    <ContentWrapper>
      <MaxWidth>
        <PageTitle>An unexpected error has occurred.</PageTitle>
        <div className="mb-2">
          We encountered an issue while processing your request.
        </div>
        <div className="mb-2">
          An error log has been automatically created for us to review.
        </div>
        <div className="mb-2">
          If you&apos;d like to provide more information, please visit the{' '}
          <Linker href={`${basePath}/contact`}>contact form</Linker> or the{' '}
          <Linker
            href="https://discord.com/channels/781145214752129095/1107628882783391744"
            target="_blank"
            rel="noopener noreferrer"
          >
            kutty&apos;s artbot channel
          </Linker>{' '}
          on the{' '}
          <Linker
            href="https://discord.gg/3DxrhksKzn"
            target="_blank"
            rel="noreferrer"
          >
            Stable Horde Discord server
          </Linker>.
        </div>
      </MaxWidth>
    </ContentWrapper>
  );
}
