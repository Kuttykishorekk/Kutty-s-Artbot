'use client'

import Head from 'next/head'
import React, { useCallback, useEffect } from 'react'
import { useStore } from 'statery'
import styled from 'styled-components'
import { useRouter, useSearchParams } from 'next/navigation'

import useComponentState from 'app/_hooks/useComponentState'
import PageTitle from 'app/_components/PageTitle'
import { IWorkers, setWorkers, userInfoStore } from 'app/_store/userStore'
import Linker from 'app/_components/Linker'
import { sleep } from 'app/_utils/sleep'
import { clientHeader, getApiHostServer } from 'app/_utils/appUtils'
import MenuButton from 'app/_components/MenuButton'
import AppSettings from 'app/_data-models/AppSettings'
import AiHordeSettingsPanel from './AiHordeSettingsPanel'
import WorkerSettingsPanel from './WorkerSettingsPanel'
import ArtbotSettingsPanel from './ArtbotSettingsPanel' // Fixed import
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react'
import DropDownMenu from 'app/_components/DropDownMenu/dropDownMenu'
import DropDownMenuItem from 'app/_components/DropDownMenuItem'
import ImportExportPanel from './ImportExportPanel'

const SettingsWrapper = styled.div`
  width: 100%;

  @media (min-width: 640px) {
    display: flex;
    flex-direction: row;
  }
`

const LinksPanel = styled.div`
  display: none;

  @media (min-width: 640px) {
    border-right: 1px solid white;
    display: flex;
    flex-direction: column;
    width: 280px;
  }
`

const LinksList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`

const OptionsPanel = styled.div`
  width: 100%;

  @media (min-width: 640px) {
    display: flex;
    flex-direction: column;
    padding-left: 16px;
  }
`

const ShowOnMobile = styled.div`
  @media (min-width: 640px) {
    display: none;
  }
`

const SettingsPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const userState = useStore(userInfoStore)
  const { worker_ids = [] } = userState

  const [componentState, setComponentState] = useComponentState({
    allowNsfwImages: false,
    apiKey: '',
    apiErrorMsg: '',
    disableNewImageNotification: false,
    disableSnowflakes: false,
    enableGallerySwipe: true,
    loadingWorkerStatus: {},
    panel: 'stableHorde',
    runInBackground: false,
    saveInputOnCreate: false, // DEPRECATE

    maxConcurrency: 5,
    imagesPerPage: 50,
    savePromptOnCreate: false,
    saveSeedOnCreate: false,
    saveCanvasOnCreate: false,

    stayOnCreate: false,
    showOptionsMenu: false,
    showResetConfirmation: false,
    shareImagesExternally: AppSettings.get('shareImagesExternally'),
    useBeta: false,
    useWorkerId: '',
    useTrusted: true,
    imageDownloadFormat: 'jpg',
    slow_workers: true
  })

  const handleSwitchSelect = (key: string, value: boolean) => {
    AppSettings.save(key, value)
    setComponentState((prevState) => ({ ...prevState, [key]: value }))
  }

  useEffect(() => {
    const updateObj: any = {
      allowNsfwImages: AppSettings.get('allowNsfwImages') || false,
      apiKey: AppSettings.get('apiKey') || '',
      runInBackground: AppSettings.get('runInBackground') || false,
      enableGallerySwipe: AppSettings.get('enableGallerySwipe') !== false,
      maxConcurrency: AppSettings.get('maxConcurrency') || 5,
      imagesPerPage: AppSettings.get('imagesPerPage') || 50,
      theme: AppSettings.get('theme') || 'system',
      saveInputOnCreate: AppSettings.get('saveInputOnCreate') || false, // DEPRECATE
      savePromptOnCreate: AppSettings.get('savePromptOnCreate') || false,
      saveSeedOnCreate: AppSettings.get('saveSeedOnCreate') || false,
      saveCanvasOnCreate: AppSettings.get('saveCanvasOnCreate') || false,
      disableNewImageNotification: AppSettings.get('disableNewImageNotification') || false,
      stayOnCreate: AppSettings.get('stayOnCreate') || false,
      useBeta: AppSettings.get('useBeta') || false,
      useWorkerId: AppSettings.get('useWorkerId') || '',
      useTrusted: AppSettings.get('useTrusted') || false,
      slow_workers: AppSettings.get('slow_workers') !== false,
      disableSnowflakes: AppSettings.get('disableSnowflakes') || false,
      shareImagesExternally: AppSettings.get('shareImagesExternally') || false,
      imageDownloadFormat: AppSettings.get('imageDownloadFormat') || 'jpg'
    }

    setComponentState(updateObj)
  }, [])

  const fetchWorkerData = useCallback(async () => {
    if (Array.isArray(worker_ids)) {
      let workerInfo: IWorkers = {}

      for (const id of worker_ids) {
        const workerRes = await fetch(
          `${getApiHostServer()}/api/v2/workers/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Client-Agent': clientHeader()
            }
          }
        )
        const workerData = await workerRes.json()
        workerInfo[id] = workerData

        await sleep(500)
      }

      setWorkers(workerInfo)
    }
  }, [worker_ids])

  useEffect(() => {
    if (searchParams?.get('panel') === 'workers') {
      fetchWorkerData()
    }
  }, [fetchWorkerData, searchParams])

  useEffect(() => {
    const apiKey = AppSettings.get('apiKey')
    if (!apiKey) {
      handleSwitchSelect('shareImagesExternally', true)
    }
  }, [])

  return (
    <div className="pb-[88px]">
      <Head>
        <title>Settings - artbot for Stable Diffusion</title>
        <meta name="twitter:title" content="artbot - Settings" />
      </Head>
      <div
        className="flex flex-row items-center w-full"
        style={{ justifyContent: 'space-between' }}
      >
        <div className="inline-block w-1/4">
          <PageTitle>Settings</PageTitle>
        </div>
        <div className="flex flex-row justify-end w-3/4 items-start h-[38px] relative gap-2">
          <ShowOnMobile>
            <MenuButton
              active={componentState.showOptionsMenu}
              title="Click for more settings"
              onClick={() => {
                setComponentState((prevState) => ({
                  showOptionsMenu: !prevState.showOptionsMenu
                }))
              }}
            >
              <div className="flex flex-row gap-1 pr-2">
                {componentState.showOptionsMenu ? (
                  <IconChevronDown />
                ) : (
                  <IconChevronRight />
                )}
                {searchParams?.get('panel') === 'workers' ? 'Manage Workers' :
                 searchParams?.get('panel') === 'prefs' ? 'artbot Prefs' :
                 searchParams?.get('panel') === 'import-export' ? 'Export' :
                 'AI Horde Settings'}
              </div>
            </MenuButton>
            {componentState.showOptionsMenu && (
              <DropDownMenu
                handleClose={() => {
                  setComponentState({ showOptionsMenu: false })
                }}
              >
                <DropDownMenuItem
                  onClick={() => router.push('/settings')}
                >
                  AI Horde settings
                </DropDownMenuItem>
                <DropDownMenuItem
                  onClick={() => router.push('/settings?panel=workers')}
                >
                  Manage workers
                </DropDownMenuItem>
                <DropDownMenuItem
                  onClick={() => router.push('/settings?panel=prefs')}
                >
                  artbot preferences
                </DropDownMenuItem>
                <DropDownMenuItem
                  onClick={() => router.push('/settings?panel=import-export')}
                >
                  Import / Export
                </DropDownMenuItem>
              </DropDownMenu>
            )}
          </ShowOnMobile>
        </div>
      </div>
      <SettingsWrapper>
        <LinksPanel>
          <LinksList>
            <li>
              <Linker href="/settings" passHref>
                AI Horde Settings
              </Linker>
            </li>
            <li>
              <Linker href="/settings?panel=workers" passHref>
                Manage Workers
              </Linker>
            </li>
            <li>
              <Linker href="/settings?panel=prefs" passHref>
                artbot Preferences
              </Linker>
            </li>
            <li>
              <Linker href="/settings?panel=import-export" passHref>
                Import / Export
              </Linker>
            </li>
          </LinksList>
        </LinksPanel>
        <OptionsPanel>
          {!searchParams?.get('panel') && (
            <AiHordeSettingsPanel
              componentState={componentState}
              setComponentState={setComponentState}
            />
          )}
          {searchParams?.get('panel') === 'workers' && (
            <WorkerSettingsPanel
              componentState={componentState}
              setComponentState={setComponentState}
            />
          )}
          {searchParams?.get('panel') === 'prefs' && (
            <ArtbotSettingsPanel
              componentState={componentState}
              setComponentState={setComponentState}
            />
          )}
          {searchParams?.get('panel') === 'import-export' && (
            <ImportExportPanel />
          )}
        </OptionsPanel>
      </SettingsWrapper>
    </div>
  )
}

export default SettingsPage
