import Section from 'app/_components/Section';
import AlertDialogBox from 'app/_components/AlertDialogBox';
import PageTitle from 'app/_components/PageTitle';
import SubSectionTitle from 'app/_components/SubSectionTitle';
import AppSettings from 'app/_data-models/AppSettings';
import MaxWidth from 'app/_components/MaxWidth';
import Select from 'app/_components/Select';
import Linker from 'app/_components/Linker';
import { useState, useCallback } from 'react';
import { Button } from 'app/_components/Button';
import { generateThumbnails } from 'app/_utils/db';
import { deletePendingJobs } from 'app/_controllers/pendingJobsCache';
import { basePath } from 'BASE_PATH';
import InputSwitchV2 from 'app/_modules/AdvancedOptionsPanel/InputSwitchV2';
import FlexCol from 'app/_components/FlexCol';
import { updateTheme } from 'app/_modules/AppTheme/controller';
import { db } from 'app/_db/dexie';

interface ArtBotSettingsPanelProps {
  componentState: {
    showResetConfirmation?: boolean;
    theme?: string;
    savePromptOnCreate?: boolean;
    saveSeedOnCreate?: boolean;
    saveCanvasOnCreate?: boolean;
    stayOnCreate?: boolean;
    imagesPerPage?: number;
    imageDownloadFormat?: string;
    runInBackground?: boolean;
    enableGallerySwipe?: boolean;
    disableNewImageNotification?: boolean;
  };
  setComponentState: (state: Partial<ArtBotSettingsPanelProps['componentState']>) => void;
}

const ArtBotSettingsPanel = ({ componentState, setComponentState }: ArtBotSettingsPanelProps) => {
  const [processType, setProcessType] = useState<string | null>(null);
  const [processState, setProcessState] = useState('');
  const [totalToProcess, setTotalToProcess] = useState(0);
  const [currentProcessIdx, setCurrentProcessIdx] = useState(0);

  const handleSwitchSelect = useCallback((key: keyof ArtBotSettingsPanelProps['componentState'], value: boolean) => {
    AppSettings.save(key, value);
    setComponentState({ [key]: value });
  }, [setComponentState]);

  const handleUpdateSelect = useCallback((key: keyof ArtBotSettingsPanelProps['componentState'], value: any) => {
    AppSettings.save(key, value);
    setComponentState({ [key]: value });
  }, [setComponentState]);

  const handleGenerateThumbnails = useCallback(() => {
    setProcessType('thumbnails');
    generateThumbnails(({ total, current, state }) => {
      setTotalToProcess(total);
      setCurrentProcessIdx(current);
      setProcessState(state);
    });
  }, []);

  const handleResetPreferences = useCallback(() => {
    localStorage.clear();
    window.location.reload();
  }, []);

  const handleResetInputCache = useCallback(() => {
    localStorage.removeItem('PromptInputSettings');
    window.location.assign(`${window.location.origin}${basePath}`);
  }, []);

  const handleClearPendingItems = useCallback(async () => {
    await db.pending.clear();
    deletePendingJobs();
    window.location.assign(`${window.location.origin}${basePath}/pending`);
  }, []);

  return (
    <>
      {componentState.showResetConfirmation && (
        <AlertDialogBox
          title="Are you sure you want to reset your preferences?"
          message="This option will reset all user settings found on this settings page. (e.g., API key, image download preferences, stored input values, etc). Your images will be safe. However, please save your API key before continuing."
          onConfirmClick={handleResetPreferences}
          closeModal={() => setComponentState({ showResetConfirmation: false })}
        />
      )}
      <Section>
        <PageTitle as="h2">artbot Preferences</PageTitle>
      </Section>
      <Section pb={12}>
        <MaxWidth style={{ maxWidth: '240px' }}>
          <SubSectionTitle>
            <strong>artbot Theme</strong>
          </SubSectionTitle>
          <div className="flex flex-row gap-2 items-center">
            <Select
              options={[
                { value: 'dark', label: 'dark' },
                { value: 'light', label: 'light' },
                { value: 'system', label: 'system' }
              ]}
              isSearchable={false}
              onChange={(obj) => {
                localStorage.setItem('theme', obj.value);
                handleUpdateSelect('theme', obj.value);
                updateTheme(obj.value);
              }}
              value={{
                value: componentState.theme || 'system',
                label: componentState.theme || 'system'
              }}
            />
          </div>
        </MaxWidth>
      </Section>
      <Section pb={12}>
        <SubSectionTitle>
          <strong>Save on create?</strong>
        </SubSectionTitle>
        <div className="text-xs mb-3">
          After clicking &quot;create&quot; on the image generation page, preserve the following settings. (All other settings will be remembered.)
        </div>
        <FlexCol style={{ rowGap: '8px' }}>
          <InputSwitchV2
            label={<strong>Prompt?</strong>}
            handleSwitchToggle={() => handleSwitchSelect('savePromptOnCreate', !componentState.savePromptOnCreate)}
            checked={componentState.savePromptOnCreate || false}
          />
          <InputSwitchV2
            label={<strong>Seed?</strong>}
            handleSwitchToggle={() => handleSwitchSelect('saveSeedOnCreate', !componentState.saveSeedOnCreate)}
            checked={componentState.saveSeedOnCreate || false}
          />
          <InputSwitchV2
            label={<strong>Canvas?</strong>}
            handleSwitchToggle={() => handleSwitchSelect('saveCanvasOnCreate', !componentState.saveCanvasOnCreate)}
            checked={componentState.saveCanvasOnCreate || false}
          />
        </FlexCol>
      </Section>
      <Section pb={12}>
        <InputSwitchV2
          label={<strong>Stay on create page?</strong>}
          handleSwitchToggle={() => handleSwitchSelect('stayOnCreate', !componentState.stayOnCreate)}
          checked={componentState.stayOnCreate || false}
        />
        <div className="text-xs mt-2 pl-16">
          After clicking &quot;create&quot; on the image generation page, stay on the page, rather than show pending items.
        </div>
      </Section>
      <Section pb={12}>
        <MaxWidth style={{ maxWidth: '240px' }}>
          <SubSectionTitle>
            <strong>Images per page</strong>
          </SubSectionTitle>
          <div className="flex flex-row gap-2 items-center">
            <Select
              options={[
                { value: 25, label: '25' },
                { value: 50, label: '50' },
                { value: 100, label: '100' }
              ]}
              isSearchable={false}
              onChange={(obj) => handleUpdateSelect('imagesPerPage', obj.value)}
              value={{
                value: componentState.imagesPerPage || 25,
                label: componentState.imagesPerPage?.toString() || '25'
              }}
            />
          </div>
        </MaxWidth>
      </Section>
      <Section>
        <SubSectionTitle>
          <strong>Preferred image format</strong>
          <div className="text-xs mt-2 mb-2">
            Choose your preferred format when downloading images from artbot
          </div>
        </SubSectionTitle>
        <MaxWidth style={{ maxWidth: '240px' }}>
          <Select
            isSearchable={false}
            onChange={(obj) => handleUpdateSelect('imageDownloadFormat', obj.value)}
            options={[
              { value: 'jpg', label: 'jpg' },
              { value: 'png', label: 'png' },
              { value: 'webp', label: 'webp' }
            ]}
            value={{
              value: componentState.imageDownloadFormat || 'jpg',
              label: componentState.imageDownloadFormat || 'jpg'
            }}
          />
        </MaxWidth>
      </Section>
      <Section style={{ paddingTop: '24px' }}>
        <InputSwitchV2
          label={<strong>Run in background?</strong>}
          handleSwitchToggle={() => handleSwitchSelect('runInBackground', !componentState.runInBackground)}
          checked={componentState.runInBackground || false}
        />
        <div className="text-xs mt-2 pl-16">
          By default, artbot only runs in the active browser tab to help prevent your IP address from being throttled. You may disable this behavior if you wish.
        </div>
      </Section>
      <Section>
        <InputSwitchV2
          label={<strong>Enable page swipe on image gallery page?</strong>}
          handleSwitchToggle={() => handleSwitchSelect('enableGallerySwipe', !componentState.enableGallerySwipe)}
          checked={componentState.enableGallerySwipe || false}
        />
        <div className="text-xs mt-2 pl-16">
          On mobile devices, this option allows you to swipe between full pages of images on the <Linker href="/images">images gallery page</Linker>.
        </div>
      </Section>
      <Section>
        <InputSwitchV2
          label={<strong>Disable new image notification?</strong>}
          handleSwitchToggle={() => handleSwitchSelect('disableNewImageNotification', !componentState.disableNewImageNotification)}
          checked={componentState.disableNewImageNotification || false}
        />
        <div className="text-xs mt-2 pl-16">
          This option disables the new image notification toast that pops up in the top right corner of the web app when artbot receives a new image from the AI Horde backend.
        </div>
      </Section>
      <Section pb={12}>
        <SubSectionTitle>
          <strong>Generate thumbnails?</strong>
          <div className="text-xs mt-2 mb-2">
            artbot recently implemented image thumbnails to help the image gallery become more performant, especially on mobile devices. Older images, created before 2023.03.06, will not have image thumbnails. If you wish, you may manually kick off this process.
          </div>
          <div className="text-xs mb-2">
            <strong>WARNING:</strong> Depending on the number of images, this could take some time. (On my iPhone 14 Pro, it took about 100 seconds to process 3,000 images)
          </div>
          {processType === 'thumbnails' && totalToProcess > 0 && (
            <div className="text-xs mb-2">
              {processState} {currentProcessIdx} of {totalToProcess} {processState === 'Analyzing' ? 'images' : 'thumbnails'}.
            </div>
          )}
        </SubSectionTitle>
        <MaxWidth style={{ maxWidth: '240px' }}>
          <Button
            onClick={handleGenerateThumbnails}
          >
            Generate thumbnails
          </Button>
        </MaxWidth>
      </Section>
      <Section pb={12}>
        <SubSectionTitle>
          <strong>Download debugging logs?</strong>
          <div className="text-xs mt-2 mb-2">
            This is really only used in case you're encountering some issues with artbot and are asked to provide some additional logs.
          </div>
        </SubSectionTitle>
        <MaxWidth style={{ maxWidth: '240px' }}>
          <Button
            onClick={() => {
              if (window.artbotDownloadLogs) {
                window.artbotDownloadLogs();
              } else {
                console.error('Download logs function is not available.');
              }
            }}
          >
            Download
          </Button>
        </MaxWidth>
      </Section>
      <Section pb={12}>
        <SubSectionTitle>
          <strong>Reset artbot settings in local storage?</strong>
          <div className="text-xs mt-2 mb-2">
            In some instances, artbot settings could have been corrupted. Use this option to reset all user settings found on this settings page (e.g., API key, image download preferences, stored input values, etc).
          </div>
          <div className="text-xs mt-2 mb-2">
            Please save your <strong>API key</strong> before doing this!
          </div>
          <div className="text-xs mt-2 mb-2">
            The prompt history database and image database will not be touched and your images will still be available after this reset.
          </div>
        </SubSectionTitle>
        <MaxWidth style={{ maxWidth: '240px' }}>
          <Button
            theme="secondary"
            onClick={() => setComponentState({ showResetConfirmation: true })}
          >
            Reset Preferences?
          </Button>
        </MaxWidth>
      </Section>
      <Section pb={12}>
        <SubSectionTitle>
          <strong>Reset Input Cache?</strong>
          <div className="text-xs mt-2 mb-2">
            In some instances, input cache settings could have been corrupted. Use this option to reset cached data found on the create page (e.g., steps, guidance, last used sampler, last used model).
          </div>
          <div className="text-xs mt-2 mb-2">
            The prompt history database and image database will not be touched and your images will still be available after this reset.
          </div>
        </SubSectionTitle>
        <MaxWidth style={{ maxWidth: '240px' }}>
          <Button
            theme="secondary"
            onClick={handleResetInputCache}
          >
            Reset Input Cache?
          </Button>
        </MaxWidth>
      </Section>
      <Section pb={12}>
        <SubSectionTitle>
          <strong>Clear pending items table?</strong>
          <div className="text-xs mt-2 mb-2">
            In some instances, a data corruption issue can occur on the pending items page due to an unknown race condition that hasn't been solved yet. When this happens, you will encounter an error when trying to access the pending items page.
          </div>
          <div className="text-xs mt-2 mb-2">
            The image database will not be touched and your images will still be available after this reset.
          </div>
        </SubSectionTitle>
        <MaxWidth style={{ maxWidth: '240px' }}>
          <Button
            theme="secondary"
            onClick={handleClearPendingItems}
          >
            Reset Pending Items?
          </Button>
        </MaxWidth>
      </Section>
    </>
  );
};

export default ArtBotSettingsPanel;
